import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Car from '../infra/typeorm/entities/Car';
import ICarsRepository from '../repositories/ICarsRepository';

interface IRequest {
  id: string;
  brand: string;
  license_plate: string;
  color: string;
}

@injectable()
class UpdateCarService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) { }

  public async execute({
    id,
    brand,
    license_plate,
    color,
  }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(id);

    if (!car) {
      throw new AppError('Car not registered');
    }

    const license_plateExists = await this.carsRepository.findByLicensePlate(
      license_plate,
    );

    if (license_plateExists) {
      throw new AppError('There is a car registered with this license_plate');
    }

    car.brand = brand;
    car.license_plate = license_plate;
    car.color = color;

    await this.carsRepository.save(car);

    return car;
  }
}

export default UpdateCarService;
