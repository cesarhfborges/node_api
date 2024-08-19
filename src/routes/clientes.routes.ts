import {Router} from "express";
import ClientesController from "../controllers/api/clientes.controller";

const router = Router();

router.get('/', ClientesController.index);
router.post('/', ClientesController.create);
// router.get('/:id', ClientesController.show);
// router.put('/:id', ClientesController.update);
// router.delete('/:id', ClientesController.delete);

export default router;