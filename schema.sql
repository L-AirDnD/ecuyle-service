DROP DATABASE IF EXISTS lairdnd;
CREATE DATABASE lairdnd;

USE lairdnd;

/* -------------------------------------------------------*/
/*                      Create tables                     */
/* -------------------------------------------------------*/
CREATE TABLE owners (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL
);

CREATE TABLE guests (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL
);

CREATE TABLE offerings (
	id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	price_per_day INT NOT NULL,
	owner_id INT NOT NULL,
	max_guests INT NOT NULL,
	max_infants INT NOT NULL,
	weekly_view_count INT,
	FOREIGN KEY (owner_id) REFERENCES owners (id)
);

CREATE TABLE reviews (
	id INT AUTO_INCREMENT PRIMARY KEY,
	offerings_id INT NOT NULL,
	accuracy INT NOT NULL,
	communication INT NOT NULL,
	cleanliness INT NOT NULL,
	location INT NOT NULL,
	check_in INT NOT NULL,
	value INT NOT NULL,
	FOREIGN KEY (offerings_id) REFERENCES offerings (id)
);

CREATE TABLE reservations (
	id INT AUTO_INCREMENT PRIMARY KEY,
	offerings_id INT NOT NULL,
	guest_id INT NOT NULL,
	start_date DATETIME NOT NULL,
	end_date DATETIME NOT NULL,
	num_adults INT NOT NULL,
	num_children INT NOT NULL,
	num_infants INT NOT NULL,
	total_price INT NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME NOT NULL,
	FOREIGN KEY (offerings_id) REFERENCES offerings (id),
	FOREIGN KEY (guest_id) REFERENCES guests (id)
);

/* -------------------------------------------------------*/
/*                      Create views                      */
/* -------------------------------------------------------*/
CREATE VIEW AverageRatings AS
	SELECT r.offerings_id,
	       AVG(
					r.accuracy
				+ r.communication
				+ r.cleanliness
				+ r.location
				+ r.check_in
				+ r.value
					) AS average_rating
		FROM reviews r
	 GROUP BY r.offerings_id;

CREATE VIEW TotalReviews AS 
	SELECT r.offerings_id,
				 COUNT(r.id) AS total_review_count
		FROM reviews r
	 GROUP BY r.offerings_id;

CREATE VIEW OfferingSummary AS 
	SELECT o.id AS offeringId,
	       o.title AS title,
				 o.price_per_day AS pricePerDay,
				 o.owner_id AS ownerID,
				 o.max_guests AS maxGuests,
				 o.max_infants AS maxInfants,
				 o.weekly_view_count AS weeklyViewCount,
				 ar.average_rating AS averageRating,
				 tr.total_review_count AS totalReviewCount
	  FROM offerings o
	 INNER JOIN AverageRatings ar
	    ON (ar.offerings_id=o.id)
	 INNER JOIN TotalReviews tr
	    ON (tr.offerings_id=o.id);
