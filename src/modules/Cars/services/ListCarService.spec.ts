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
      license_plate: 'abc-123',
      brand: 'volkswagen',
      color: 'verde',
    });

    const cars = await listCarService.execute({});
    expect(cars).toEqual([car]);
  });

  it('should be able to list cars by brand', async () => {
    await fakeCarsRepository.create({
      brand: 'Ford',
      license_plate: 'ABC-1234',
      color: 'branco',
    });

    const car = await listCarService.execute({ brand: 'Ford' });
    expect(car[0].brand).toEqual('Ford');
  });

  it('should be able to list cars by color', async () => {
    await fakeCarsRepository.create({
      brand: 'Fiat',
      license_plate: 'GTW-9043',
      color: 'verde',
    });

    const car = await listCarService.execute({ color: 'verde' });
    expect(car[0].color).toEqual('verde');
  });
});
