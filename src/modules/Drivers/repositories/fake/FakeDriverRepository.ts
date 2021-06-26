import ICreateDriverDTO from '@modules/Drivers/dtos/ICreateDriverDTO';
import Driver from '@modules/Drivers/infra/typeorm/entities/Driver';
import IDriversRepository from '@modules/Drivers/repositories/IDriversRepository';
import { v4 as uuid } from 'uuid';

class FakeDriversRepository implements IDriversRepository {
  drivers: Driver[] = [];

  public async create({ nome }: ICreateDriverDTO): Promise<Driver> {
    const driver = new Driver();

    driver.id = uuid();
    driver.nome = nome;
    driver.is_deleted = false;

    this.drivers.push(driver);

    return driver;
  }
  public async findById(id: string): Promise<Driver | undefined> {
    return this.drivers.find(driver => driver.id === id);
  }
  public async findByName(nome: string): Promise<Driver | undefined> {
    return this.drivers.find(driver => driver.nome === nome);
  }
  public async save(driver: Driver): Promise<Driver> {
    const findIndex = this.drivers.findIndex(
      driverIndex => driverIndex.id === driver.id,
    );

    this.drivers[findIndex] = driver;

    return driver;
  }
  public async softDelete(id: string): Promise<void> {
    const driver = this.drivers.find(driver => driver.id === id);
    if (driver) {
      driver.is_deleted = true;
    }
  }
  public async softRestore(id: string): Promise<void> {
    const driver = this.drivers.find(driver => driver.id === id);
    if (driver) {
      driver.is_deleted = false;
    }
  }
  public async findRegistered(nome?: string): Promise<Driver[]> {
    const allDrivers = this.drivers.filter(driver => {
      if (driver.is_deleted === false || (nome && driver.nome === nome)) {
        return driver;
      }
      return null;
    });

    return allDrivers;
  }
}

export default FakeDriversRepository;
