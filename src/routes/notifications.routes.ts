import {Router} from "express";
import NotificationsController from "../controllers/api/notifications.controller";

const router = Router();

router.get('/', NotificationsController.index);
router.post('/', NotificationsController.register);
router.post('/send', NotificationsController.send);
// router.post('/', ClientesController.create);
// router.delete('/:id', ClientesController.destroy);
// router.get('/:id', ClientesController.show);
// router.put('/:id', ClientesController.update);
// router.delete('/:id', ClientesController.delete);

export default router;