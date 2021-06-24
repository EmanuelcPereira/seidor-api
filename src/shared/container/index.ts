import CarsRepository from '@modules/Cars/infra/typeorm/repositories/CarsRepository';
import ICarsRepository from '@modules/Cars/repositories/ICarsRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
