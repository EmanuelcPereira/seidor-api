import { Router } from 'express';

import CarsController from '../controllers/CarController';

const carsRouter = Router();
const carsController = new CarsController();

carsRouter.post('/', carsController.create);
carsRouter.put('/:id', carsController.update);
carsRouter.delete('/:id', carsController.softDelete);
carsRouter.patch('/:id', carsController.softRestore);
carsRouter.get('/', carsController.listCars);

export default carsRouter;
