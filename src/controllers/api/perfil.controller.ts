import {Request, Response} from "express";
import {appDataSource} from "../../database/datasource";
import {Usuario} from "../../entities";
import BrevoMail from "../../notifications/brevo.mail";

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
    try {
      const client = new BrevoMail();
      await client.sendMail({
        mailData: {
          sender: {
            name: "Cesar",
            email: "cesar_silk321@hotmail.com"
          },
          subject: "Confirmação de conta",
          receivers: [
            {
              name: "Cesar",
              email: "cesarhfborges@gmail.com"
            }
          ],
          params: {
            name: 'Cesar Borges',
            URI: 'http://localhost:8080/',
          }
        },
      })
      return res.status(200).json({message: "success"})
    } catch (e) {
      console.log(e);
      return res.status(500).json({message: 'error'})
    }
  }
}

export default new PerfilController();