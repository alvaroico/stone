import { Injectable } from '@nestjs/common';
import { ICreateCustomer } from '../customers/customers.interface';
import { redis } from './redis.db';

@Injectable()
export class CustomersRedisService {
  async getCustomer(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      redis.get(`customer:${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }

  async setCustomer(customer: ICreateCustomer): Promise<string> {
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

  async existsCustomer(id: string): Promise<number> {
    return new Promise((resolve, reject) => {
      redis.exists(`customer:${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
}
