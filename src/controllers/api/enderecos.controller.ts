import {Endereco} from "../../entities";
import {appDataSource} from "../../database/datasource";
import {Request, Response} from "express";

const repository = appDataSource.getRepository(Endereco);

class EnderecosController {

  public async index(req: Request, res: Response): Promise<Response> {
    const {currentUser}: any = req;
    const data = await repository.find({
      where: {perfil: currentUser.id},
      // relations: ['perfil', 'perfil.endereco'],
      // select: {
      //   id: true,
      //   email: true,
      //   ativo: true,
      //   perfil: {
      //     nome: true,
      //     sobrenome: true
      //   },
      // },
      // relationLoadStrategy: 'query',
      // transaction: true,
    });
    return res.status(200).json(data);
  }
}

export default new EnderecosController();