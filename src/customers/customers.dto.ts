import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    example: '22233344405',
    description: 'Digite seu documento',
  })
  @IsNotEmpty({ message: 'O documento não pode ser vazio' })
  @IsString({ message: 'O documento deve ser uma string' })
  document: string;

  @ApiProperty({
    example: 'Alvaro Ribeiro Pereira',
    description: 'Digite seu nome',
  })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;
}

export class UpdateCustomerDto extends CreateCustomerDto {
  @ApiProperty({
    example: 'a821eb22-8247-43e6-af3a-0311db4c578f',
    description: 'Gerada Automaticamente',
  })
  @IsNotEmpty({ message: 'O ID não pode ser vazio' })
  @IsString({ message: 'O ID deve ser uma string' })
  id: string;
}
