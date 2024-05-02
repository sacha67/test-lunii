import express, {Application} from 'express';
import {router} from './routes/short-url.route';

const app: Application = express();

const port: number = 3000;
const apiDefaultPath: string = '/api';

app.use(express.json())
app.use(apiDefaultPath, router);

app.listen(port, () => {
    console.log(`App is listening on port ${port} !`);
});
