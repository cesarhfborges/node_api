import fs from "fs";
import path from "path";
import https from "https";
import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import morgan from "morgan";
import WebPush from 'web-push';
import {middlewares} from "./middleware";
import {appDataSource} from './database/datasource';
import logger from "node-color-log";
import router from "./router";
import {CONFIG} from "./config/config";

class App {

  private PORT: number = (process.env.PORT || 3000) as number;
  private PUSH_PUBLIC_KEY: string | null = process.env.PUSH_PUBLIC_KEY ?? null;
  private PUSH_PRIVATE_KEY: string | null = process.env.PUSH_PRIVATE_KEY ?? null;

  private readonly express: express.Application;
  private server: any;

  constructor(https: boolean = false) {
    this.express = express();
    this.database().then(r => {
      this.setup();
      this.controllers();
      this.middleware();
      if (https) {
        this.initHttps();
      } else {
        this.initHttp();
      }
    }).then(() => {
      // this.push_server();
    }).catch(e => {
      logger.error('error', e);
    });
  }

  async database(): Promise<void> {
    try {
      logger.warn(`Connecting to database`);
      await appDataSource.initialize();
      logger.success(`Database connected successfully!`);
    } catch (e) {
      logger.error('Database connection Error: ', e);
    }
  }

  private setup(): void {
    this.express.use(morgan('dev'));
    this.express.use(helmet());
    this.express.use(express.json());
    this.express.use(cors());
  }

  private controllers(): void {
    this.express.use('/api/v1', router);
  }

  private middleware(): void {
    this.express.use(middlewares.errorHandler);
    // this.express.use(middlewares.notFound);
  }

  private push_server(): void {
    if (this.PUSH_PUBLIC_KEY !== null && this.PUSH_PRIVATE_KEY !== null) {
      try {
        // const vapidKeys = WebPush.generateVAPIDKeys();
        WebPush.setVapidDetails(
          `https://localhost:3030`,
          this.PUSH_PUBLIC_KEY,
          this.PUSH_PRIVATE_KEY
        );
        logger.success(`Push server Private or Public key is not set.`);
      } catch (e) {
        console.error(e);
      }
    } else {
      logger.info(`Push server Private or Public key is not set.`);
    }
  }

  private initHttps(): void {
    const options = {
      key: fs.readFileSync(path.join(__dirname, "ssl/key.pem")),
      cert: fs.readFileSync(path.join(__dirname, "ssl/cert.pem")),
    };
    this.server = https.createServer(options, this.express);
    this.server.listen(this.PORT, () => {
      logger.success(`Server is running on https://localhost:${this.PORT}`);
      logger.success(`READY!`);
      if (CONFIG.app.dev) {
        logger.bold().color('white').bgColor('red').log(`APP RUNNING IN DEVELOPMENT MODE.`);
      }
    });
  }

  private initHttp(): void {
    this.express.listen(this.PORT, () => {
      logger.success(`Server is running on http://localhost:${this.PORT}`);
      logger.success(`READY!`);
      if (CONFIG.app.dev) {
        logger.bold().color('white').bgColor('red').log(`APP RUNNING IN DEVELOPMENT MODE.`);
      }
    });
  }
}

export default App;