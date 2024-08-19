import "reflect-metadata";
import * as dotenv from 'dotenv';
import App from "./src/app";

dotenv.config();

const server = new App();