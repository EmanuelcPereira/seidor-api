import AppError from '@shared/errors/AppError';

import FakeCarsRepository from '../repositories/fake/FakeCarsRepository';
import SoftDeleteCarService from './SoftDeleteCarService';

let fakeCarsRepository: FakeCarsRepository;
let softDeleteCarService: SoftDeleteCarService;

describe('Soft Delete car', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    softDeleteCarService = new SoftDeleteCarService(fakeCarsRepository);
  });

  it('should be able to soft delete a car', async () => {
    const car = await fakeCarsRepository.create({
      placa: 'abc-123',
      marca: 'volkswagen',
      cor: 'verde',
    });

    const { id } = car;

    await softDeleteCarService.execute({ id });

    expect(200);
  });

  it('should not be able to soft delete a non-existent car', async () => {
    await expect(
      softDeleteCarService.execute({ id: 'non-existent-d' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
