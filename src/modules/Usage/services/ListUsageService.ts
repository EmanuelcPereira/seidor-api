import IUsageRepository from '@modules/Usage/repositories/IUsageRepository';
import { inject, injectable } from 'tsyringe';

import Usage from '../infra/typeorm/entities/Usage';

@injectable()
class ListUsageService {
  constructor(
    @inject('UsageRepository')
    private usageRepository: IUsageRepository,
  ) {}

  public async execute(): Promise<Usage[]> {
    const usage = await this.usageRepository.findAll();

    return usage;
  }
}

export default ListUsageService;
