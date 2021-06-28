import AppError from '@shared/errors/AppError';

import FakeUsageRepository from '../repositories/fake/FakeUsageRepository';
import CreateUsageService from './createUsageService';

let fakeUsageRepository: FakeUsageRepository;
let createUsageService: CreateUsageService;

describe('Create usage', () => {
  beforeEach(() => {
    fakeUsageRepository = new FakeUsageRepository();
    createUsageService = new CreateUsageService(fakeUsageRepository);
  });

  it('should be able to create a new usage', async () => {
    const usage = await createUsageService.execute({
      driver_id: '6a35a34b-b55d-473d-bb3d-6ef69845c056',
      car_id: '127ab455-203b-4f07-8062-12ca79ff0c64',
      motivation: 'car test',
    });

    expect(usage).toHaveProperty('id');
  });

  it('should not be able to create a new usage if car is in use', async () => {
    await createUsageService.execute({
      driver_id: '6a35a34b-b55d-473d-bb3d-6ef69845c056',
      car_id: '127ab455-203b-4f07-8062-12ca79ff0c64',
      motivation: 'car test',
    });

    await expect(
      createUsageService.execute({
        driver_id: '6e2769af-e3bb-42fd-9cec-97afc3db1552',
        car_id: '127ab455-203b-4f07-8062-12ca79ff0c64',
        motivation: 'car test',
      }),
    ).rejects.toEqual(new AppError('Car unavailable'));
  });

  it('should not be able to create a new usage if driver have car in use', async () => {
    await createUsageService.execute({
      driver_id: '41c45d80-0ad0-4d4c-9897-958edc3b13c9',
      car_id: '127ab455-203b-4f07-8062-12ca79ff0c64',
      motivation: 'car test',
    });

    await expect(
      createUsageService.execute({
        driver_id: '41c45d80-0ad0-4d4c-9897-958edc3b13c9',
        car_id: 'afffa0a5-d3ad-4324-99fd-e9d37c0e289e',
        motivation: 'car test',
      }),
    ).rejects.toEqual(new AppError('This driver already have a car in use'));
  });

  it('should not be able to create a new usage without motivation', async () => {
    await expect(
      createUsageService.execute({
        driver_id: '41c45d80-0ad0-4d4c-9897-958edc3b13c9',
        car_id: 'afffa0a5-d3ad-4324-99fd-e9d37c0e289e',
        motivation: ' ',
      }),
    ).rejects.toEqual(
      new AppError('It is necessary inform a motivation to use a car'),
    );
  });
});
