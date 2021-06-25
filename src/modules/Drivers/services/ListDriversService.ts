import { inject, injectable } from 'tsyringe';

import Driver from '../infra/typeorm/entities/Driver';
import IDriversRepository from '../repositories/IDriversRepository';

interface IRequest {
  nome?: string;
}

@injectable()
class ListDriversService {
  constructor(
    @inject('DriversRepository')
    private driversRepository: IDriversRepository,
  ) { }

  public async execute({ nome }: IRequest): Promise<Driver[]> {
    const driver = await this.driversRepository.findRegistered(nome);

    return driver;
  }
}

export default ListDriversService;
