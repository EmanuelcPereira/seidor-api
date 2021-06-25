import { Router } from 'express';

import DriversController from '../controllers/DriversController';

const driversRouter = Router();
const driversController = new DriversController();

driversRouter.post('/', driversController.create);
driversRouter.put('/:id', driversController.update);
driversRouter.delete('/:id', driversController.softDelete);
driversRouter.patch('/:id', driversController.softRestore);
driversRouter.get('/', driversController.listDrivers);

export default driversRouter;
