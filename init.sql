DROP TABLE IF EXISTS plants
DROP TABLE IF EXISTS users

CREATE TABLE plants (
    id INTEGER NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    source VARCHAR(100) NOT NULL,
    common_name VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    cycle  VARCHAR NOT NULL,
    watering VARCHAR,
    sunlight VARCHAR,
    indoor BOOLEAN NOT NULL,
    care_level VARCHAR NOT NULL,
    maintenance VARCHAR NOT NULL,
    description TEXT NOT NULL,
    hardiness VARCHAR NOT NULL,
    original_url VARCHAR NOT NULL,
    dimensions VARCHAR NOT NULL,
    );

CREATE TABLE users (
    id INTEGER NOT NULL UNIQUE,
    name INTEGER NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    zipcode INTEGER NOT NULL,
    );

