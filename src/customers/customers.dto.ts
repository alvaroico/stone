import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'O documento não pode ser vazio' })
  @IsString({ message: 'O documento deve ser uma string' })
  document: string;

  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;
}

export class UpdateCustomerDto extends CreateCustomerDto {
  @IsNotEmpty({ message: 'O ID não pode ser vazio' })
  @IsString({ message: 'O ID deve ser uma string' })
  id: string;
}
