import ICreateCarDTO from '@modules/Cars/dtos/ICreateCarDTO';
import Car from '@modules/Cars/infra/typeorm/entities/Car';
import ICarsRepository from '@modules/Cars/repositories/ICarsRepository';
import { v4 as uuid } from 'uuid';

class FakeCarsRepository implements ICarsRepository {
  cars: Car[] = [];

  public async create({
    brand,
    color,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    car.id = uuid();
    car.brand = brand;
    car.license_plate = license_plate;
    car.color = color;
    car.is_deleted = false;

    this.cars.push(car);

    return car;
  }
  public async findByLicensePlate(
    license_plate: string,
  ): Promise<Car | undefined> {
    return this.cars.find(car => car.license_plate === license_plate);
  }
  public async findById(id: string): Promise<Car | undefined> {
    return this.cars.find(car => car.id === id);
  }
  public async save(car: Car): Promise<Car> {
    const findIndex = this.cars.findIndex(carIndex => carIndex.id === car.id);

    this.cars[findIndex] = car;

    return car;
  }
  public async softDelete(id: string): Promise<void> {
    const car = this.cars.find(car => car.id === id);
    if (car) {
      car.is_deleted = true;
    }
  }
  public async softRestore(id: string): Promise<void> {
    const car = this.cars.find(car => car.id === id);
    if (car) {
      car.is_deleted = false;
    }
  }
  public async findRegistered(brand?: string, color?: string): Promise<Car[]> {
    const allCars = this.cars.filter(car => {
      if (
        car.is_deleted === false ||
        (brand && car.brand === brand) ||
        (color && car.color === color)
      ) {
        return car;
      }
      return null;
    });

    return allCars;
  }
}

export default FakeCarsRepository;
