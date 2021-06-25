import ICreateDriverDTO from '../dtos/ICreateDriverDTO';
import Driver from '../infra/typeorm/entities/Driver';

interface IDriversRepository {
  create(data: ICreateDriverDTO): Promise<Driver>;
  findById(id: string): Promise<Driver | undefined>;
  findByName(nome: string): Promise<Driver | undefined>;
  save(driver: Driver): Promise<Driver>;
  softDelete(id: string): Promise<void>;
  softRestore(id: string): Promise<void>;
  findRegistered(nome?: string): Promise<Driver[]>;
}

export default IDriversRepository;
