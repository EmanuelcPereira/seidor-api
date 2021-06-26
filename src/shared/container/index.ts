import CarsRepository from '@modules/Cars/infra/typeorm/repositories/CarsRepository';
import ICarsRepository from '@modules/Cars/repositories/ICarsRepository';
import DriversRepository from '@modules/Drivers/infra/typeorm/repositories/DriversRepository';
import IDriversRepository from '@modules/Drivers/repositories/IDriversRepository';
import UsageRepository from '@modules/Usage/infra/typeorm/repositories/usageRepository';
import IUsageRepository from '@modules/Usage/repositories/IUsageRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<IDriversRepository>(
  'DriversRepository',
  DriversRepository,
);

container.registerSingleton<IUsageRepository>(
  'UsageRepository',
  UsageRepository,
);
