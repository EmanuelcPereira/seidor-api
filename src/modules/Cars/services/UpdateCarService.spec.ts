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
      marca: 'Ford',
      placa: 'ABC-1234',
      cor: 'branco',
    });

    const updatedCar = await updateCarService.execute({
      id: car.id,
      marca: 'Fiat',
      placa: 'DEF-5678',
      cor: 'azul',
    });

    expect(updatedCar.marca).toBe('Fiat');
    expect(updatedCar.cor).toBe('azul');
  });

  it('should not be able to update a not found car', async () => {
    await expect(
      updateCarService.execute({
        id: 'non-existent-id',
        marca: 'Ford',
        placa: 'ABC-1234',
        cor: 'branco',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a car with already registered placa', async () => {
    const car1 = await fakeCarsRepository.create({
      marca: 'Ford',
      placa: 'ABC-1234',
      cor: 'branco',
    });

    const car2 = await fakeCarsRepository.create({
      marca: 'Chevrolet',
      placa: 'DEF-5678',
      cor: 'verde',
    });

    await expect(
      updateCarService.execute({
        id: car2.id,
        marca: 'Fiat',
        placa: 'ABC-1234',
        cor: 'azul',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
