DROP TABLE IF EXISTS plants;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS status;
DROP TABLE IF EXISTS offers;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS watering_schedules;


CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    zipcode VARCHAR(10) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL
    );


CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    status TEXT NOT NULL
    );


CREATE TABLE watering_schedules (
    id SERIAL PRIMARY KEY,
    schedule TEXT NOT NULL
);


CREATE TABLE plants (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    source TEXT NOT NULL,
    common_name TEXT ,
    type TEXT ,
    cycle  TEXT ,
    watering TEXT,
    sunlight TEXT,
    indoor BOOLEAN ,
    care_level TEXT ,
    maintenance TEXT,
    description TEXT,
    hardiness TEXT,
    original_url TEXT,
    dimensions TEXT,
    owner_id INTEGER NOT NULL REFERENCES users(id),
    status INTEGER REFERENCES  status(id),
    watering_schedule INTEGER REFERENCES watering_schedules(id)
    );


CREATE TABLE offers (
    id SERIAL PRIMARY KEY,
    price DECIMAL(10, 2) NOT NULL,
    buyer_id INTEGER NOT NULL REFERENCES users(id),
    plant_id INTEGER NOT NULL REFERENCES plants(id)
    );


CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    price DECIMAL(10, 2) NOT NULL,
    plant_id INTEGER NOT NULL REFERENCES plants(id),
    owner_id INTEGER NOT NULL REFERENCES users(id),
    created_on DATE NOT NULL
);


-- INSERT INTO users (name, email, username, password, zipcode) VALUES
-- ('John Doe', 'johndoe@example.com', 'johndoe', 'pass123', '12345'),
-- ('Jane Smith', 'janesmith@example.com', 'janesmith', 'pass456', '23456'),
-- ('Alice Johnson', 'alicejohnson@example.com', 'alicejohnson', 'pass789', '34567');


-- INSERT INTO watering_schedules (schedule) VALUES
-- ('2x per week'),
-- ('1x per week'),
-- ('every 2 weeks'),
-- ('1x per month'),
-- ('every 6 weeks');


-- INSERT INTO watering_schedules (schedule) VALUES
-- ('2x per week'),
-- ('1x per week'),
-- ('every 2 weeks'),
-- ('1x per month'),
-- ('every 6 weeks');


-- INSERT INTO status (status) VALUES
-- ('OK'),
-- ('LISTED'),
-- ('PENDING'),
-- ('SOLD');


-- INSERT INTO plants
-- (name, source, common_name, type, cycle, watering, sunlight, indoor, care_level, maintenance, description, hardiness, original_url, dimensions, owner_id, status, watering_schedule) VALUES
-- ('Fern', 'Nature Store', 'Fern', 'Type1', 'Annual', 'Regular', 'Partial Shade', TRUE, 'Easy', 'Low', 'A green fern', 'Hardy', 'http://example.com/fern', '10x10', 1, 1, 1),
-- ('Cactus', 'Desert Flora', 'Cactus', 'Type2', 'Perennial', 'Sparse', 'Full Sun', FALSE, 'Medium', 'Medium', 'A spiky cactus', 'Very Hardy', 'http://example.com/cactus', '5x5', 1, 1, 5),
-- ('Rose', 'Garden Shop', 'Rose', 'Type1', 'Perennial', 'Regular', 'Full Sun', FALSE, 'Hard', 'High', 'A beautiful rose', 'Moderate', 'http://example.com/rose', '12x12', 2, 1, 3),
-- ('Tulip', 'Flower Store', 'Tulip', 'Type3', 'Annual', 'Regular', 'Full Sun', TRUE, 'Easy', 'Low', 'Colorful tulips', 'Hardy', 'http://example.com/tulip', '8x8', 2, 1, 2),
-- ('Bonsai', 'Bonsai Tree Shop', 'Bonsai', 'Type4', 'Perennial', 'Regular', 'Partial Shade', TRUE, 'Hard', 'High', 'A miniature tree', 'Hardy', 'http://example.com/bonsai', '15x15', 3, 1, 2),
-- ('Orchid', 'Orchid Gallery', 'Orchid', 'Type2', 'Perennial', 'Regular', 'Partial Shade', TRUE, 'Medium', 'Medium', 'An exotic orchid', 'Moderate', 'http://example.com/orchid', '9x9', 3, 1, 1);
