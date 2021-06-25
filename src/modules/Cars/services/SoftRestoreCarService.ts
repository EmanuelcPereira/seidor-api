import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICarsRepository from '../repositories/ICarsRepository';

interface IRequest {
  id: string;
}

@injectable()
class SoftRestoreCarService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(id);

    if (!carExists) {
      throw new AppError('Car not found');
    }

    await this.carsRepository.softRestore(id);
  }
}

export default SoftRestoreCarService;
