import FakeUsageRepository from '../repositories/fake/FakeUsageRepository';
import ListUsageService from './ListUsageService';

let fakeUsageRepository: FakeUsageRepository;
let listUsageService: ListUsageService;

describe('List usage', () => {
  beforeEach(() => {
    fakeUsageRepository = new FakeUsageRepository();
    listUsageService = new ListUsageService(fakeUsageRepository);
  });

  it('should be able to list usage', async () => {
    const usage = await fakeUsageRepository.create({
      driver_id: '6a35a34b-b55d-473d-bb3d-6ef69845c056',
      car_id: '127ab455-203b-4f07-8062-12ca79ff0c64',
      motivation: 'Teste de carro',
    });

    const use = await listUsageService.execute();

    expect(use).toEqual([usage]);
  });
});
