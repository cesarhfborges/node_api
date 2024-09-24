import {Router} from "express";
import AuthController from "../controllers/api/auth.controller";
import {jwtMiddleware} from "../middleware/jwt.middleware";
import PerfilController from "../controllers/api/perfil.controller";

const router = Router();

router.post('/login', AuthController.login);
router.post('/cadastro', AuthController.register);
router.delete('/logout', jwtMiddleware, AuthController.logout);
router.get('/perfil', jwtMiddleware, PerfilController.index);

export default router;