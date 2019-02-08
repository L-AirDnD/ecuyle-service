const faker = require('faker');
const db = require('./dbConnection.js');

const MAX_RECORDS = 100;

/*---------------------------------------------------------*/
/*                    HELPER FUNCTIONS                     */
/*---------------------------------------------------------*/
const generateRandomNumber = (max) => {
  let randInt = 0;
  while (randInt < 1) {
    randInt = Math.floor(Math.random() * Math.floor(max));
  }
  return randInt;
};

const generatePerson = () => ([
  faker.name.findName(),
]);

const generateOffering = () => ([
  faker.fake('{{company.bsAdjective}} Home'),
  generateRandomNumber(500),
  generateRandomNumber(99),
  5,
  5,
  generateRandomNumber(1000),
]);

const generateReview = () => ([
  generateRandomNumber(99),
  generateRandomNumber(4),
  generateRandomNumber(4),
  generateRandomNumber(4),
  generateRandomNumber(4),
  generateRandomNumber(4),
  generateRandomNumber(4),
]);

const generateReservation = () => {
  const startDate = faker.date.between(new Date('February 14, 2019'), new Date('December 1, 2019'));
  const createdAt = faker.date.between(new Date('February 7, 2019'), startDate);
  return [
    generateRandomNumber(99),
    generateRandomNumber(99),
    startDate,
    faker.date.between(startDate, new Date('December 31, 2019')),
    generateRandomNumber(2),
    generateRandomNumber(3),
    generateRandomNumber(5),
    generateRandomNumber(10000),
    createdAt,
    createdAt,
  ];
};

const generateDataForEntity = (entity, fn, numRows) => {
  for (let i = 0; i < numRows; i += 1) {
    entity.push(fn());
  }
  return entity;
};

/*---------------------------------------------------------*/
/*                    DATA GENERATION                      */
/*---------------------------------------------------------*/
const owners = generateDataForEntity([], generatePerson, MAX_RECORDS);
const guests = generateDataForEntity([], generatePerson, MAX_RECORDS);
const offerings = generateDataForEntity([], generateOffering, MAX_RECORDS);
const reviews = generateDataForEntity([], generateReview, MAX_RECORDS);
const reservations = generateDataForEntity([], generateReservation, MAX_RECORDS);

/*---------------------------------------------------------*/
/*                     DATA INSERTION                      */
/*---------------------------------------------------------*/
const insertOwnersSql = 'INSERT INTO owners (name) VALUES (?)';
const insertGuestsSql = 'INSERT INTO guests (name) VALUES (?)';
const insertOfferingsSql = `
  INSERT INTO offerings (
    title, price_per_day, owner_id, max_guests, max_infants, weekly_view_count
  )
  VALUES (?, ?, ?, ?, ?, ?)`;
const insertReviewsSql = `
  INSERT INTO reviews (
    offerings_id, accuracy, communication, cleanliness, location, check_in, value
  )
  VALUES (?, ?, ?, ?, ?, ?, ?)`;
const insertReservationsSql = `
  INSERT INTO reservations (
    offerings_id, guest_id, start_date, end_date, num_adults, num_children, num_infants, total_price, created_at, updated_at
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

owners.forEach((owner) => {
  db.query(insertOwnersSql, owner, (err) => {
    if (err) throw err;
  });
});

guests.forEach((guest) => {
  db.query(insertGuestsSql, guest, (err) => {
    if (err) throw err;
  });
});

offerings.forEach((offering) => {
  db.query(insertOfferingsSql, offering, (err) => {
    if (err) throw err;
  });
});

reviews.forEach((review) => {
  db.query(insertReviewsSql, review, (err) => {
    if (err) throw err;
  });
});

reservations.forEach((reservation) => {
  db.query(insertReservationsSql, reservation, (err) => {
    if (err) throw err;
  });
});

db.end();
