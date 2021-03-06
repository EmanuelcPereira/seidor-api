import IDriversRepository from '@modules/Drivers/repositories/IDriversRepository';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Driver from '../infra/typeorm/entities/Driver';

interface IRequest {
  id: string;
  name: string;
}

@injectable()
class UpdateDriverService {
  constructor(
    @inject('DriversRepository')
    private driversRepository: IDriversRepository,
  ) {}

  public async execute({ id, name }: IRequest): Promise<Driver> {
    const driver = await this.driversRepository.findById(id);

    if (!driver) {
      throw new AppError('Driver register not found');
    }

    driver.name = name;

    await this.driversRepository.save(driver);

    return driver;
  }
}

export default UpdateDriverService;
