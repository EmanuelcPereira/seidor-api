import AppError from '@shared/errors/AppError';

import FakeDriversRepository from '../repositories/fake/FakeDriverRepository';
import SoftDeleteDriverService from './SoftDeleteDriverService';
import SoftRestoreDriverService from './SoftRestoreDriverService';

let fakeDriversRepository: FakeDriversRepository;
let softDeleteDriverService: SoftDeleteDriverService;
let softRestoreDriverService: SoftRestoreDriverService;

describe('Restore driver register', () => {
  beforeEach(() => {
    fakeDriversRepository = new FakeDriversRepository();
    softDeleteDriverService = new SoftDeleteDriverService(
      fakeDriversRepository,
    );
    softRestoreDriverService = new SoftRestoreDriverService(
      fakeDriversRepository,
    );
  });

  it('should be able to restore a driver register', async () => {
    const driver = await fakeDriversRepository.create({
      nome: 'Beltrano da Silva',
    });

    const { id } = driver;

    await softDeleteDriverService.execute({ id });

    await softRestoreDriverService.execute({ id });

    expect(200);
  });

  it('should not be able to restore a non-existent driver register', async () => {
    await expect(
      softRestoreDriverService.execute({ id: 'non-existent-d' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
