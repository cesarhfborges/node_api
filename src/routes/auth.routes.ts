import {Router} from "express";
import {jwtMiddleware} from "../middleware/jwt.middleware";
import AuthController from "../controllers/api/auth.controller";
import PerfilController from "../controllers/api/perfil.controller";
import EnderecosController from "../controllers/api/enderecos.controller";

const router = Router();

router.post('/login', AuthController.login);
router.post('/cadastro', AuthController.register);
router.delete('/logout', jwtMiddleware, AuthController.logout);
router.get('/perfil', jwtMiddleware, PerfilController.index);
router.get('/perfil/enderecos', jwtMiddleware, EnderecosController.index);

router.get('/confirmar-conta/confirm/:key', PerfilController.confirm);
router.post('/confirmar-conta/send', PerfilController.send);

export default router;