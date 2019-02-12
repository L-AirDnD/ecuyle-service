import axios from 'axios';

const controller = {
  getOfferingDetailsById: offeringId => (new Promise((resolve, reject) => {
    axios.get(`/api/reservations/offerings/${offeringId}`)
      .then((response) => {
        resolve(response.data[0]);
      })
      .catch((err) => {
        reject(err);
      });
  })),
};

export default controller;
