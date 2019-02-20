const express = require('express');
const url = require('url');
const models = require('./models');

const router = express.Router();

router.get('/', (req, res) => {
  const { query } = url.parse(req.url, true);
  if (Object.keys(query).length > 1 || query.offering === undefined) {
    res.statusCode = 400;
    res.send('Invalid parameter. This route currently only accepts an `offering` parameter');
  } else {
    const { offering } = query;
    models.getReservationsForOffering(offering)
      .then((reservations) => {
        res.set('Access-Control-Allow-Origin', '*');
        res.send(reservations);
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
      res.set('Access-Control-Allow-Origin', '*');
      res.statusCode = 201;
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 400;
      res.send(err);
    });
});

router.get('/offerings/:offering', (req, res) => {
  const { offering } = req.params;
  models.getOfferingDetails(offering)
    .then((offeringDetails) => {
      res.set('Access-Control-Allow-Origin', '*');
      res.send(offeringDetails);
    })
    .catch((err) => {
      res.statusCode = 400;
      res.send(err);
    });
});

module.exports = router;
