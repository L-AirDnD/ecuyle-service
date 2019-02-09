const express = require('express');
const url = require('url');
const models = require('./models');

const router = express.Router();

router.get('/', (req, res) => {
  const queryParams = url.parse(req.url, true).query;
  if (Object.keys(queryParams).length > 1 || queryParams.offering === undefined) {
    res.statusCode = 400;
    res.send('Invalid parameter. This route currently only accepts an `offering` parameter');
  } else {
    const { offering } = queryParams;
    models.getReservationsForOffering(offering)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        res.statusCode = 400;
        res.send(err);
      });
  }
});

router.post('/', (req, res) => {
  const { body } = req;
  models.postReservation(body)
    .then((response) => {
      res.statusCode = 201;
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 400;
      res.send(err);
    });
});

module.exports = router;
