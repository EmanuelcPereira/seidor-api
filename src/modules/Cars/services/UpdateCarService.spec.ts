import AppError from '@shared/errors/AppError';

import FakeCarsRepository from '../repositories/fake/FakeCarsRepository';
import UpdateCarService from './UpdateCarService';

let fakeCarsRepository: FakeCarsRepository;
let updateCarService: UpdateCarService;

describe('Update car', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    updateCarService = new UpdateCarService(fakeCarsRepository);
  });

  it('should be able to update a car', async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Ford',
      license_plate: 'ABC-1234',
      color: 'branco',
    });

    const updatedCar = await updateCarService.execute({
      id: car.id,
      brand: 'Fiat',
      license_plate: 'DEF-5678',
      color: 'azul',
    });

    expect(updatedCar.brand).toBe('Fiat');
    expect(updatedCar.color).toBe('azul');
  });

  it('should not be able to update a not found car', async () => {
    await expect(
      updateCarService.execute({
        id: 'non-existent-id',
        brand: 'Ford',
        license_plate: 'ABC-1234',
        color: 'branco',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a car with already registered license_plate', async () => {
    await fakeCarsRepository.create({
      brand: 'Ford',
      license_plate: 'ABC-1234',
      color: 'branco',
    });

    const car2 = await fakeCarsRepository.create({
      brand: 'Chevrolet',
      license_plate: 'DEF-5678',
      color: 'verde',
    });

    await expect(
      updateCarService.execute({
        id: car2.id,
        brand: 'Fiat',
        license_plate: 'ABC-1234',
        color: 'azul',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
