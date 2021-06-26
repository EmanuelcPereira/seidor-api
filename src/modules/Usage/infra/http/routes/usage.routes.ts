import { Router } from 'express';

import UsageController from '../controllers/UsageController';

const usageRouter = Router();
const usageController = new UsageController();

usageRouter.post('/', usageController.create);
usageRouter.put('/devolution/:id', usageController.devolve);
usageRouter.get('/', usageController.listAll);

export default usageRouter;
