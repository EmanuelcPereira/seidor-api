import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Car from '../infra/typeorm/entities/Car';
import ICarsRepository from '../repositories/ICarsRepository';

interface IRequest {
  id: string;
  marca: string;
  placa: string;
  cor: string;
}

@injectable()
class UpdateCarService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) { }

  public async execute({ id, marca, placa, cor }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(id);

    if (!car) {
      throw new AppError('Car not registered');
    }

    const placaExists = await this.carsRepository.findByPlaca(placa);

    if (placaExists) {
      throw new AppError('There is a car registered with this placa');
    }

    car.marca = marca;
    car.placa = placa;
    car.cor = cor;

    await this.carsRepository.save(car);

    return car;
  }
}

export default UpdateCarService;
