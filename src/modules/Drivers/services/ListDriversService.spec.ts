import AppError from '@shared/errors/AppError';

import FakeDriversRepository from '../repositories/fake/FakeDriverRepository';
import ListDriversService from './ListDriversService';

let fakeDriversRepository: FakeDriversRepository;
let listDriversService: ListDriversService;

describe('List drivers', () => {
  beforeEach(() => {
    fakeDriversRepository = new FakeDriversRepository();
    listDriversService = new ListDriversService(fakeDriversRepository);
  });

  it('should be able to create a new driver', async () => {
    const driver = await fakeDriversRepository.create({
      nome: 'Fulano da Silva',
    });

    const drivers = await listDriversService.execute({});
    expect(drivers).toEqual([driver]);
  });

  it('should be able to list driver by name', async () => {
    await fakeDriversRepository.create({
      nome: 'Fulano da Silva',
    });

    const driver = await listDriversService.execute({
      nome: 'Fulano da Silva',
    });
    expect(driver[0].nome).toEqual('Fulano da Silva');
  });
});
