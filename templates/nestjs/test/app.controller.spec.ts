import { Test } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';

describe('AppController', () => {
  it('reports a healthy service', async () => {
    const module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    expect(module.get(AppController).getHealth()).toEqual({
      name: '{{projectName}}',
      status: 'ok',
    });
  });
});
