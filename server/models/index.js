const db = require('../dbConnection.js');

module.exports = {
  getReservationForOffering: offeringId => new Promise((resolve, reject) => {
    const queryString = 'SELECT * FROM reservations WHERE offerings_id=?';
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
