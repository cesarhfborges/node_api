import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import morgan from "morgan";
import {middlewares} from "./middleware";
import Config from './database/config';
import logger from "node-color-log";
import router from "./router";

class App {

  private PORT: number = (process.env.PORT || 3000) as number;

  private express: express.Application;

  constructor() {
    this.express = express();
    this.database().then(r => {
      this.setup();
      this.controllers();
      this.middleware();
      this.init();
    }).catch(e => {
      logger.error('error', e);
    });
  }

  async database(): Promise<void> {
    logger.warn(`Connecting to database`);
    logger.success(`Database connected successfully!`);
  }

  private setup(): void {
    this.express.use(morgan('dev'));
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(express.json());
  }

  private controllers(): void {
    this.express.use('/api/v1', router);
  }

  private middleware(): void {
    this.express.use(middlewares.notFound);
    this.express.use(middlewares.errorHandler);
  }

  private init(): void {
    this.express.listen(this.PORT, () => {
      logger.success(`Server is running on http://localhost:${this.PORT}`);
      logger.success(`READY!`);
    });
  }
}

export default App;