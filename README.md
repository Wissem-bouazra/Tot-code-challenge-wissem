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


//pagination
http://localhost:3000/reservations?offset=10

//create Reservation
http://localhost:3000/reservations/create
body:
{
    "name": "wissem",
    "email": "Wissem+6@gmail.com",
    "startTime": "2024-04-06 19:00:00"
}
http://localhost:3000/users?offset=10