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


-- WATERING SCHEDULES SEED DATA
INSERT INTO watering_schedules (schedule)
SELECT '2x per week'
WHERE NOT EXISTS (
    SELECT 1 FROM watering_schedules WHERE schedule = '2x per week'
);

INSERT INTO watering_schedules (schedule)
SELECT '1x per week'
WHERE NOT EXISTS (
    SELECT 1 FROM watering_schedules WHERE schedule = '1x per week'
);

INSERT INTO watering_schedules (schedule)
SELECT 'every 2 weeks'
WHERE NOT EXISTS (
    SELECT 1 FROM watering_schedules WHERE schedule = 'every 2 weeks'
);

INSERT INTO watering_schedules (schedule)
SELECT 'every 4 weeks'
WHERE NOT EXISTS (
    SELECT 1 FROM watering_schedules WHERE schedule = 'every 4 weeks'
);

INSERT INTO watering_schedules (schedule)
SELECT 'every 6 weeks'
WHERE NOT EXISTS (
    SELECT 1 FROM watering_schedules WHERE schedule = 'every 6 weeks'
);


-- STATUS SEED DATA
INSERT INTO status (status)
SELECT 'upcoming'
WHERE NOT EXISTS (
    SELECT 1 FROM status WHERE status = 'upcoming'
);

INSERT INTO status (status)
SELECT 'overdue'
WHERE NOT EXISTS (
    SELECT 1 FROM status WHERE status = 'overdue'
);

INSERT INTO status (status)
SELECT 'due today'
WHERE NOT EXISTS (
    SELECT 1 FROM status WHERE status = 'due today'
);
