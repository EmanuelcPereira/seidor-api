import AppError from '@shared/errors/AppError';

import FakeUsageRepository from '../repositories/fake/FakeUsageRepository';
import DevolutionUsageService from './DevolutionUsageService';

let fakeUsageRepository: FakeUsageRepository;
let devolutionUsageService: DevolutionUsageService;

describe('Devolute usage', () => {
  beforeEach(() => {
    fakeUsageRepository = new FakeUsageRepository();
    devolutionUsageService = new DevolutionUsageService(fakeUsageRepository);
  });

  it('should be able to devolute usage', async () => {
    const usage = await fakeUsageRepository.create({
      driver_id: '6a35a34b-b55d-473d-bb3d-6ef69845c056',
      car_id: '127ab455-203b-4f07-8062-12ca79ff0c64',
      motivo: 'Teste de carro',
    });

    await devolutionUsageService.execute(usage);

    expect(usage.end_date).not.toBeNull();
  });

  it('should not be able to devolute a non-existent usage', async () => {
    await expect(
      devolutionUsageService.execute({ id: 'non-existent-d' }),
    ).rejects.toEqual(new AppError('Usage does not exists'));
  });
});
