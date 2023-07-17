import { Injectable } from '@nestjs/common';
import { ICreateCustomer, IUpdateCustomer } from './customers.interface';

@Injectable()
export class CustomersService {
  getID(id: string): string {
    return id;
  }

  updateCustomer(id: string, updateCustomer: IUpdateCustomer): IUpdateCustomer {
    return { ...updateCustomer, id };
  }

  createCustomer(createCustomer: ICreateCustomer): ICreateCustomer {
    return createCustomer;
  }
}
