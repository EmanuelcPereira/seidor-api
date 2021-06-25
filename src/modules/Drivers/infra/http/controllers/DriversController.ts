import CreateDriverService from '@modules/Drivers/services/CreateDriverService';
import SoftDeleteDriverService from '@modules/Drivers/services/SoftDeleteDriverService';
import SoftRestoreDriverService from '@modules/Drivers/services/SoftRestoreDriverService';
import UpdateDriverService from '@modules/Drivers/services/UpdateDriverService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDriversService from '../../../services/ListDriversService';

class DriversController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { nome } = request.body;

      const createDriverService = container.resolve(CreateDriverService);

      const driver = await createDriverService.execute({ nome });

      return response.status(201).json(driver);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { nome } = request.body;

      const updateDriverService = container.resolve(UpdateDriverService);

      const driver = await updateDriverService.execute({ id, nome });

      return response.json(driver);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async softDelete(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { id } = request.params;

      const softDeleteDriver = container.resolve(SoftDeleteDriverService);

      await softDeleteDriver.execute({ id });

      return response.json([]);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async softRestore(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { id } = request.params;

      const softRestoreDriver = container.resolve(SoftRestoreDriverService);

      await softRestoreDriver.execute({ id });

      return response.json([]);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async listDrivers(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { nome } = request.query;

      const listDriver = container.resolve(ListDriversService);

      const driver = await listDriver.execute({
        nome: nome as string,
      });

      return response.json(driver);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default DriversController;
