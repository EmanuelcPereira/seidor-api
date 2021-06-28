import ICreateCarDTO from '@modules/Cars/dtos/ICreateCarDTO';
import ICarsRepository from '@modules/Cars/repositories/ICarsRepository';
import { getRepository, Repository } from 'typeorm';

import Car from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  public async create({
    brand,
    license_plate,
    color,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      license_plate,
      color,
    });

    await this.repository.save(car);

    return car;
  }

  public async findByLicensePlate(
    license_plate: string,
  ): Promise<Car | undefined> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }

  public async findById(id: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ id });

    return car;
  }

  public async save(car: Car): Promise<Car> {
    await this.repository.save(car);

    return car;
  }

  public async softDelete(id: string): Promise<void> {
    await this.repository
      .createQueryBuilder('delete')
      .update()
      .set({ is_deleted: true })
      .where('id = :id')
      .setParameters({ id })
      .execute();
  }

  public async softRestore(id: string): Promise<void> {
    await this.repository
      .createQueryBuilder('restore')
      .update()
      .set({ is_deleted: false })
      .where('id = :id')
      .setParameters({ id })
      .execute();
  }

  public async findRegistered(brand?: string, color?: string): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder()
      .where('is_deleted = :is_deleted', { is_deleted: false });

    if (brand) {
      carsQuery.andWhere('brand = :brand', { brand });
    }

    if (color) {
      carsQuery.andWhere('color = :color', { color });
    }

    const car = carsQuery.getMany();

    return car;
  }
}

export default CarsRepository;
