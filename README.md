// SQL structure

CREATE TABLE users (
email VARCHAR(50) PRIMARY KEY,
name VARCHAR(50)
);

INSERT INTO users VALUES (
'wissembouazra@gmail.com',
'wissem'
);

CREATE TABLE reservations (
id SERIAL PRIMARY KEY,
userEmail VARCHAR(50) references users(email),
startTime TIMESTAMP,
endTime TIMESTAMP
);

INSERT INTO reservations (userEmail, startTime, endTime) VALUES (
'wissembouazra@gmail.com',
'2024-04-05 20:00:00',
'2024-04-05 21:00:00'
);
