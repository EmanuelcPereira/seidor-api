import AppError from '@shared/errors/AppError';

import FakeDriversRepository from '../repositories/fake/FakeDriverRepository';
import SoftDeleteDriverService from './SoftDeleteDriverService';

let fakeDriversRepository: FakeDriversRepository;
let softDeleteDriverService: SoftDeleteDriverService;

describe('Soft Delete driver', () => {
  beforeEach(() => {
    fakeDriversRepository = new FakeDriversRepository();
    softDeleteDriverService = new SoftDeleteDriverService(
      fakeDriversRepository,
    );
  });

  it('should be able to soft delete a driver', async () => {
    const driver = await fakeDriversRepository.create({
      name: 'Beltrano da Silva',
    });

    const { id } = driver;

    await softDeleteDriverService.execute({ id });

    expect(200);
  });

  it('should not be able to soft delete a non-existent car', async () => {
    await expect(
      softDeleteDriverService.execute({ id: 'non-existent-d' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
