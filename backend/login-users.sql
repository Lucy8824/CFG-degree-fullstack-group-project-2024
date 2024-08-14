CREATE DATABASE login_users;

USE login_users;

CREATE TABLE
    users (
        id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
        email VARCHAR(250) NOT NULL UNIQUE,
        password VARCHAR(250) NOT NULL
    );

-- commented this out and used directly in index.js to make it easier
-- INSERT INTO
--     users (email, name)
-- VALUES
--     (?, ?);