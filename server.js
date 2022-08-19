const express = require('express');
const connectBD = require('./db');

const authenticate = require('./middleware/authenticate');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (_req, res) => {
  res.json({
    message: 'I am home route',
  });
});

app.get('/api/v1/private', authenticate, async (req, res, next) => {
  const user = req.user;
  return res.status(200).json({ message: 'I am private route', user });
});

app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status ? err.status : 500;
  const message = err.message ? err.message : 'Server error occurred';
  res.status(status).json({ message });
});

connectBD('mongodb://localhost:27017/attendance_systems')
  .then(() => {
    console.log('Database connected');
    app.listen(4000, () => {
      console.log('I am listening on PORT 4000');
    });
  })
  .catch((e) => {
    console.log(e);
  });
