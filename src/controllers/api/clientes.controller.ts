import {Request, Response} from "express";
import {appDataSource} from "../../database/datasource";
import {Cliente} from "../../entities";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";
import {GrantedTo} from "../../permissions";
import Joi from "joi";
import NotFound from "../../exceptions/not-found";

const repository = appDataSource.getRepository(Cliente);

class ClienteController {

  @GrantedTo('cliente:read')
  public async index(req: Request, res: Response): Promise<Response> {
    const options: FindManyOptions<Cliente> = {};
    if (!!req.query.order_by) {
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
      id: Joi.number().required(),
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
      const schema = Joi.object({
        nome: Joi.string().min(4).required(),
        sobrenome: Joi.string().min(4).optional(),
        cpf: Joi.string().min(11).required()
      });
      const validate = schema.validate(req.body, {abortEarly: false});
      if (validate.error) {
        return res.status(406).json({
          error: validate.error.details,
        });
      }
      const count = await repository.countBy({cpf: validate.value.cpf});
      if (count > 0) {
        return res.status(406).json({
          error: 'Cpf já existente',
        });
      }
      const data = await repository.save(req.body);
      return res.status(200).json({data});
    } catch (error: any) {
      console.log(error);
      return res.status(406).send({
        message: error.message,
      });
    }
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const schema = Joi.object({id: Joi.number().required()});
    const validate = schema.validate(req.params, {abortEarly: false});
    if (validate.error) {
      return res.status(403).json({
        error: validate.error.details,
      });
    }
    const data = await repository.findOneBy({id: validate.value.id});
    if (!data) {
      throw new NotFound(`Cliente id \{${validate.value.id}\} não encontrado.`);
    }
    await repository.delete({id: validate.value.id});
    return res.status(200).json({
      message: 'Deletado com sucesso.'
    });
  }
}

export default new ClienteController();