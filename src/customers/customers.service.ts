import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ICreateCustomer, IUpdateCustomer } from './customers.interface';
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

  updateCustomer(id: string, updateCustomer: IUpdateCustomer): IUpdateCustomer {
    return { ...updateCustomer, id };
  }

  createCustomer(createCustomer: ICreateCustomer): ICreateCustomer {
    return createCustomer;
  }
}
