import Car from '@modules/Cars/infra/typeorm/entities/Car';
import { inject, injectable } from 'tsyringe';

import ICarsRepository from '../repositories/ICarsRepository';

interface IRequest {
  marca?: string;
  cor?: string;
}

@injectable()
class ListCarService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) { }

  public async execute({ marca, cor }: IRequest): Promise<Car[]> {
    const car = await this.carsRepository.findRegistered(marca, cor);

    return car;
  }
}

export default ListCarService;
