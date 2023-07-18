import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Verificando API online' })
  @ApiTags('Check API')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
