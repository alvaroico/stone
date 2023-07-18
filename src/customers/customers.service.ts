import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as UUIDv4 } from 'uuid';
import { ICreateCustomer, IGetUpdateCustomer } from './customers.interface';
import { redis } from 'src/services/redis.DB';

@Injectable()
export class CustomersService {
  private async getCustomer(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      redis.get(`customer:${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }

  private async setCustomer(customer: ICreateCustomer): Promise<string> {
    return new Promise((resolve, reject) => {
      redis.set(
        `customer:${customer.id}`,
        JSON.stringify(customer),
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        },
      );
    });
  }

  async getID(id: string): Promise<string | HttpException> {
    return this.getCustomer(id)
      .then((result) => {
        if (!result) {
          throw new HttpException('Cliente inexistente', HttpStatus.NOT_FOUND);
        }
        return result;
      })
      .catch(() => {
        throw new HttpException('Cache indisponível', HttpStatus.BAD_GATEWAY);
      });
  }

  async createCustomer(
    createCustomer: ICreateCustomer,
  ): Promise<IGetUpdateCustomer> {
    createCustomer.id = UUIDv4();
    const newCostumer = createCustomer as IGetUpdateCustomer;
    try {
      await this.setCustomer(newCostumer);
      return newCostumer;
    } catch {
      throw new HttpException('Cache indisponível', HttpStatus.BAD_GATEWAY);
    }
  }

  updateCustomer(
    id: string,
    updateCustomer: IGetUpdateCustomer,
  ): IGetUpdateCustomer {
    return { ...updateCustomer, id };
  }
}
