import ICreateUsageDTO from '@modules/Usage/dtos/ICreateUsageDTO';
import IUsageRepository from '@modules/Usage/repositories/IUsageRepository';
import { getRepository, Repository } from 'typeorm';

import Usage from '../entities/Usage';

class UsageRepository implements IUsageRepository {
  private repository: Repository<Usage>;

  constructor() {
    this.repository = getRepository(Usage);
  }

  public async create({
    driver_id,
    car_id,
    start_date,
    motivo,
  }: ICreateUsageDTO): Promise<Usage> {
    const usage = this.repository.create({
      driver_id,
      car_id,
      start_date,
      motivo,
    });

    await this.repository.save(usage);

    return usage;
  }
  public async findCarAvailability(car_id: string): Promise<Usage | undefined> {
    const carAvailable = await this.repository.findOne({
      where: { car_id, end_date: null },
    });

    return carAvailable;
  }

  public async findDriverAvailability(
    driver_id: string,
  ): Promise<Usage | undefined> {
    const driverAvailable = await this.repository.findOne({
      where: { driver_id, end_date: null },
    });

    return driverAvailable;
  }

  public async findById(id: string): Promise<Usage | undefined> {
    const usage = await this.repository.findOne(id);

    return usage;
  }

  public async save(usage: Usage): Promise<Usage> {
    await this.repository.save(usage);

    return usage;
  }

  public async findAll(): Promise<Usage[]> {
    const usage = await this.repository.find({
      relations: ['car', 'driver'],
    });

    return usage;
  }
}

export default UsageRepository;
