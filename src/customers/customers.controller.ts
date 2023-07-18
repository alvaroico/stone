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
import { CreateCustomerDto } from './customers.dto';

@Controller('customers')
@UseGuards(AuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':id')
  async getCustomersID(
    @Param('id') id: string,
  ): Promise<string | HttpException> {
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
    @Body() updateCustomer: IGetUpdateCustomer,
  ): any {
    return this.customersService.updateCustomer(id, updateCustomer);
  }
}
