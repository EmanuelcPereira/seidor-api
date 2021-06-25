import CarsRepository from '@modules/Cars/infra/typeorm/repositories/CarsRepository';
import ICarsRepository from '@modules/Cars/repositories/ICarsRepository';
import DriversRepository from '@modules/Drivers/infra/typeorm/repositories/DriversRepository';
import IDriversRepository from '@modules/Drivers/repositories/IDriversRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<IDriversRepository>(
  'DriversRepository',
  DriversRepository,
);
