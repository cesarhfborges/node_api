import {Request, Response} from "express";
import WebPush from "web-push";
import {ISubscription} from "../../helpers/subscription.interface";

class NotificationsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const PUSH_PUBLIC_KEY: string | null = process.env.PUSH_PUBLIC_KEY ?? null;
    return res.json({PUSH_PUBLIC_KEY});
  }

  public async register(req: Request, res: Response): Promise<Response> {
    console.log(req.body);
    return res.sendStatus(201);
  }

  public async send(req: Request, res: Response): Promise<Response> {
    try {
      const {subscription} = req.body as ISubscription;
      const a = await WebPush.sendNotification(
        subscription,
        JSON.stringify({
          icon: 'your-icon-link.png',
          title: 'Your title',
          body: 'Content of your message',
          imageUrl: 'your-image-link.png'
        }),
      );
      console.log(a);
      return res.sendStatus(201);
    } catch (e) {
      console.log(JSON.stringify(e));
      return res.status(406).json(e);
    }
  }
}

export default new NotificationsController();