import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { CustomersModule } from './customers.module';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

describe('Customers Module', () => {
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [JwtModule.register({}), CustomersModule], // Importe o CustomersModule aqui
      controllers: [CustomersController],
      providers: [CustomersService],
    }).compile();
  });

  it('Verificar se definido', () => {
    const module = testingModule.get<CustomersModule>(CustomersModule);
    expect(module).toBeDefined();
  });

  it('Verificando as dependências corretas', () => {
    const controller =
      testingModule.get<CustomersController>(CustomersController);
    const service = testingModule.get<CustomersService>(CustomersService);

    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
