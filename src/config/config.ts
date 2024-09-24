import * as dotenv from "dotenv";

dotenv.config();

const CONFIG = {
  app: {
    dev: process.env.DEVELOPMENT === 'true' ?? false,
    port: process.env.PORT ?? '3000'
  },
  jwt: {
    expires_in: parseInt(process.env.TOKEN_EXPIRES ?? '86400'),
    client_secret: process.env.CLIENT_SECRET ?? ''
  },
  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '3306'),
    database: process.env.DB_DATABASE ?? '',
    username: process.env.DB_USERNAME ?? '',
    password: process.env.DB_PASSWORD ?? '',
  }
}
export {CONFIG};