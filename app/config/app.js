import 'babel-polyfill';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './../routes';

const app = express();
const router = express.Router();

app.use(cors());

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(router);

app.use('/v1', router);

router.route('/').get((req, res) => {
  res.status(200).send({ message: 'Welcome to Afiora Backend REST API' });
});

app.get('/v1/*', (req, res) => {
  res.status(200).send({ message: 'You seem lost, find your way back home' });
});

// eslint-disable-next-line
app.use((error, req, res, next) => {
  res.status(500).send(error);
});

export default app;
