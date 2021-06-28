import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Car from '../infra/typeorm/entities/Car';
import ICarsRepository from '../repositories/ICarsRepository';

interface IRequest {
  brand: string;
  license_plate: string;
  color: string;
}

@injectable()
class CreateCarService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) { }

  public async execute({
    brand,
    license_plate,
    color,
  }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findByLicensePlate(
      license_plate,
    );

    if (carExists) {
      throw new AppError('car already registered');
    }

    const car = this.carsRepository.create({
      brand,
      license_plate,
      color,
    });

    return car;
  }
}

export default CreateCarService;
