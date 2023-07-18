import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenJWT } from './auth.guard.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  decodeToken(token: string): any {
    return this.jwtService.decode(token.replace('Bearer ', ''));
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const authorization = context.switchToHttp().getRequest().headers
      .authorization as string;

    if (!authorization)
      throw new HttpException('Não autorizado', HttpStatus.UNAUTHORIZED);

    const request = this.decodeToken(authorization) as ITokenJWT;

    if (!request)
      throw new HttpException('SSO Indisponível', HttpStatus.BAD_GATEWAY);

    if (request.exp * 1000 < Date.now())
      throw new HttpException('Não autorizado', HttpStatus.UNAUTHORIZED);
    return true;
  }
}
