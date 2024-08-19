import {Request, Response} from "express";
import Clientes from "../../models/clientes";

class ClienteController {
  public async index(req: Request, res: Response): Promise<Response> {
    const data = await Clientes.find({});
    return res.status(200).json(data);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = await Clientes.create(req.body);
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(406).send({
        message: error.message,
      });
    }
  }
}

export default new ClienteController();