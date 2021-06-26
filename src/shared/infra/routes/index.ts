import carsRouter from '@modules/Cars/infra/http/routes/cars.routes';
import driversRouter from '@modules/Drivers/infra/http/routes/drivers.routes';
import usageRouter from '@modules/Usage/infra/http/routes/usage.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/cars', carsRouter);
routes.use('/drivers', driversRouter);
routes.use('/usage', usageRouter);

export default routes;
