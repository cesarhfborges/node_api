import {Request, Response} from "express";
import {appDataSource} from "../../database/datasource";
import {Usuario} from "../../entities";

const repository = appDataSource.getRepository(Usuario);

class PerfilController {
  public async index(req: Request, res: Response): Promise<Response> {
    const {currentUser}: any = req;
    if (!currentUser) {
      return res.status(404).json({message: "not located"});
    }
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
      relationLoadStrategy: 'query',
      transaction: true,
    });
    return res.status(200).json(user)
  }
}

export default new PerfilController();