DROP TABLE IF EXISTS plants;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS status;
DROP TABLE IF EXISTS offers;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS watering_schedules;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    zipcode VARCHAR(10) NOT NULL
    );


CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    status TEXT NOT NULL
    );


CREATE TABLE watering_schedules (
    id SERIAL PRIMARY KEY,
    schedule TEXT NOT NULL UNIQUE
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


INSERT INTO users (name, email, username, password, zipcode) VALUES
('John Doe', 'johndoe@example.com', 'johndoe', 'pass123', '12345'),
('Jane Smith', 'janesmith@example.com', 'janesmith', 'pass456', '23456'),
('Alice Johnson', 'alicejohnson@example.com', 'alicejohnson', 'pass789', '34567');


INSERT INTO watering_schedules (schedule) VALUES
('2x per week'),
('1x per week'),
('every 2 weeks'),
('1x per month'),
('every 6 weeks');


INSERT INTO status (status) VALUES
('OK'),
('LISTED'),
('PENDING'),
('SOLD');


INSERT INTO plants
(name, source, common_name, type, cycle, watering, sunlight, indoor, care_level, maintenance, description, hardiness, original_url, dimensions, owner_id, status, watering_schedule) VALUES
('Fern', 'Nature Store', 'Fern', 'Type1', 'Annual', 'Regular', 'Partial Shade', TRUE, 'Easy', 'Low', 'A green fern', 'Hardy', 'https://images.squarespace-cdn.com/content/v1/5bbfbb9e523958e4f1427d15/1674643228569-9QKECGE7N2NDOSLP92HI/Evergreen+Fern+Frond', '10x10', 1, 1, 1),
('Cactus', 'Desert Flora', 'Cactus', 'Type2', 'Perennial', 'Sparse', 'Full Sun', FALSE, 'Medium', 'Medium', 'A spiky cactus', 'Very Hardy', 'https://cb2.scene7.com/is/image/CB2/FauxPottedCactus4p9inSHS23/$web_pdp_main_carousel_sm$/221216141021/faux-potted-cactus-plant-49.jpg', '5x5', 1, 1, 5),
('Rose', 'Garden Shop', 'Rose', 'Type1', 'Perennial', 'Regular', 'Full Sun', FALSE, 'Hard', 'High', 'A beautiful rose', 'Moderate', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQloKYYaKp56_kwfIXpLyZH_iPz_dJDKXQo25WUr4N6g&s', '12x12', 2, 1, 3),
('Tulip', 'Flower Store', 'Tulip', 'Type3', 'Annual', 'Regular', 'Full Sun', TRUE, 'Easy', 'Low', 'Colorful tulips', 'Hardy', 'https://www.birdsandblooms.com/wp-content/uploads/2022/10/Screen-Shot-2022-10-26-at-3.17.21-PM-700x701.png', '8x8', 2, 1, 2),
('Bonsai', 'Bonsai Tree Shop', 'Bonsai', 'Type4', 'Perennial', 'Regular', 'Partial Shade', TRUE, 'Hard', 'High', 'A miniature tree', 'Hardy', 'https://homegrown-garden.com/cdn/shop/articles/how_to_take_care_of_bonsai_trees_header_4_1280x.png?v=1610622891', '15x15', 3, 1, 2),
('Orchid', 'Orchid Gallery', 'Orchid', 'Type2', 'Perennial', 'Regular', 'Partial Shade', TRUE, 'Medium', 'Medium', 'An exotic orchid', 'Moderate', 'https://orchardlaneflowers.com/cdn/shop/products/IMG_0692_2000x.jpg?v=1679069425', '9x9', 3, 1, 1);
