import express from 'express';
import routerApi from './routes/index.js';
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
} from './middlewares/error.handler.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000

app.use(express.json());

app.use(cors());

app.get('/chichui/api', (req, res) => {
  res.send('Hello my server in express');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port);

export default app
