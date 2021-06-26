import FakeCarsRepository from '../repositories/fake/FakeCarsRepository';
import ListCarService from './ListCarService';

let fakeCarsRepository: FakeCarsRepository;
let listCarService: ListCarService;

describe('List car', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    listCarService = new ListCarService(fakeCarsRepository);
  });

  it('should be able to list cars', async () => {
    const car = await fakeCarsRepository.create({
      placa: 'abc-123',
      marca: 'volkswagen',
      cor: 'verde',
    });

    const cars = await listCarService.execute({});
    expect(cars).toEqual([car]);
  });

  it('should be able to list cars by marca', async () => {
    await fakeCarsRepository.create({
      marca: 'Ford',
      placa: 'ABC-1234',
      cor: 'branco',
    });

    const car = await listCarService.execute({ marca: 'Ford' });
    expect(car[0].marca).toEqual('Ford');
  });

  it('should be able to list cars by cor', async () => {
    await fakeCarsRepository.create({
      marca: 'Fiat',
      placa: 'GTW-9043',
      cor: 'verde',
    });

    const car = await listCarService.execute({ cor: 'verde' });
    expect(car[0].cor).toEqual('verde');
  });
});
