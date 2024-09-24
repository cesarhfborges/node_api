import {Router} from "express";
import AuthController from "../controllers/api/auth.controller";
import {jwtMiddleware} from "../middleware/jwt.middleware";

const router = Router();

router.post('/login', AuthController.login);
router.post('/cadastro', AuthController.register);
router.delete('/logout', jwtMiddleware, AuthController.logout);

export default router;