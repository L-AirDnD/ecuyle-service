DROP DATABASE IF EXISTS lairdnd;
CREATE DATABASE lairdnd;

USE lairdnd;

/* -------------------------------------------------------*/
/*                      Create tables                     */
/* -------------------------------------------------------*/

CREATE TABLE photos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	offerings_id INT,
	url VARCHAR(255),
	caption VARCHAR(100),
	event_id INT
);

CREATE TABLE reviews (
	id INT AUTO_INCREMENT PRIMARY KEY,
	offering_id INT,
	rating JSON,
	comment VARCHAR(255),
	guest_id INT,
	event_id INT,
	owner_id INT
);

CREATE TABLE offerings (
	id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255),
	price_per_day INT,
	owner_id INT,
	max_guests INT,
	max_infants INT,
	weekly_view_count INT,
	type VARCHAR(255),
	overview TEXT,
	space TEXT,
	guest_access TEXT,
	guest_interaction TEXT,
	other_notes TEXT,
	city VARCHAR(255),
	country VARCHAR(255),
	latitude float,
	longitude float,
	address VARCHAR(255)
);

CREATE TABLE owners (
	id INT AUTO_INCREMENT PRIMARY KEY,
	full_name VARCHAR(255),
	city VARCHAR(255),
	country VARCHAR(255),
	join_date VARCHAR(255),
	verified boolean,
	superhost boolean,
	description TEXT,
	response_rate float,
	response_time INT,
	photo_url VARCHAR(255)
);

CREATE TABLE similar_listings (
	id INT AUTO_INCREMENT PRIMARY KEY,
	first_offering INT,
	second_offering INT
);

CREATE TABLE guests (
	id INT AUTO_INCREMENT PRIMARY KEY,
	full_name VARCHAR(255)
);

CREATE TABLE events (
	id INT AUTO_INCREMENT PRIMARY KEY,
	type VARCHAR(255),
	caption VARCHAR(255),
	price INT,
	city_id INT,
	country_id INT
);

CREATE TABLE amenities (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255),
	type VARCHAR(255)
);

CREATE TABLE nearby_events (
	id INT AUTO_INCREMENT PRIMARY KEY,
	offering_id INT,
	event_id INT
);

CREATE TABLE highlights (
	id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255),
	description VARCHAR(255),
	offerings_id INT
);

CREATE TABLE offerings_amenities (
	id INT AUTO_INCREMENT PRIMARY KEY,
	offerings_id INT,
	amenities_id INT
);

CREATE TABLE reservations (
	id INT AUTO_INCREMENT PRIMARY KEY,
	offerings_id INT,
	guest_id INT,
	start_date DATETIME,
	end_date DATETIME,
	num_adults INT,
	num_children INT,
	num_infants INT,
	total_price INT,
	created_at DATETIME,
	updated_at DATETIME
);

CREATE TABLE beds (
	id INT AUTO_INCREMENT PRIMARY KEY,
	type VARCHAR(255)
);

CREATE TABLE rooms (
	id INT AUTO_INCREMENT PRIMARY KEY,
	type VARCHAR(255),
	offerings_id INT
);

CREATE TABLE room_arragement (
	id INT AUTO_INCREMENT PRIMARY KEY,
	bed_id INT,
	room_id INT
);

CREATE TABLE countries (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255)
);

CREATE TABLE cities (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255)
);

/* -------------------------------------------------------*/
/*        Add foreign keys to appropriate tables          */
/* -------------------------------------------------------*/
ALTER TABLE photos ADD FOREIGN KEY (offerings_id) REFERENCES offerings (id);
ALTER TABLE reviews ADD FOREIGN KEY (owner_id) REFERENCES owners (id);
ALTER TABLE offerings ADD FOREIGN KEY (owner_id) REFERENCES owners (id);
ALTER TABLE similar_listings ADD FOREIGN KEY (first_offering) REFERENCES offerings (id);
ALTER TABLE similar_listings ADD FOREIGN KEY (second_offering) REFERENCES offerings (id);
ALTER TABLE reservations ADD FOREIGN KEY (offerings_id) REFERENCES offerings (id);
ALTER TABLE rooms ADD FOREIGN KEY (offerings_id) REFERENCES offerings (id);
ALTER TABLE offerings ADD FOREIGN KEY (id) REFERENCES highlights (offerings_id);
ALTER TABLE amenities ADD FOREIGN KEY (id) REFERENCES offerings_amenities (amenities_id);
ALTER TABLE offerings ADD FOREIGN KEY (id) REFERENCES offerings_amenities (offerings_id);
ALTER TABLE guests ADD FOREIGN KEY (id) REFERENCES reviews (guest_id);
ALTER TABLE guests ADD FOREIGN KEY (id) REFERENCES reservations (guest_id);
ALTER TABLE beds ADD FOREIGN KEY (id) REFERENCES room_arragement (bed_id);
ALTER TABLE rooms ADD FOREIGN KEY (id) REFERENCES room_arragement (room_id);
ALTER TABLE nearby_events ADD FOREIGN KEY (event_id) REFERENCES events (id);
ALTER TABLE nearby_events ADD FOREIGN KEY (offering_id) REFERENCES offerings (id);
ALTER TABLE events ADD FOREIGN KEY (id) REFERENCES reviews (event_id);
ALTER TABLE offerings ADD FOREIGN KEY (id) REFERENCES reviews (offering_id);
ALTER TABLE cities ADD FOREIGN KEY (id) REFERENCES offerings (country);
ALTER TABLE countries ADD FOREIGN KEY (id) REFERENCES offerings (city);
ALTER TABLE cities ADD FOREIGN KEY (id) REFERENCES owners (city);
ALTER TABLE countries ADD FOREIGN KEY (id) REFERENCES owners (country);
ALTER TABLE cities ADD FOREIGN KEY (id) REFERENCES events (city_id);
ALTER TABLE countries ADD FOREIGN KEY (id) REFERENCES events (country_id);

/* -------------------------------------------------------*/
/*                   Insert rows below                    */
/* -------------------------------------------------------*/
