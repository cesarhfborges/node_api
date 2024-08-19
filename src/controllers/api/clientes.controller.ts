import {Request, Response} from "express";
import {Cliente} from "../../entitys/cliente";
import {getRepository} from "typeorm";

class ClienteController {
  public async index(req: Request, res: Response): Promise<Response> {
    // const data = await Clientes.find({});
    return res.status(200).json({});
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const userRepo = getRepository(Cliente);

      // const data = await Clientes.create(req.body);
      return res.status(200).json({});
    } catch (error: any) {
      return res.status(406).send({
        message: error.message,
      });
    }
  }
}

export default new ClienteController();