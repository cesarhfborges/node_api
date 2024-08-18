import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import morgan from "morgan";
import controllers from "./controllers";
import {middlewares} from "./middleware";

const PORT: number = (process.env.PORT || 3000) as number;

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1', controllers);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;