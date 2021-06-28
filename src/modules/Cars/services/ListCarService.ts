import Car from '@modules/Cars/infra/typeorm/entities/Car';
import { inject, injectable } from 'tsyringe';

import ICarsRepository from '../repositories/ICarsRepository';

interface IRequest {
  brand?: string;
  color?: string;
}

@injectable()
class ListCarService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) { }

  public async execute({ brand, color }: IRequest): Promise<Car[]> {
    const car = await this.carsRepository.findRegistered(brand, color);

    return car;
  }
}

export default ListCarService;
