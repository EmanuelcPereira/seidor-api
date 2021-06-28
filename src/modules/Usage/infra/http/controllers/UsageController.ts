import CreateUsageService from '@modules/Usage/services/createUsageService';
import DevolutionUsageService from '@modules/Usage/services/DevolutionUsageService';
import ListUsageService from '@modules/Usage/services/ListUsageService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UsageController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { car_id, driver_id, motivation } = request.body;

      const createUsageService = container.resolve(CreateUsageService);

      const usage = await createUsageService.execute({
        car_id,
        driver_id,
        motivation,
      });

      return response.status(201).json(usage);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async devolve(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { id } = request.params;

      const devolutionUsage = container.resolve(DevolutionUsageService);

      const devolve = await devolutionUsage.execute({ id });

      return response.json(devolve);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const listUsage = container.resolve(ListUsageService);

      const usage = await listUsage.execute();

      return response.json(usage);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default UsageController;
