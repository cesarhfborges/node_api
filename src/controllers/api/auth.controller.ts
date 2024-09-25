import {Request, Response} from "express";
import {addSeconds, format} from "date-fns";
import Joi from "joi";
import {appDataSource} from "../../database/datasource";
import {Usuario} from "../../entities";
import TokenHelper from "../../helpers/token.helper";
import {CONFIG} from "../../config/config";

const usuariosRepository = appDataSource.getRepository(Usuario);

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
        where: {email},
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

      const access_token = TokenHelper.createToken(usuario);
      const expiration_date = addSeconds(new Date(), CONFIG.jwt.expires_in);
      const expires_at = format(expiration_date, 'yyyy-MM-dd\'T\'HH:mm:ss');

      return res.status(200).send({access_token, token_type: 'Bearer', expires_at});
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
        // nome: Joi.string().min(3).required(),
        // sobrenome: Joi.string(),
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

      const usuario = new Usuario();
      usuario.email = req.body.email;
      usuario.senha = req.body.password;

      await usuariosRepository.insert(usuario);
      const u = await usuariosRepository.findOne({where: {email: req.body.email}});

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
}

export default new AuthController();