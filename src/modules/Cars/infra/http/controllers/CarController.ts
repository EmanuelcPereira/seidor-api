import CreateCarService from '@modules/Cars/services/CreateCarService';
import ListCarService from '@modules/Cars/services/ListCarService';
import SoftDeleteCarService from '@modules/Cars/services/SoftDeleteCarService';
import SoftRestoreCarService from '@modules/Cars/services/SoftRestoreCarService';
import UpdateCarService from '@modules/Cars/services/UpdateCarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CarsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { marca, placa, cor } = request.body;

      const createCar = container.resolve(CreateCarService);
      const car = await createCar.execute({
        marca,
        placa,
        cor,
      });

      return response.status(201).json(car);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { marca, placa, cor } = request.body;

      const updateCarService = container.resolve(UpdateCarService);

      const car = updateCarService.execute({
        id,
        marca,
        placa,
        cor,
      });

      return response.json(car);
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

      const softDeleteCarService = container.resolve(SoftDeleteCarService);

      await softDeleteCarService.execute({ id });

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

      const softRestoreCarService = container.resolve(SoftRestoreCarService);

      await softRestoreCarService.execute({ id });

      return response.json([]);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async findRegistered(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { marca, cor } = request.query;

      const listCarService = container.resolve(ListCarService);

      const cars = await listCarService.execute({
        marca: marca as string,
        cor: cor as string,
      });

      return response.json(cars);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default CarsController;
