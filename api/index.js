import express from 'express';
import routerApi from './routes/index.js';
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
} from './middlewares/error.handler.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port);

export default app;
