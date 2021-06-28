import { inject, injectable } from 'tsyringe';

import Driver from '../infra/typeorm/entities/Driver';
import IDriversRepository from '../repositories/IDriversRepository';

interface IRequest {
  name?: string;
}

@injectable()
class ListDriversService {
  constructor(
    @inject('DriversRepository')
    private driversRepository: IDriversRepository,
  ) { }

  public async execute({ name }: IRequest): Promise<Driver[]> {
    const driver = await this.driversRepository.findRegistered(name);

    return driver;
  }
}

export default ListDriversService;
