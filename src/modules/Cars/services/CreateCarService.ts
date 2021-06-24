import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Car from '../infra/typeorm/entities/Car';
import ICarsRepository from '../repositories/ICarsRepository';

interface IRequest {
  marca: string;
  placa: string;
  cor: string;
}

@injectable()
class CreateCarService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) { }

  public async execute({ marca, placa, cor }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findByPlaca(placa);

    if (carExists) {
      throw new AppError('car already registered');
    }

    const car = this.carsRepository.create({
      marca,
      placa,
      cor,
    });

    return car;
  }
}

export default CreateCarService;
