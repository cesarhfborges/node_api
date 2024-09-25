import {Request, Response} from "express";
import {appDataSource} from "../../database/datasource";
import {Usuario} from "../../entities";

const repository = appDataSource.getRepository(Usuario);

class PerfilController {
  public async index(req: Request, res: Response): Promise<Response> {
    const {currentUser}: any = req;
    const user = await repository.findOne({
      where: {id: currentUser.id},
      relations: ['perfil'],
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
      transaction: true,
    });
    return res.status(200).json(user)
  }

  public async confirmAccount(req: Request, res: Response): Promise<Response> {

  }
}

export default new PerfilController();