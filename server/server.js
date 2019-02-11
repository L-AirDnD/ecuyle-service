const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./router.js');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api/reservations', router);
app.use('/', express.static('../dist'));

const PORT = process.env.PORT || 3003;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on port ${PORT}`);
});
