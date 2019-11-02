CREATE TABLE patients (
  id TEXT PRIMARY KEY NOT NULL,
  first_name TEXT,
  last_name TEXT,
  age INT
);

CREATE TABLE users (
  id serial PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  dept TEXT NOT NULL,
  role TEXT NOT NULL,
  credentials TEXT NOT NULL
);

CREATE TABLE observations (
  id serial PRIMARY KEY,
  RR INT,
  pulse INT,
  capillary_refill INT,
  BP TEXT,
  observation TEXT,
  location TEXT,
  priority TEXT NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users,
  patient_id TEXT NOT NULL REFERENCES patients,
  timestamp timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE incidents (
  id serial PRIMARY KEY
);
--------------------------- seed users ---------------------------

-- EMT
INSERT INTO users (
  email,
  password,
  first_name,
  last_name,
  dept,
  role,
  credentials)
VALUES (
  'ems@isavelives.com',
  'secret',
  'Saver',
  'Savington',
  'EMS',
  'EMT',
  'VALIDCREDS1234'
  );

-- LEO

INSERT INTO users (
  email,
  password,
  first_name,
  last_name,
  dept,
  role,
  credentials)
VALUES (
  'officerdan@911.com',
  'secret',
  'Dan',
  'Cunningham',
  'CHP',
  'LEO',
  'BADGE1911'
  );

  -- Fireman

INSERT INTO users (
  email,
  password,
  first_name,
  last_name,
  dept,
  role,
  credentials)
VALUES (
  'firemanstan@firedept.com',
  'secret',
  'Stan',
  'Stanson',
  'Fire',
  'Fireman',
  'BADGE2292'
  );

  -- Dispatch

INSERT INTO users (
  email,
  password,
  first_name,
  last_name,
  dept,
  role,
  credentials)
VALUES (
  'Fred@nineoneone.com',
  'secret',
  'Fred',
  'Flinstone',
  'PD',
  'Dispatch',
  'BADGE109283'
  );

  -- Hospital

INSERT INTO users (
  email,
  password,
  first_name,
  last_name,
  dept,
  role,
  credentials)
VALUES (
  'dracular@aol.com',
  'secret',
  'Sally',
  'Acula',
  'hospital',
  'doctor',
  'ad19829'
  );

    -- Ambulance

INSERT INTO users (
  email,
  password,
  first_name,
  last_name,
  dept,
  role,
  credentials)
VALUES (
  'Alixis@hotmail.com',
  'secret',
  'Alixis',
  'Savington',
  'Ambulance',
  'Transport EMT',
  'BADGE987123'
  );

--------------------------- seed patients ---------------------------

INSERT INTO patients (id, first_name, last_name, age)
VALUES (
  '001',
  'John',
  'Doe',
  '20'
);

INSERT INTO patients (id, first_name, last_name, age)
VALUES (
  '002',
  'Jane',
  'Doe',
  '135'
);