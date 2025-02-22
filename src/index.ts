import express from 'express';
import cors from 'cors';
import dbconnection from './db/dbconnect';
import testRouter from './routes/testRouter';
import userRouter from './routes/userRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
});

//using the routes
app.use('/api/test', testRouter);
app.use('/api/users', userRouter);

//creating the connection with db
dbconnection
  .query('SELECT 1')
  .then(() => {
    //listne to the server
    app.listen(3000, () => {
      console.log('server is running on port 3000');
    });
    //log the connection status
    console.log('db is connected');
  })
  .catch((err) => {
    console.log(err);
    return;
  });
