import ICreateUsageDTO from '@modules/Usage/dtos/ICreateUsageDTO';
import Usage from '@modules/Usage/infra/typeorm/entities/Usage';
import IUsageRepository from '@modules/Usage/repositories/IUsageRepository';
import { v4 as uuid } from 'uuid';

class FakeUsageRepository implements IUsageRepository {
  use: Usage[] = [];
  public async create({
    driver_id,
    car_id,
    motivation,
  }: ICreateUsageDTO): Promise<Usage> {
    const usage = new Usage();

    usage.id = uuid();
    usage.driver_id = driver_id;
    usage.car_id = car_id;
    usage.motivation = motivation;

    this.use.push(usage);

    return usage;
  }
  public async findCarAvailability(car_id: string): Promise<Usage | undefined> {
    return this.use.find(usage => usage.car_id === car_id && !usage.end_date);
  }
  public async findDriverAvailability(
    driver_id: string,
  ): Promise<Usage | undefined> {
    return this.use.find(
      usage => usage.driver_id === driver_id && !usage.end_date,
    );
  }
  public async findById(usage_id: string): Promise<Usage | undefined> {
    return this.use.find(usage => usage.id === usage_id);
  }
  public async save(usage: Usage): Promise<Usage> {
    const findIndex = this.use.findIndex(
      usageIndex => usageIndex.id === usage.id,
    );

    this.use[findIndex] = usage;

    return usage;
  }
  public async findAll(): Promise<Usage[]> {
    const usage = this.use.map(usage => usage);

    return usage;
  }
}

export default FakeUsageRepository;
