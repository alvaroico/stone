import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { JwtModule } from '@nestjs/jwt';

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

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(
        customersController.getCustomersID(
          '1a5038f0-c655-4eae-b29e-680fc251eaf6',
        ),
      ).toBe('Hello World!');
    });
  });
});
