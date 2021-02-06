--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE hts;

CREATE TABLE IF NOT EXISTS company (
   	comp_id INT GENERATED ALWAYS AS IDENTITY (START WITH 1001) PRIMARY KEY,
	comp_name VARCHAR ( 100 ) NOT NULL,
	total_users INT
);

CREATE TABLE IF NOT EXISTS users (
   	user_id INT GENERATED ALWAYS AS IDENTITY (START WITH 100001) PRIMARY KEY,
	first_name VARCHAR ( 50 ) NOT NULL,
	last_name VARCHAR ( 50 ) NOT NULL,
	company_id INT NOT NULL,
	email VARCHAR ( 100 ) UNIQUE NOT NULL,
	password VARCHAR ( 150 ) NOT NULL,
	created_on TIMESTAMP NOT NULL,
	last_login TIMESTAMP,
	CONSTRAINT fk_users_company FOREIGN KEY(company_id) REFERENCES company(comp_id)
);


CREATE TABLE IF NOT EXISTS ticket_type (
   	id INT GENERATED ALWAYS AS IDENTITY (START WITH 101) PRIMARY KEY,
	name VARCHAR ( 50 ) NOT NULL
)

CREATE TABLE IF NOT EXISTS ticket_status (
   	id INT GENERATED ALWAYS AS IDENTITY (START WITH 101) PRIMARY KEY,
	name VARCHAR ( 50 ) NOT NULL
)

CREATE TABLE IF NOT EXISTS ticket_priority (
   	id INT GENERATED ALWAYS AS IDENTITY (START WITH 101) PRIMARY KEY,
	name VARCHAR ( 50 ) NOT NULL
)


CREATE TABLE IF NOT EXISTS tickets (
   	tid INT GENERATED ALWAYS AS IDENTITY (START WITH 100001) PRIMARY KEY,
	ticket_title VARCHAR ( 50 ) NOT NULL,
	ticket_desc VARCHAR ( 300 ) NOT NULL,
	type_id INT NOT NULL,
	status_id INT NOT NULL,
	priority_id INT NOT NULL,
	created_by INT NOT NULL,
	assigned_to INT NOT NULL,
	tags VARCHAR ( 100 ) NOT NULL,
	created_on TIMESTAMP NOT NULL,
	CONSTRAINT fk_tickets_ticket_type FOREIGN KEY(type_id) REFERENCES ticket_type(id),
	CONSTRAINT fk_tickets_ticket_status FOREIGN KEY(status_id) REFERENCES ticket_status(id),
	CONSTRAINT fk_tickets_ticket_priority FOREIGN KEY(priority_id) REFERENCES ticket_priority(id),
	CONSTRAINT fk_tickets_users_created_by FOREIGN KEY(created_by) REFERENCES users(user_id),
	CONSTRAINT fk_tickets_users_assigned_to FOREIGN KEY(assigned_to) REFERENCES users(user_id)
)