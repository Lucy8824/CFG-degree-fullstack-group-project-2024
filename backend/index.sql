DROP DATABASE IF EXISTS Festival_Meetup;
CREATE DATABASE Festival_Meetup;

USE Festival_Meetup;

-- CREATE TABLE User_sign_up
-- (user_id INT AUTO_INCREMENT NOT NULL,
-- fullName VARCHAR (50) NOT NULL,
-- email VARCHAR (50) NOT NULL UNIQUE,
-- password VARCHAR (50) NOT NULL UNIQUE,
-- PRIMARY KEY (user_id));

-- CREATE TABLE User_login
-- (user_id INT AUTO_INCREMENT NOT NULL, 
-- email VARCHAR (50) NOT NULL, 
-- password VARCHAR (50) UNIQUE, 
-- FOREIGN KEY (user_id) REFERENCES User_sign_up (user_id),
-- FOREIGN KEY (email) REFERENCES User_sign_up (email),
-- FOREIGN KEY (password) REFERENCES User_sign_up (password));

CREATE TABLE User
(user_id INT AUTO_INCREMENT NOT NULL,
fullName VARCHAR (50) NOT NULL,
email VARCHAR (50) NOT NULL UNIQUE,
password VARCHAR (500) NOT NULL UNIQUE,
PRIMARY KEY (user_id));


CREATE TABLE User_profile
(user_id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR (50) NOT NULL,
age INT NOT NULL,
location VARCHAR (50),
profile_picture_url VARCHAR (200),
about_me VARCHAR (200), 
favourite_artists VARCHAR (100),
attended_festivals VARCHAR (100),
plan_to_visit VARCHAR (100),
FOREIGN KEY (user_id) REFERENCES User (user_id));


CREATE TABLE Feeds
(user_id INT AUTO_INCREMENT, 
first_name VARCHAR (50) NOT NULL,
profile_picture_url VARCHAR (200),
post_message VARCHAR (500),
FOREIGN KEY (user_id) REFERENCES User (user_id));

-- CREATE TABLE conversations (
--     conversation_id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(250)
--     type ENUM('private', 'group') NOT NULL
-- );

-- CREATE TABLE messages (
--     messages_id INT AUTO_INCREMENT PRIMARY KEY,
--     conversation_id INT,
--     user_id INT,
--     content TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TiMESTAMP,
--     FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id),
--     FOREIGN KEY (user_id) REFERENCES User (user_id)
-- );

-- CREATE TABLE group_memberships (
--     membership_id INT AUTO_INCREMENT PRIMARY KEY,
--     conversation_id INT,
--     user_id INT,
--     FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id),
--     FOREIGN KEY (user_id) REFERENCES User (user_id)
-- );


-- INSERT INTO User_sign_up
-- (full_name, email_address, password)
-- VALUES 
-- ("Lydia Hague", "ljhague94@gmail.com", "LJH38ty25"),
-- ("Marie Williams", "tj19@hotmail.co.uk", "hello1990"),
-- ("Josie Barker", "jellyfish9@gmail.com", "jellyfiiish55");

-- INSERT INTO User_login
-- (email_address, password)
-- VALUES 
-- ("ljhague94@gmail.com", "LJH38ty25"),
-- ("tj19@hotmail.co.uk", "hello1990"),
-- ("jellyfish9@gmail.com", "jellyfiiish55");

INSERT INTO User
(fullName, email, password)
VALUES
("Lydia Hague", "ljhague94@gmail.com", "LJH38ty25"),
("Marie Williams", "tj19@hotmail.co.uk", "hello1990"),
("Josie Barker", "jellyfish9@gmail.com", "jellyfiiish55");

INSERT INTO User_profile
(first_name, age, location, profile_picture_url, about_me, favourite_artists, attended_festivals, plan_to_visit)
VALUES
("Lydia", 29, "Cardiff", "/Users/lydiahague/Downloads/IMG_6205.HEIC", "lorem...	", "Fred Again, Cat Burns, Caity Baser", "Leeds Festival, Isle of Wight Festival, Glastonbury", "Reading Festival, Glastonbury"),
("Sarah", 26, "London", "https://media.istockphoto.com/id/1457409025/photo/festival-moment.jpg?s=612x612&w=0&k=20&c=fC9ihV9iAr8M4PwqCbn428T1JLeFGOURxEkOFmg9Rvs=", "I am a festival goer from London", "Beyonce, Raye, Dave", "Reading Festival", "Boomtown"),
("Josie", 22, "Sussex", "15 June 18-38-19 LYDIA.jpg", "lorem...", "Raye, Loyle Carner, Coldplay", "Glastonbury, Coachella", "Reading");

INSERT INTO Feeds
(first_name, profile_picture_url, post_message)
VALUES
("Bob", "IMG_1733.jpg", "Hey guys, I'm going to Leeds festival on the weekend by myself, would be great if anyone wants to meet"),
("Hannah", "19 January 19-38-02 LYDIA", "Hi everyone, I'm Hannah! I'm so excited to go to Glastonbury but none of my friends could get tickets, if anyone wants to meet up who also loves dance music let me know!"),
("Josie", "15 June 18-38-19 LYDIA.jpg", "Hi guys, can't wait to see Raye at Reading next week, would be great to meet some like-minded people");

-- INSERT INTO conversations (name) 
-- VALUES ("Glasto!!"), ("Festival gals");

-- INSERT INTO messages (conversation_id, sender_id, content) 
-- VALUES 
-- (1, 1, "Hey, I saw youre attending Glasto on the feeds page, I am too!"),
-- (2,2 "Hiya!! I LOVE dance music!!");