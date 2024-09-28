import {Router} from "express";
import ClientesController from "../controllers/api/clientes.controller";
import {catchAsync} from "../utils/catch-async";

const router = Router();

router.get('/', catchAsync(ClientesController.index));
router.post('/', catchAsync(ClientesController.create));
router.get('/:id', catchAsync(ClientesController.show));
router.delete('/:id', catchAsync(ClientesController.destroy));
// router.get('/:id', ClientesController.show);
// router.put('/:id', ClientesController.update);
// router.delete('/:id', ClientesController.delete);

export default router;