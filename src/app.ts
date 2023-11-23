import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/users/user.route';
const app: Application = express();

//middleware
app.use(express.json());
app.use(cors());
//application routes
app.use('/', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('user data and order management server');
});

export default app;
