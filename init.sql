CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    zipcode VARCHAR(10) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL
    );


CREATE TABLE IF NOT EXISTS status (
    id SERIAL PRIMARY KEY,
    status TEXT NOT NULL UNIQUE
    );


CREATE TABLE IF NOT EXISTS watering_schedules (
    id SERIAL PRIMARY KEY,
    schedule TEXT NOT NULL UNIQUE
);


CREATE TABLE IF NOT EXISTS plants (
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
    watering_schedule INTEGER REFERENCES watering_schedules(id)
    );


CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    todo TEXT NOT NULL,
    due_date DATE NOT NULL,
    time_completed TIMESTAMP DEFAULT NULL,
    complete BOOL DEFAULT false,
    status TEXT REFERENCES status(status),
    plant_id INTEGER NOT NULL REFERENCES plants(id),
    owner_id INTEGER NOT NULL REFERENCES users(id)
);

CREATE OR REPLACE FUNCTION update_time_completed()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.complete = true THEN
        NEW.time_completed = CURRENT_TIMESTAMP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_time_completed
BEFORE UPDATE ON todos
FOR EACH ROW
EXECUTE FUNCTION update_time_completed();


-- -- USERS SEED DATA
-- INSERT INTO users (name, email, password, zipcode, hashed_password)
-- SELECT 'John Doe', 'johndoe@example.com', 'pass123', '12345', 'hash'
-- WHERE NOT EXISTS (
--     SELECT 1 FROM users WHERE email = 'johndoe@example.com'
-- );

-- INSERT INTO users (name, email, password, zipcode, hashed_password)
-- SELECT 'Jane Smith', 'janesmith@example.com', 'pass456', '23456', 'hash'
-- WHERE NOT EXISTS (
--     SELECT 1 FROM users WHERE email = 'janesmith@example.com'
-- );

-- INSERT INTO users (name, email, password, zipcode, hashed_password)
-- SELECT 'Alice Johnson', 'alicejohnson@example.com', 'pass789', '34567', 'hash'
-- WHERE NOT EXISTS (
--     SELECT 1 FROM users WHERE email = 'alicejohnson@example.com'
-- );


-- -- WATERING SCHEDULES SEED DATA
-- INSERT INTO watering_schedules (schedule)
-- SELECT '2x per week'
-- WHERE NOT EXISTS (
--     SELECT 1 FROM watering_schedules WHERE schedule = '2x per week'
-- );

-- INSERT INTO watering_schedules (schedule)
-- SELECT '1x per week'
-- WHERE NOT EXISTS (
--     SELECT 1 FROM watering_schedules WHERE schedule = '1x per week'
-- );

-- INSERT INTO watering_schedules (schedule)
-- SELECT 'every 2 weeks'
-- WHERE NOT EXISTS (
--     SELECT 1 FROM watering_schedules WHERE schedule = 'every 2 weeks'
-- );

-- INSERT INTO watering_schedules (schedule)
-- SELECT 'every 4 weeks'
-- WHERE NOT EXISTS (
--     SELECT 1 FROM watering_schedules WHERE schedule = 'every 4 weeks'
-- );

-- INSERT INTO watering_schedules (schedule)
-- SELECT 'every 6 weeks'
-- WHERE NOT EXISTS (
--     SELECT 1 FROM watering_schedules WHERE schedule = 'every 6 weeks'
-- );


-- -- STATUS SEED DATA
-- INSERT INTO status (status)
-- SELECT 'upcoming'
-- WHERE NOT EXISTS (
--     SELECT 1 FROM status WHERE status = 'upcoming'
-- );

-- INSERT INTO status (status)
-- SELECT 'overdue'
-- WHERE NOT EXISTS (
--     SELECT 1 FROM status WHERE status = 'overdue'
-- );

-- INSERT INTO status (status)
-- SELECT 'due today'
-- WHERE NOT EXISTS (
--     SELECT 1 FROM status WHERE status = 'due today'
-- );


-- --PLANTS SEED DATA
-- INSERT INTO plants (name, source, common_name, type, cycle, watering, sunlight, indoor, care_level, maintenance, description, hardiness, original_url, dimensions, owner_id, watering_schedule)
-- SELECT 'Fern', 'Nature Store', 'Fern', 'Type1', 'Annual', 'Regular', 'Partial Shade', TRUE, 'Easy', 'Low', 'A green fern', 'Hardy', 'http://example.com/fern', '10x10', 1, 1
-- WHERE NOT EXISTS (
--     SELECT 1 FROM plants WHERE name = 'Fern' AND source = 'Nature Store'
-- );

-- INSERT INTO plants (name, source, common_name, type, cycle, watering, sunlight, indoor, care_level, maintenance, description, hardiness, original_url, dimensions, owner_id, watering_schedule)
-- SELECT 'Cactus', 'Desert Flora', 'Cactus', 'Type2', 'Perennial', 'Sparse', 'Full Sun', FALSE, 'Medium', 'Medium', 'A spiky cactus', 'Very Hardy', 'http://example.com/cactus', '5x5', 1, 5
-- WHERE NOT EXISTS (
--     SELECT 1 FROM plants WHERE name = 'Cactus' AND source = 'Desert Flora'
-- );

-- INSERT INTO plants (name, source, common_name, type, cycle, watering, sunlight, indoor, care_level, maintenance, description, hardiness, original_url, dimensions, owner_id, watering_schedule)
-- SELECT 'Rose', 'Garden Shop', 'Rose', 'Type1', 'Perennial', 'Regular', 'Full Sun', FALSE, 'Hard', 'High', 'A beautiful rose', 'Moderate', 'http://example.com/rose', '12x12', 2, 3
-- WHERE NOT EXISTS (
--     SELECT 1 FROM plants WHERE name = 'Rose' AND source = 'Garden Shop'
-- );

-- INSERT INTO plants (name, source, common_name, type, cycle, watering, sunlight, indoor, care_level, maintenance, description, hardiness, original_url, dimensions, owner_id, watering_schedule)
-- SELECT 'Tulip', 'Flower Store', 'Tulip', 'Type3', 'Annual', 'Regular', 'Full Sun', TRUE, 'Easy', 'Low', 'Colorful tulips', 'Hardy', 'http://example.com/tulip', '8x8', 2, 2
-- WHERE NOT EXISTS (
--     SELECT 1 FROM plants WHERE name = 'Tulip' AND source = 'Flower Store'
-- );

-- INSERT INTO plants (name, source, common_name, type, cycle, watering, sunlight, indoor, care_level, maintenance, description, hardiness, original_url, dimensions, owner_id, watering_schedule)
-- SELECT 'Bonsai', 'Bonsai Tree Shop', 'Bonsai', 'Type4', 'Perennial', 'Regular', 'Partial Shade', TRUE, 'Hard', 'High', 'A miniature tree', 'Hardy', 'http://example.com/bonsai', '15x15', 3, 2
-- WHERE NOT EXISTS (
--     SELECT 1 FROM plants WHERE name = 'Bonsai' AND source = 'Bonsai Tree Shop'
-- );

INSERT INTO plants (name, source, common_name, type, cycle, watering, sunlight, indoor, care_level, maintenance, description, hardiness, original_url, dimensions, owner_id, watering_schedule)
SELECT 'Orchid', 'Orchid Gallery', 'Orchid', 'Type2', 'Perennial', 'Regular', 'Partial Shade', TRUE, 'Medium', 'Medium', 'An exotic orchid', 'Moderate', 'http://example.com/orchid', '9x9', 3, 1
WHERE NOT EXISTS (
    SELECT 1 FROM plants WHERE name = 'Orchid' AND source = 'Orchid Gallery'
);


-- TODOS SEED DATA
INSERT INTO todos (todo, due_date, time_completed, complete, status, plant_id, owner_id)
SELECT 'water plant', '2023-12-12', null, false, 'upcoming', 1, 1
WHERE NOT EXISTS (
    SELECT 1 FROM todos WHERE todo = 'water plant' AND owner_id = 1
);

INSERT INTO todos (todo, due_date, time_completed, complete, status, plant_id, owner_id)
SELECT 'fertilize and water plant', '2023-12-12', null, false, 'upcoming', 2, 1
WHERE NOT EXISTS (
    SELECT 1 FROM todos WHERE todo = 'fertilize and water plant' AND owner_id = 1
);

INSERT INTO todos (todo, due_date, time_completed, complete, status, plant_id, owner_id)
SELECT 'water plant', '2023-12-12', null, false, 'upcoming', 3, 2
WHERE NOT EXISTS (
    SELECT 1 FROM todos WHERE todo = 'water plant' AND owner_id = 2 AND plant_id = 3
);
