import {Router} from "express";
import NotificationsController from "../controllers/api/notifications.controller";
import {catchAsync} from "../utils/catch-async";

const router = Router();

router.get('/', catchAsync(NotificationsController.index));
router.post('/', catchAsync(NotificationsController.register));
router.post('/send', catchAsync(NotificationsController.send));
// router.post('/', ClientesController.create);
// router.delete('/:id', ClientesController.destroy);
// router.get('/:id', ClientesController.show);
// router.put('/:id', ClientesController.update);
// router.delete('/:id', ClientesController.delete);

export default router;