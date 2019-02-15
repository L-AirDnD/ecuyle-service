import axios from 'axios';
import Reservation from '../components/Reservation';

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

  getReservationsByOfferingId: offeringId => (new Promise((resolve, reject) => {
    axios.get(`/api/reservations?offering=${offeringId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  })),

  postReservationByOfferingId: reservation => (new Promise((resolve, reject) => {
    axios.post('/api/reservations', reservation)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  })),
};

export default controller;
