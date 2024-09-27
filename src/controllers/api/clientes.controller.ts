import {Request, Response} from "express";
import {GrantedWith} from "../../permissions";
import {appDataSource} from "../../database/datasource";
import {Cliente} from "../../entities";

const repository = appDataSource.getRepository(Cliente);

// @GrantedWith('view')
class ClienteController {

  @GrantedWith('list')
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const data = await repository.find({
        order: {
          // nome: 'ASC',
          // sobrenome: 'ASC'
        }
      });
      return res.status(200).json(data);
    } catch (e: any) {
      return res.status(e.statusCode ?? 500).send(e);
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      // const data = await Clientes.create(req.body);
      return res.status(200).json({});
    } catch (error: any) {
      return res.status(406).send({
        message: error.message,
      });
    }
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    try {
      // const data = await repository.findOneBy({id: req.params.id});
      // if (!data) {
      //   return res.status(406).json({
      //     message: 'erro'
      //   });
      // }
      // await repository.delete({id: req.params.id});
      return res.status(200).json({
        message: 'Deletado com sucesso.'
      });
    } catch (error: any) {
      return res.status(406).send({
        message: error.message,
      });
    }
  }
}

export default new ClienteController();