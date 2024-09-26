import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {Usuario} from '../entities';
import {CONFIG} from "../config/config";

class TokenHelper {

  encript(password: string): string {
    return bcrypt.hashSync(password, 8);
  };

  async comparePassword(password: string, usuario: Usuario | null): Promise<boolean> {
    if (usuario) {
      return await bcrypt.compare(password, usuario.senha);
    }
    return false;
  };

  createToken(usuario: Usuario) {
    const payload = {
      id: usuario.id,
      tipo: usuario.tipoPerfil,
      email: usuario.email,
    };
    return jwt.sign(payload, CONFIG.jwt.client_secret, {
      expiresIn: CONFIG.jwt.expires_in,
    });
  };
}

export default new TokenHelper();