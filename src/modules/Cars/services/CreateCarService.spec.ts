import AppError from '@shared/errors/AppError';

import FakeCarsRepository from '../repositories/fake/FakeCarsRepository';
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
      brand: 'Ford',
      license_plate: 'ABC-1234',
      color: 'branco',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with same license_plate', async () => {
    await createCarService.execute({
      brand: 'Ford',
      license_plate: 'ABC-1234',
      color: 'branco',
    });

    await expect(
      createCarService.execute({
        brand: 'Fiat',
        license_plate: 'ABC-1234',
        color: 'verde',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
