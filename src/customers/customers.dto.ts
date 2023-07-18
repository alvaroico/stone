import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  id?: string;

  @IsNotEmpty({ message: 'O documento não pode ser vazio' })
  @IsString({ message: 'O documento deve ser uma string' })
  document: string;

  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;
}
