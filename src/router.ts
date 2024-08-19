import express from "express";
import ClientesRoutes from "./routes/clientes.routes";

const router = express.Router();

router.use('/clientes', ClientesRoutes);

export default router;