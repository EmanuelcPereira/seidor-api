import AppError from '@shared/errors/AppError';

import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';
import CreateCarService from './CreateCarService';

let fakeCarsRepository: FakeCarsRepository;
let createCarService: CreateCarService;

describe('Create car', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    createCarService = new CreateCarService(fakeCarsRepository);
  });

  it('should be able to create a car', async () => {
    const car = await createCarService.execute({
      marca: 'Ford',
      placa: 'ABC-1234',
      cor: 'branco',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with same placa', async () => {
    await createCarService.execute({
      marca: 'Ford',
      placa: 'ABC-1234',
      cor: 'branco',
    });

    await expect(
      createCarService.execute({
        marca: 'Fiat',
        placa: 'ABC-1234',
        cor: 'verde',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
