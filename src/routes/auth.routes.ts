import {Router} from "express";
import {jwtMiddleware} from "../middleware/jwt.middleware";
import {catchAsync} from "../utils/catch-async";
import AuthController from "../controllers/api/auth.controller";
import PerfilController from "../controllers/api/perfil.controller";
import EnderecosController from "../controllers/api/enderecos.controller";
import ConfirmacaoConta from "../controllers/api/confirmacao-conta";

const router = Router();

router.post('/login', catchAsync(AuthController.login));
router.post('/cadastro', catchAsync(AuthController.register));
router.delete('/logout', jwtMiddleware, catchAsync(AuthController.logout));
router.get('/perfil', jwtMiddleware, catchAsync(PerfilController.index));
router.get('/perfil/enderecos', jwtMiddleware, catchAsync(EnderecosController.index));

router.get('/confirmar-conta/confirm', catchAsync(ConfirmacaoConta.confirm));
router.post('/confirmar-conta/send', catchAsync(ConfirmacaoConta.send));

export default router;