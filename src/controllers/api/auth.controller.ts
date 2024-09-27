import {Request, Response} from "express";
import {addSeconds, format} from "date-fns";
import {appDataSource} from "../../database/datasource";
import {Cliente, Perfil, Usuario} from "../../entities";
import TokenHelper from "../../helpers/token.helper";
import BrevoMail from "../../notifications/brevo.mail";
import Joi from "joi";
import {CONFIG} from "../../config/config";
import confirmationHash from "../../utils/confirmation-hash";

const usuariosRepository = appDataSource.getRepository(Usuario);
const clienteRepository = appDataSource.getRepository(Cliente);

class AuthController {
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const schema = Joi.object({
        email: Joi
          .string()
          .email()
          .required(),
        password: Joi
          .string()
          .alphanum()
          .min(3)
          .max(30)
          .required()
      });
      const validate = schema.validate(req.body);
      if (validate.error) {
        return res.status(403).json({
          error: validate.error.details,
        });
      }

      const {email, password} = req.body;

      const usuario = await usuariosRepository.findOne({
        where: {
          email: email,
          ativo: true
        },
        // relations: ['perfil'],
        select: [
          'id',
          'email',
          'senha',
          'ativo'
        ]
      });

      const passwordIsValid = await TokenHelper.comparePassword(password, usuario);

      if (!usuario || !passwordIsValid) {
        return res.status(401).json({message: 'Usuário e/ou senha inválidos.'});
      }

      if (!usuario.ativo) {
        return res.status(401).json({message: 'Usuário inativo.'});
      }

      const access_token = TokenHelper.createToken(usuario);
      const expiration_date = addSeconds(new Date(), CONFIG.jwt.expires_in);
      const expires_at = format(expiration_date, 'yyyy-MM-dd\'T\'HH:mm:ss');

      return res.status(200).send({
        access_token,
        token_type: 'Bearer',
        expires_at
      });
    } catch (e: any) {
      console.log(e)
      return res.status(500).json({
        error: e.message
      })
    }
  }

  public async register(req: Request, res: Response): Promise<Response> {
    try {
      const schema = Joi.object({
        nome: Joi.string().min(3).required(),
        sobrenome: Joi.string(),
        email: Joi
          .string()
          .email()
          .required(),
        password: Joi
          .string()
          .alphanum()
          .min(3)
          .max(30)
          .required()
      });
      const validate = schema.validate(req.body);
      if (validate.error) {
        return res.status(403).json({
          error: validate.error.details,
        });
      }

      const count = await usuariosRepository.countBy({
        email: req.body.email,
      });

      if (count > 0) {
        return res.status(422).json({message: 'E-Mail informado é inválido ou já se encontra cadastrado.'});
      }

      const p = new Cliente();
      p.nome = req.body.nome;
      p.sobrenome = req.body.sobrenome;
      const cliente = await clienteRepository.save(p);

      const {validade, hash} = confirmationHash();

      const usuario = new Usuario();
      usuario.perfil = cliente;
      usuario.email = req.body.email;
      usuario.senha = req.body.password;
      usuario.codigo_confirmacao = hash;
      usuario.confirmacao_expiracao = validade;
      await usuariosRepository.insert(usuario);


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
            URI: `http://localhost:8080/${usuario.codigo_confirmacao}`,
          }
        },
      });

      return res.status(200).json({
        message: 'Cadastro efetuado com sucesso.'
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({message: 'Não foi possível efetuar o cadastro.'});
    }
  }

  public async logout(req: Request, res: Response): Promise<Response> {
    // jwt.
    return res.status(200).json({
      message: 'Cadastro efetuado com sucesso.'
    });
  }

  private async sendConfirmation(name: string, email: string, key: string): Promise<void> {
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
              name: name,
              email: email
            }
          ],
          params: {
            name: name,
            URI: `http://localhost:8080/${key}`,
          }
        },
      });
      return Promise.resolve();
    } catch (e) {
      console.log(e);
      return Promise.resolve();
    }
  }
}

export default new AuthController();