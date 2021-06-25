import Driver from '@modules/Drivers/infra/typeorm/entities/Driver';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateDriverDTO from '../dtos/ICreateDriverDTO';
import IDriversRepository from '../repositories/IDriversRepository';

@injectable()
class CreateDriverService {
  constructor(
    @inject('DriversRepository')
    private driversRepository: IDriversRepository,
  ) { }
  public async execute({ nome }: ICreateDriverDTO): Promise<Driver> {
    const driverExists = await this.driversRepository.findByName(nome);

    if (driverExists) {
      throw new AppError('Driver already registered');
    }

    const driver = this.driversRepository.create({ nome });

    return driver;
  }
}

export default CreateDriverService;
