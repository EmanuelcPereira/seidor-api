import IUsageRepository from '@modules/Usage/repositories/IUsageRepository';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Usage from '../infra/typeorm/entities/Usage';

interface IRequest {
  driver_id: string;
  car_id: string;
  motivation: string;
}

@injectable()
class CreateUsageService {
  constructor(
    @inject('UsageRepository')
    private usageRepository: IUsageRepository,
  ) {}

  public async execute({
    driver_id,
    car_id,
    motivation,
  }: IRequest): Promise<Usage> {
    const carUnavailable = await this.usageRepository.findCarAvailability(
      car_id,
    );

    if (carUnavailable) {
      throw new AppError('Car unavailable');
    }

    const driverUnavailable = await this.usageRepository.findDriverAvailability(
      driver_id,
    );

    if (driverUnavailable) {
      throw new AppError('This driver already have a car in use');
    }

    if (motivation === ' ') {
      throw new AppError('It is necessary inform a motivation to use a car');
    }

    const usage = this.usageRepository.create({
      driver_id,
      car_id,
      start_date: new Date(),
      motivation,
    });

    return usage;
  }
}

export default CreateUsageService;
