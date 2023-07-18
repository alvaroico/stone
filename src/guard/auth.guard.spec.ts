import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            decode: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    let context: ExecutionContext;
    let noAuthorization: ExecutionContext;

    beforeEach(() => {
      context = {
        switchToHttp: jest.fn(() => ({
          getRequest: jest.fn(() => ({
            headers: {
              authorization: 'Bearer token123',
            },
          })),
        })) as any,
      } as ExecutionContext;

      noAuthorization = {
        switchToHttp: jest.fn(() => ({
          getRequest: jest.fn(() => ({
            headers: {},
          })),
        })) as any,
      } as ExecutionContext;
    });

    it('should throw an unauthorized exception if authorization header is missing', () => {
      expect(() => guard.canActivate(noAuthorization)).toThrowError(
        new HttpException('Não autorizado', HttpStatus.UNAUTHORIZED),
      );
    });

    it('should throw a bad gateway exception if the token cannot be decoded', () => {
      expect(() => guard.canActivate(context)).toThrowError(
        new HttpException('SSO Indisponível', HttpStatus.BAD_GATEWAY),
      );
    });
  });
});
