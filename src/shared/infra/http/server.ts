import cors from 'cors';
import express from 'express';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import routes from '../routes';

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());

app.use(routes);

app.use()

app.listen(port, () => {
  console.log('******************************');
  console.log(`server running on port ${port}`);
  console.log('******************************');
});
