import express from "express";
import {jwtMiddleware} from "./middleware/jwt.middleware";
import ClientesRoutes from "./routes/clientes.routes";
import AuthRoutes from "./routes/auth.routes";
import NotificationsRoutes from "./routes/notifications.routes";

const router = express.Router();

router.use('/auth', AuthRoutes);
router.use('/clientes', jwtMiddleware, ClientesRoutes);
router.use('/notificacoes', jwtMiddleware, NotificationsRoutes);

export default router;