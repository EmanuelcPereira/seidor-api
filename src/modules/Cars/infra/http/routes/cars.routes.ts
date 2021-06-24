import { Router } from 'express';

import CarsController from '../controllers/CarController';

const carsRouter = Router();
const carsController = new CarsController();

carsRouter.post('/', carsController.create);

export default carsRouter;
