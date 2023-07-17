import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ITokenJWT } from './auth.guard.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  decodeToken(token: string): any {
    return this.jwtService.decode(token.replace('Bearer ', ''));
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authorization = context.switchToHttp().getRequest()
      .headers.authorization;

    if (!authorization)
      throw new HttpException('Não autorizado', HttpStatus.UNAUTHORIZED);

    const request = this.decodeToken(authorization) as ITokenJWT;

    if (!request)
      throw new HttpException('SSO Indisponível', HttpStatus.BAD_GATEWAY);
    if (request.exp < Date.now())
      throw new HttpException('Não autorizado', HttpStatus.UNAUTHORIZED);
    return true;
  }
}
