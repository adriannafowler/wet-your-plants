DROP TABLE IF EXISTS plants;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS status;
DROP TABLE IF EXISTS offers;


CREATE TABLE users (
    id SERIAL NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    zipcode VARCHAR(10) NOT NULL
    );


CREATE TABLE status ( 
    id SERIAL NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL
    );

    
CREATE TABLE plants (
    id SERIAL NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    source VARCHAR(100) NOT NULL,
    common_name VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    cycle  VARCHAR(50) NOT NULL,
    watering VARCHAR(50),
    sunlight VARCHAR(50),
    indoor BOOLEAN NOT NULL,
    care_level VARCHAR(50) NOT NULL,
    maintenance VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    hardiness VARCHAR(50) NOT NULL,
    original_url VARCHAR(50) NOT NULL,
    dimensions VARCHAR(50) NOT NULL,
    owner_id INTEGER NOT NULL REFERENCES users(id),
    status VARCHAR(50) NOT NULL REFERENCES  status(id)
    );

CREATE TABLE post (
    id SERIAL NOT NULL UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    plant_id INTEGER NOT NULL REFERENCES plants(id),
    owner_id INTEGER NOT NULL REFERENCES users(id),
    created_on DATETIME NOT NULL
)

CREATE TABLE offers (
    id SERIAL NOT NULL UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    buyer_id INTEGER NOT NULL REFERENCES users(id),
    plant_id INTEGER NOT NULL REFERENCES plants(id)
    );

