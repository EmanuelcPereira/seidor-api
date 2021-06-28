import ICreateCarDTO from '../dtos/ICreateCarDTO';
import Car from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findById(id: string): Promise<Car | undefined>;
  save(car: Car): Promise<Car>;
  softDelete(id: string): Promise<void>;
  softRestore(id: string): Promise<void>;
  findRegistered(brand?: string, color?: string): Promise<Car[]>;
}

export default ICarsRepository;
