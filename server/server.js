const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const router = require('./router.js');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(compression());
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/api/reservations', router);
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on port ${PORT}`);
});
