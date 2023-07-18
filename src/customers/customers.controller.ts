import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { IGetUpdateCustomer } from './customers.interface';
import { AuthGuard } from '../guard/auth.guard';
import { CreateCustomerDto, UpdateCustomerDto } from './customers.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('customers')
@Controller('customers')
@UseGuards(AuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um Customer por ID' })
  @ApiResponse({
    status: 200,
    description: 'Customer',
    type: UpdateCustomerDto,
  })
  @ApiResponse({
    status: 401,
    description: 'não autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'cliente inexistente',
  })
  @ApiResponse({
    status: 502,
    description: 'cache indisponível',
  })
  @ApiResponse({
    status: 502,
    description: 'sso indisponível',
  })
  async getCustomersID(@Param('id') id: string): Promise<IGetUpdateCustomer> {
    return await this.customersService.getID(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um Customer' })
  @ApiResponse({
    status: 201,
    description: 'Customer',
    type: UpdateCustomerDto,
  })
  @ApiResponse({
    status: 401,
    description: 'não autorizado',
  })
  @ApiResponse({
    status: 400,
    description: 'request inválida',
  })
  @ApiResponse({
    status: 502,
    description: 'cache indisponível',
  })
  @ApiResponse({
    status: 502,
    description: 'sso indisponível',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ type: CreateCustomerDto })
  async postCustomersID(
    @Body(new ValidationPipe()) createCustomer: CreateCustomerDto,
  ): Promise<IGetUpdateCustomer> {
    return await this.customersService.createCustomer(createCustomer);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um Customer pelo ID' })
  @ApiResponse({
    status: 201,
    description: 'Customer',
    type: UpdateCustomerDto,
  })
  @ApiResponse({
    status: 401,
    description: 'não autorizado',
  })
  @ApiResponse({
    status: 400,
    description: 'request inválida',
  })
  @ApiResponse({
    status: 404,
    description: 'cliente inexistente',
  })
  @ApiResponse({
    status: 409,
    description: 'conflito de ID',
  })
  @ApiResponse({
    status: 502,
    description: 'cache indisponível',
  })
  @ApiResponse({
    status: 502,
    description: 'sso indisponível',
  })
  async putCustomersID(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateCustomer: UpdateCustomerDto,
  ): Promise<IGetUpdateCustomer> {
    return await this.customersService.updateCustomer(id, updateCustomer);
  }
}
