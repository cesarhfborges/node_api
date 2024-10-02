import "reflect-metadata";
import * as dotenv from 'dotenv';
import App from "./src/app";

console.log('GDFHKJSGDFKHJSDGKFJSDGHJFGHSJDKGFKHJSDGFKHJSDF')
console.log(process.env)

dotenv.config();

const server = new App();
