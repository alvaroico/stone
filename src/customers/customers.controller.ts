import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { ICreateCustomer, IUpdateCustomer } from './customers.interface';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  async getCustomersID(
    @Param('id') id: string,
  ): Promise<string | HttpException> {
    return await this.customersService.getID(id);
  }

  @Put(':id')
  putCustomersID(
    @Param('id') id: string,
    @Body() updateCustomer: IUpdateCustomer,
  ): any {
    return this.customersService.updateCustomer(id, updateCustomer);
  }

  @Post()
  postCustomersID(@Body() createCustomer: ICreateCustomer): ICreateCustomer {
    return this.customersService.createCustomer(createCustomer);
  }
}
