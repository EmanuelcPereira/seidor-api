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

  async findByPlaca(placa: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ placa });

    return car;
  }
}

export default CarsRepository;
