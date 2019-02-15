const db = require('../dbConnection.js');

module.exports = {
  getReservationsForOffering: offeringId => new Promise((resolve, reject) => {
    const queryString = 'SELECT * FROM reservations WHERE offerings_id=? ORDER BY start_date';
    const queryArgs = [offeringId];
    db.query(queryString, queryArgs, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  }),
  postReservation: reservation => new Promise((resolve, reject) => {
    const {
      offeringId,
      guestId,
      startDate,
      endDate,
      numAdults,
      numChilren,
      numInfants,
      totalPrice,
    } = reservation;

    // Note: dates formatted in UTC
    const createdAt = new Date().toJSON().slice(0, 19).replace('T', ' ');
    const lastUpdatedAt = new Date().toJSON().slice(0, 19).replace('T', ' ');
    const queryString = `
      INSERT INTO reservations (
        offerings_id,
        guest_id,
        start_date,
        end_date,
        num_adults,
        num_children,
        num_infants,
        total_price,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const queryArgs = [
      offeringId,
      guestId,
      startDate,
      endDate,
      numAdults,
      numChilren,
      numInfants,
      totalPrice,
      createdAt,
      lastUpdatedAt,
    ];

    db.query(queryString, queryArgs, (err, results) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(results);
        resolve(results);
      }
    });
  }),
  getOfferingDetails: offeringId => new Promise((resolve, reject) => {
    const queryString = 'SELECT * FROM OfferingSummary WHERE offeringId=?';
    const queryArgs = [offeringId];
    db.query(queryString, queryArgs, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  }),
};
