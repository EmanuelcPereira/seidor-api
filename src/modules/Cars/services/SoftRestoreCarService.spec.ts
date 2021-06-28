import AppError from '@shared/errors/AppError';

import FakeCarsRepository from '../repositories/fake/FakeCarsRepository';
import SoftDeleteCarService from './SoftDeleteCarService';
import SoftRestoreCarService from './SoftRestoreCarService';

let fakeCarsRepository: FakeCarsRepository;
let softDeleteCarService: SoftDeleteCarService;
let softRestoreCarService: SoftRestoreCarService;

describe('Restore car register', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    softDeleteCarService = new SoftDeleteCarService(fakeCarsRepository);
    softRestoreCarService = new SoftRestoreCarService(fakeCarsRepository);
  });

  it('should be able to restore a car register', async () => {
    const car = await fakeCarsRepository.create({
      license_plate: 'abc-123',
      brand: 'volkswagen',
      color: 'verde',
    });

    const { id } = car;

    await softDeleteCarService.execute({ id });

    await softRestoreCarService.execute({ id });

    expect(200);
  });

  it('should not be able to restore a non-existent car register', async () => {
    await expect(
      softRestoreCarService.execute({ id: 'non-existent-d' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
