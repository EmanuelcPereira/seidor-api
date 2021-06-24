import CreateCarService from '@modules/Cars/services/CreateCarService';
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
}

export default CarsController;
