import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, HttpException } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { IGetUpdateCustomer } from './customers.interface';

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  let newCostumer = {} as IGetUpdateCustomer;

  describe('createCustomer', () => {
    it('should create a new customer and return it', async () => {
      const createCustomerData = { name: 'John Doe', document: '12345678900' };
      const setCustomerMock = jest.spyOn(service, 'setCustomer');

      const result = await service.createCustomer(createCustomerData);

      expect(setCustomerMock).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(String),
          name: 'John Doe',
          document: '12345678900',
        }),
      );
      expect(result.id).toBeDefined();
      expect(result.name).toBe('John Doe');
      newCostumer = result;
    });

    it('should throw HttpException with status 502 when cache is unavailable', async () => {
      const createCustomerData = { name: 'John Doe', document: '12345678900' };
      const setCustomerMock = jest
        .spyOn(service, 'setCustomer')
        .mockRejectedValue(new Error('Cache error'));

      await expect(service.createCustomer(createCustomerData)).rejects.toThrow(
        new HttpException('Cache indisponível', HttpStatus.BAD_GATEWAY),
      );

      expect(setCustomerMock).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(String),
          name: 'John Doe',
        }),
      );
    });
  });

  describe('updateCustomer', () => {
    it('should update an existing customer and return it', async () => {
      const updateCustomerData = {
        id: newCostumer.id,
        name: 'John Doe',
        document: '12345678900',
      };
      const existsCustomerMock = jest
        .spyOn(service, 'existsCustomer')
        .mockResolvedValue(1);
      const setCustomerMock = jest.spyOn(service, 'setCustomer');

      const result = await service.updateCustomer(
        newCostumer.id,
        updateCustomerData,
      );

      expect(existsCustomerMock).toHaveBeenCalledWith(newCostumer.id);
      expect(setCustomerMock).toHaveBeenCalledWith(updateCustomerData);
      expect(result).toEqual(updateCustomerData);
    });

    it('should throw HttpException with status 409 when the ID of the customer is changed', async () => {
      const customerId = '123';
      const updateCustomerData = {
        id: '456',
        name: 'John Doe',
        document: '12345678900',
      };

      jest.spyOn(service, 'existsCustomer').mockImplementation(async (id) => {
        if (id === customerId) {
          return 1;
        }
        return 0;
      });

      await expect(
        service.updateCustomer(customerId, updateCustomerData),
      ).rejects.toThrow(
        new HttpException(
          'O ID do cliente não pode ser alterado',
          HttpStatus.CONFLICT,
        ),
      );
    });

    it('should throw HttpException with status 404 when customer does not exist', async () => {
      const customerId = '123';
      const updateCustomerData = {
        id: customerId,
        name: 'John Doe',
        document: '12345678900',
      };
      const existsCustomerMock = jest
        .spyOn(service, 'existsCustomer')
        .mockResolvedValue(0);

      await expect(
        service.updateCustomer(customerId, updateCustomerData),
      ).rejects.toThrow(
        new HttpException('Cliente inexistente', HttpStatus.NOT_FOUND),
      );

      expect(existsCustomerMock).toHaveBeenCalledWith(customerId);
    });
  });

  describe('getID', () => {
    it('should return the customer when it exists in the cache', async () => {
      const customerId = newCostumer.id;
      const customerData = { id: customerId, name: 'John Doe' };
      const getCustomerMock = jest
        .spyOn(service, 'getCustomer')
        .mockResolvedValue(JSON.stringify(customerData));
      const existsCustomerMock = jest
        .spyOn(service, 'existsCustomer')
        .mockResolvedValue(1);

      const result = await service.getID(customerId);

      expect(existsCustomerMock).toHaveBeenCalledWith(customerId);
      expect(getCustomerMock).toHaveBeenCalledWith(customerId);
      expect(result).toEqual(customerData);
    });

    it('should throw HttpException with status 404 when customer does not exist', async () => {
      const customerId = '123';
      const existsCustomerMock = jest
        .spyOn(service, 'existsCustomer')
        .mockResolvedValue(0);

      await expect(service.getID(customerId)).rejects.toThrow(
        new HttpException('Cliente inexistente', HttpStatus.NOT_FOUND),
      );

      expect(existsCustomerMock).toHaveBeenCalledWith(customerId);
    });

    it('should throw HttpException with status 502 when cache is unavailable', async () => {
      const customerId = '123';
      const existsCustomerMock = jest
        .spyOn(service, 'existsCustomer')
        .mockRejectedValue(new Error('Cache indisponível'));

      await expect(service.getID(customerId)).rejects.toThrow(
        new HttpException('Cache indisponível', HttpStatus.BAD_GATEWAY),
      );

      expect(existsCustomerMock).toHaveBeenCalledWith(customerId);
    });
  });
});
