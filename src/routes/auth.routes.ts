import {Router} from "express";
import {jwtMiddleware} from "../middleware/jwt.middleware";
import AuthController from "../controllers/api/auth.controller";
import PerfilController from "../controllers/api/perfil.controller";
import EnderecosController from "../controllers/api/enderecos.controller";
import {catchAsync} from "../utils/catch-async";

const router = Router();

router.post('/login', catchAsync(AuthController.login));
router.post('/cadastro', catchAsync(AuthController.register));
router.delete('/logout', jwtMiddleware, catchAsync(AuthController.logout));
router.get('/perfil', jwtMiddleware, catchAsync(PerfilController.index));
router.get('/perfil/enderecos', jwtMiddleware, catchAsync(EnderecosController.index));

router.get('/confirmar-conta/confirm', catchAsync(PerfilController.confirm));
router.post('/confirmar-conta/send', catchAsync(PerfilController.send));

export default router;