import {Request, Response} from "express";
import {appDataSource} from "../../database/datasource";
import {Cliente} from "../../entities";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";
import {GrantedTo} from "../../permissions";
import Joi from "joi";
import NotFound from "../../exceptions/not-found";

const repository = appDataSource.getRepository(Cliente);

class ClienteController {

  @GrantedTo('funcionario')
  public async index(req: Request, res: Response): Promise<Response> {
    // try {
    const options: FindManyOptions<Cliente> = {};
    options.order
    if (req.query.order_by) {
      options.order = {
        nome: 'ASC'
      };
      if (!!req.query.order_direction) {
        options.order = {
          nome: req.query.order_direction === 'desc' ? 'DESC' : 'ASC',
        };
      }
    }
    const data = await repository.find(options);
    return res.status(data.length > 0 ? 200 : 204).json(data);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const schema = Joi.object({
      id: Joi
        .number()
        .required(),
    });
    const validate = schema.validate(req.params);
    if (validate.error) {
      return res.status(403).json({
        error: validate.error.details,
      });
    }

    const {id}: any = req.params;
    const data = await repository.findOneBy({id: id});

    if (!data) {
      throw new NotFound(`Cliente id \{${id}\} not found.`);
    }

    return res.status(200).json(data);
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