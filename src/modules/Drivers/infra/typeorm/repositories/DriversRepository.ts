import ICreateDriverDTO from '@modules/Drivers/dtos/ICreateDriverDTO';
import IDriversRepository from '@modules/Drivers/repositories/IDriversRepository';
import { getRepository, Repository } from 'typeorm';

import Driver from '../entities/Driver';

class DriversRepository implements IDriversRepository {
  private repository: Repository<Driver>;

  constructor() {
    this.repository = getRepository(Driver);
  }

  public async create({ nome }: ICreateDriverDTO): Promise<Driver> {
    const driver = this.repository.create({ nome });

    await this.repository.save(driver);

    return driver;
  }

  public async findById(id: string): Promise<Driver | undefined> {
    const driver = this.repository.findOne({ id });

    return driver;
  }

  public async findByName(nome: string): Promise<Driver | undefined> {
    const driver = this.repository.findOne({ nome });

    return driver;
  }
  public async save(driver: Driver): Promise<Driver> {
    await this.repository.save(driver);

    return driver;
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

  public async findRegistered(nome?: string): Promise<Driver[]> {
    const driverQuery = this.repository
      .createQueryBuilder('find')
      .where('is_deleted = :is_deleted', { is_deleted: false });

    if (nome) {
      driverQuery.andWhere('nome LIKE :nome', { nome: `%${nome}%` });
    }

    const driver = driverQuery.getMany();

    return driver;
  }
}

export default DriversRepository;
