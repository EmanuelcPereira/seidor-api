import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Usage from '../infra/typeorm/entities/Usage';
import IUsageRepository from '../repositories/IUsageRepository';

interface IRequest {
  id: string;
}

@injectable()
class DevolutionUsageService {
  constructor(
    @inject('UsageRepository')
    private usageRepository: IUsageRepository,
  ) {}
  public async execute({ id }: IRequest): Promise<Usage> {
    const usage = await this.usageRepository.findById(id);
    if (!usage) {
      throw new AppError('Usage does not exists');
    }

    usage.end_date = new Date();
    await this.usageRepository.save(usage);

    return usage;
  }
}

export default DevolutionUsageService;
