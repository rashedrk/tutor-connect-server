import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to tutor connect!');
});

//app routes 
//router coming from routes/index.ts
app.use('/api/v1', router);


export default app;
