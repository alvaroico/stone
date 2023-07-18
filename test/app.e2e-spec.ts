import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('API Online!');
  });

  it('/customers (POST) sem token', () => {
    return request(app.getHttpServer())
      .post('/customers')
      .send({
        document: '22233344405',
        name: 'Meu nome',
      })
      .expect(401)
      .expect({ statusCode: 401, message: 'Não autorizado' });
  });

  it('/customers (POST) com token expirado', () => {
    return request(app.getHttpServer())
      .post('/customers')
      .send({
        document: '22233344405',
        name: 'Meu nome',
      })
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyTGYtamFReXZmQTNCN3dpVHZ3VkxhMjV1cHhiXzUtQXhZSDhmY3kySHhVIn0.eyJleHAiOjE2ODk2ODY5NTYsImlhdCI6MTY4OTY4NjY1NiwianRpIjoiNGMxZjFhMDUtNjgxMi00ZGIzLWFjYTktZGViZmFmNmY0ZTM3IiwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5zZWd1cm9zLnZpdHRhLmNvbS5ici9hdXRoL3JlYWxtcy9jYXJlZXJzIiwic3ViIjoiNzk0ZmFkNjktMzkxNy00OThmLThhNjUtMWVjZGU5NjlmMGRiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiY3VzdG9tZXJzIiwiYWNyIjoiMSIsInJlc291cmNlX2FjY2VzcyI6eyJjdXN0b21lcnMiOnsicm9sZXMiOlsidXNlciJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJjbGllbnRJZCI6ImN1c3RvbWVycyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SG9zdCI6IjEwLjUwLjIuMTAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtY3VzdG9tZXJzIiwiY2xpZW50QWRkcmVzcyI6IjEwLjUwLjIuMTAifQ.GmFAht-UGBzvO4ix50esVXaWxhpsgcjpIRxnHXdm2n5-dqraLPKC_sDP1aSOa6lHcI7mAYh3oQChfM-bK7kDxKw1hE4UVAHE5Lss5i2GYljotxOfFV2bFf--2XR8K-ZuCJwZ1voWy6zSU7e0Ojn_PNEFnLI44yCyaPV21aSKQ1sLvQ9EB54o17Q_6nDNAkiNOfUNE761h7PNK7xvjXTJrWMbsGOMd1MzXwnJGOvykRe0jfnWw0IxWLrH-YXWpaoIOGOFq-fjv7R62jLhE0_ijAksKshIpRUw_EmLaNSQXlLXiCuSVekIz93xhzCyag7wPpHHH5mtzLfI88lzZSmB6Q',
      )
      .expect(401)
      .expect({ statusCode: 401, message: 'Não autorizado' });
  });

  it('/customers (POST) com token alterado', () => {
    return request(app.getHttpServer())
      .post('/customers')
      .send({
        document: '22233344405',
        name: 'Meu nome',
      })
      .set(
        'Authorization',
        'Bearer dsfsdfdsfdsf.eyJleHAiOjE2ODk2ODY5NTYsImlhdCI6MTY4OTY4NjY1NiwianRpIjoiNGMxZjFhMDUtNjgxMi00ZGIzLWFjYTktZGViZmFmNmY0ZTM3IiwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5zZWd1cm9zLnZpdHRhLmNvbS5ici9hdXRoL3JlYWxtcy9jYXJlZXJzIiwic3ViIjoiNzk0ZmFkNjktMzkxNy00OThmLThhNjUtMWVjZGU5NjlmMGRiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiY3VzdG9tZXJzIiwiYWNyIjoiMSIsInJlc291cmNlX2FjY2VzcyI6eyJjdXN0b21lcnMiOnsicm9sZXMiOlsidXNlciJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJjbGllbnRJZCI6ImN1c3RvbWVycyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SG9zdCI6IjEwLjUwLjIuMTAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtY3VzdG9tZXJzIiwiY2xpZW50QWRkcmVzcyI6IjEwLjUwLjIuMTAifQ.GmFAht-UGBzvO4ix50esVXaWxhpsgcjpIRxnHXdm2n5-dqraLPKC_sDP1aSOa6lHcI7mAYh3oQChfM-bK7kDxKw1hE4UVAHE5Lss5i2GYljotxOfFV2bFf--2XR8K-ZuCJwZ1voWy6zSU7e0Ojn_PNEFnLI44yCyaPV21aSKQ1sLvQ9EB54o17Q_6nDNAkiNOfUNE761h7PNK7xvjXTJrWMbsGOMd1MzXwnJGOvykRe0jfnWw0IxWLrH-YXWpaoIOGOFq-fjv7R62jLhE0_ijAksKshIpRUw_EmLaNSQXlLXiCuSVekIz93xhzCyag7wPpHHH5mtzLfI88lzZSmB6Q',
      )
      .expect(502)
      .expect({ statusCode: 502, message: 'SSO Indisponível' });
  });
});
