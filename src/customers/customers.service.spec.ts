import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as UUIDv4 } from 'uuid';
import { ICreateCustomer, IGetUpdateCustomer } from './customers.interface';
import { CustomersRedisService } from '../services/customers.redis.service';

@Injectable()
export class CustomersService extends CustomersRedisService {
  async getID(id: string): Promise<IGetUpdateCustomer> {
    if ((await this.existsCustomer(id)) === 0) {
      throw new HttpException('Cliente inexistente', HttpStatus.NOT_FOUND);
    }
    return this.getCustomer(id)
      .then((result) => {
        if (!result) {
          throw new HttpException('Cliente inexistente', HttpStatus.NOT_FOUND);
        }
        return JSON.parse(result) as IGetUpdateCustomer;
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

  async updateCustomer(
    id: string,
    updateCustomer: IGetUpdateCustomer,
  ): Promise<IGetUpdateCustomer> {
    if (id !== updateCustomer.id) {
      throw new HttpException(
        'O ID do cliente não pode ser alterado',
        HttpStatus.CONFLICT,
      );
    }
    if ((await this.existsCustomer(id)) === 0) {
      throw new HttpException('Cliente inexistente', HttpStatus.NOT_FOUND);
    }
    await this.setCustomer(updateCustomer);
    return updateCustomer;
  }
}
