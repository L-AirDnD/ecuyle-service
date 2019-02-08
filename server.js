const express = require('express');
const router = require('./router.js');

const app = express();
app.use('/api/reservations', router);
app.use('/', express.static('dist'));

const PORT = process.env.PORT || 3003;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on port ${PORT}`);
});
