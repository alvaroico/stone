import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { JwtModule } from '@nestjs/jwt';
import { IGetUpdateCustomer } from './customers.interface';

describe('Customers Controller', () => {
  let customersController: CustomersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      controllers: [CustomersController],
      providers: [CustomersService],
    }).compile();

    customersController = app.get<CustomersController>(CustomersController);
  });

  const dataCustomers = {
    document: '22233344405',
    name: 'Meu nome',
  };

  let dataCustomersNew = {} as IGetUpdateCustomer;

  describe('Salvar um novo cliente', function () {
    it('Criando novo cliente', async function () {
      const result = await customersController.postCustomersID(dataCustomers);
      expect(result.document).toBe(dataCustomers.document);
      expect(result.name).toBe(dataCustomers.name);
      dataCustomersNew = result;
    });
  });

  describe('Get Teste', function () {
    it('Buscando ID', async function () {
      const result = await customersController.getCustomersID(
        dataCustomersNew.id,
      );
      expect(result.document).toBe(dataCustomers.document);
      expect(result.document).toBe(dataCustomers.document);
      expect(result.id).toBe(dataCustomersNew.id);
    });
  });

  describe('Put Teste', function () {
    it('Atualizar um cliente ID', async function () {
      dataCustomersNew.name = 'Meu nome atualizado';
      dataCustomersNew.document = '22233344406';
      const result = await customersController.putCustomersID(
        dataCustomersNew.id,
        dataCustomersNew,
      );
      expect(result.document).toBe(dataCustomersNew.document);
      expect(result.name).toBe(dataCustomersNew.name);
      expect(result.id).toBe(dataCustomersNew.id);
    });
  });
});
