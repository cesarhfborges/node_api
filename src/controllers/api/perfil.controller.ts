import {Request, Response} from "express";
import {appDataSource} from "../../database/datasource";
import {Usuario} from "../../entities";

const repository = appDataSource.getRepository(Usuario);

class PerfilController {
  public async index(req: Request, res: Response): Promise<Response> {
    const {currentUser}: any = req;
    const usuario = await repository.findOne({
      where: {id: currentUser.id},
      // relations: ['perfil'],
      // relationLoadStrategy: 'query',
      transaction: true,
    });
    console.log(usuario?.tipoPerfil);
    return res.status(200).json(usuario);
  }
}

export default new PerfilController();