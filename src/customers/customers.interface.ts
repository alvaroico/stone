export interface ICreateCustomer {
  id?: string;
  document: string;
  name: string;
}

export interface IGetUpdateCustomer {
  id: string;
  document: string;
  name: string;
}
