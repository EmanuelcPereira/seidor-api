import AppError from '@shared/errors/AppError';

import FakeDriversRepository from '../repositories/fake/FakeDriverRepository';
import UpdateDriverService from './UpdateDriverService';

let fakeDriversRepository: FakeDriversRepository;
let updateDriverService: UpdateDriverService;

describe('Update driver register', () => {
  beforeEach(() => {
    fakeDriversRepository = new FakeDriversRepository();
    updateDriverService = new UpdateDriverService(fakeDriversRepository);
  });

  it('should be able to update driver register', async () => {
    const driver = await fakeDriversRepository.create({
      name: 'Beltrano da Silva',
    });

    const updatedDriver = await updateDriverService.execute({
      id: driver.id,
      name: 'Beltrano de Souza',
    });

    expect(updatedDriver.name).toBe('Beltrano de Souza');
  });

  it('should not be able to update a not found driver', async () => {
    await expect(
      updateDriverService.execute({
        id: 'non-existent-id',
        name: 'Beltrano da Silva',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
