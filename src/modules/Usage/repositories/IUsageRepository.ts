import ICreateUsageDTO from '../dtos/ICreateUsageDTO';
import Usage from '../infra/typeorm/entities/Usage';

interface IUsageRepository {
  create(data: ICreateUsageDTO): Promise<Usage>;
  findCarAvailability(car_id: string): Promise<Usage | undefined>;
  findDriverAvailability(driver_id: string): Promise<Usage | undefined>;
  findById(usage_id: string): Promise<Usage | undefined>;
  save(usage: Usage): Promise<Usage>;
  findAll(): Promise<Usage[]>;
}

export default IUsageRepository;
