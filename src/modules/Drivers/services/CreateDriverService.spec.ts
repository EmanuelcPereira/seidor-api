import AppError from '@shared/errors/AppError';

import FakeDriversRepository from '../repositories/fake/FakeDriverRepository';
import CreateDriverService from './CreateDriverService';

let fakeDriversRepository: FakeDriversRepository;
let createDriverService: CreateDriverService;

describe('Create driver', () => {
  beforeEach(() => {
    fakeDriversRepository = new FakeDriversRepository();
    createDriverService = new CreateDriverService(fakeDriversRepository);
  });

  it('should be able to create a new driver', async () => {
    const driver = await createDriverService.execute({
      name: 'Fulano da Silva',
    });

    expect(driver).toHaveProperty('id');
  });

  it('should not be able to create a new driver with same name', async () => {
    await createDriverService.execute({
      name: 'Fulano da Silva',
    });

    await expect(
      createDriverService.execute({
        name: 'Fulano da Silva',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
