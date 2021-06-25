import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDriversRepository from '../repositories/IDriversRepository';

interface IRequest {
  id: string;
}

@injectable()
class SoftDeleteDriverService {
  constructor(
    @inject('DriversRepository')
    private driversRepository: IDriversRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<void> {
    const driverExists = await this.driversRepository.findById(id);

    if (!driverExists) {
      throw new AppError('Driver register not found');
    }

    await this.driversRepository.softDelete(id);
  }
}

export default SoftDeleteDriverService;
