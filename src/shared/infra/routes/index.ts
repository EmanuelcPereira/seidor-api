import carsRouter from '@modules/Cars/infra/http/routes/cars.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/cars', carsRouter);

export default routes;
