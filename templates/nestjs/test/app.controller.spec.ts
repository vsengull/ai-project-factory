import { describe, expect, it } from 'vitest';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';

describe('AppController', () => {
  it('reports a healthy service', () => {
    const controller = new AppController(new AppService());

    expect(controller.getHealth()).toEqual({
      name: '{{projectName}}',
      status: 'ok',
    });
  });
});
