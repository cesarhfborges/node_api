import {Request, Response} from "express";
import Joi from "joi";
import {IsNull, MoreThanOrEqual} from "typeorm";
import confirmationHash from "../../utils/confirmation-hash";
import BrevoMail from "../../notifications/brevo.mail";
import {appDataSource} from "../../database/datasource";
import {Usuario} from "../../entities";

const repository = appDataSource.getRepository(Usuario);

class ConfirmacaoConta {
  public async send(req: Request, res: Response): Promise<Response> {
    try {
      const schema = Joi.object({
        email: Joi
          .string()
          .email()
          .required(),
      });
      const validate = schema.validate(req.body);
      if (validate.error) {
        return res.status(403).json({
          error: validate.error.details,
        });
      }

      const usuario = await repository.findOne({
        where: {
          email: req.body.email,
          confirmado_em: IsNull()
        },
        relations: ['perfil'],
      });

      if (usuario === null) {
        return res.status(404).json({message: 'endereco de email não localizado ou ja confirmado.'});
      }

      const {validade, hash} = confirmationHash();

      usuario.codigo_confirmacao = hash;
      usuario.confirmacao_expiracao = validade;

      await repository.save(usuario);

      const client = new BrevoMail();
      await client.sendMail({
        mailData: {
          sender: {
            name: "Sistema",
            email: "cesar_silk321@hotmail.com"
          },
          subject: "Confirmação de conta",
          receivers: [
            {
              name: usuario.perfil.nome + (usuario.perfil.sobrenome.length > 0 ? ' ' + usuario.perfil.sobrenome : ''),
              email: usuario.email
            }
          ],
          params: {
            name: usuario.perfil.nome,
            URI: `http://localhost:3030/api/v1/auth/confirmar-conta/confirm?key${usuario.codigo_confirmacao}`,
          }
        },
      });
      return res.status(200).json({message: "Confirmação enviada com sucesso, verifique seu email."})
    } catch (e) {
      console.log(e);
      return res.status(500).json({message: 'error'})
    }
  }

  public async confirm(req: Request, res: Response): Promise<Response> {
    const schema = Joi.object({
      confirmation: Joi
        .string()
        .required(),
    });
    const validate = schema.validate(req.query);
    if (validate.error) {
      return res.status(403).json({
        error: validate.error.details,
      });
    }

    const usuario = await repository.findOne({
      where: {
        codigo_confirmacao: req.query['confirmation'] as string,
        confirmacao_expiracao: MoreThanOrEqual(new Date())
      }
    });

    if (usuario === null) {
      return res.status(404).json({message: 'endereco de email não localizado ou ja confirmado.'});
    }

    usuario.codigo_confirmacao = null;
    usuario.confirmacao_expiracao = null;
    usuario.confirmado_em = new Date();

    await repository.save(usuario);


    return res.status(200).json({message: 'Conta confirmada com sucesso.'})
  }
}

export default new ConfirmacaoConta();