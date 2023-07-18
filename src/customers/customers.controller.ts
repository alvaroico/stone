import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { IGetUpdateCustomer } from './customers.interface';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateCustomerDto, UpdateCustomerDto } from './customers.dto';

@Controller('customers')
@UseGuards(AuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':id')
  async getCustomersID(@Param('id') id: string): Promise<IGetUpdateCustomer> {
    return await this.customersService.getID(id);
  }

  @Post()
  async postCustomersID(
    @Body(new ValidationPipe()) createCustomer: CreateCustomerDto,
  ): Promise<IGetUpdateCustomer> {
    return await this.customersService.createCustomer(createCustomer);
  }

  @Put(':id')
  putCustomersID(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateCustomer: UpdateCustomerDto,
  ): Promise<IGetUpdateCustomer> {
    return this.customersService.updateCustomer(id, updateCustomer);
  }
}
