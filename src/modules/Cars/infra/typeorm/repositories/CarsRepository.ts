import ICreateCarDTO from '@modules/Cars/dtos/ICreateCarDTO';
import ICarsRepository from '@modules/Cars/repositories/ICarsRepository';
import { getRepository, Repository } from 'typeorm';

import Car from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  public async create({ marca, placa, cor }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      marca,
      placa,
      cor,
    });

    await this.repository.save(car);

    return car;
  }

  public async findByPlaca(placa: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ placa });

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

  public async findRegistered(marca?: string, cor?: string): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder()
      .where('is_deleted = :is_deleted', { is_deleted: false });

    if (marca) {
      carsQuery.andWhere('marca = :marca', { marca });
    }

    if (cor) {
      carsQuery.andWhere('cor = :cor', { cor });
    }

    const car = carsQuery.getMany();

    return car;
  }
}

export default CarsRepository;
