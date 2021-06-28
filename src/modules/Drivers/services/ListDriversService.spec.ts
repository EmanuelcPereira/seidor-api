import FakeDriversRepository from '../repositories/fake/FakeDriverRepository';
import ListDriversService from './ListDriversService';

let fakeDriversRepository: FakeDriversRepository;
let listDriversService: ListDriversService;

describe('List drivers', () => {
  beforeEach(() => {
    fakeDriversRepository = new FakeDriversRepository();
    listDriversService = new ListDriversService(fakeDriversRepository);
  });

  it('should be able list drivers', async () => {
    const driver = await fakeDriversRepository.create({
      name: 'Fulano da Silva',
    });

    const drivers = await listDriversService.execute({});
    expect(drivers).toEqual([driver]);
  });

  it('should be able to list driver by name', async () => {
    await fakeDriversRepository.create({
      name: 'Fulano da Silva',
    });

    const driver = await listDriversService.execute({
      name: 'Fulano da Silva',
    });
    expect(driver[0].name).toEqual('Fulano da Silva');
  });
});
