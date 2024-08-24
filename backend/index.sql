DROP DATABASE IF EXISTS Festival_Meetup;
CREATE DATABASE Festival_Meetup;

USE Festival_Meetup;


CREATE TABLE User
(user_id INT AUTO_INCREMENT NOT NULL,
fullName VARCHAR (50) NOT NULL,
email VARCHAR (50) NOT NULL UNIQUE,
password VARCHAR (500) NOT NULL,
PRIMARY KEY (user_id));


CREATE TABLE User_profile
(user_id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR (50) NOT NULL,
age INT NOT NULL,
location VARCHAR (50),
profile_picture_url VARCHAR (500),
about_me VARCHAR (200), 
favourite_artists VARCHAR (100),
attended_festivals VARCHAR (100),
plan_to_visit VARCHAR (100),
FOREIGN KEY (user_id) REFERENCES User (user_id));


CREATE TABLE Feeds
(user_id INT NOT NULL, 
post_message VARCHAR (500),
post_id INT AUTO_INCREMENT,
PRIMARY KEY (post_id),
FOREIGN KEY (user_id) REFERENCES User (user_id));

CREATE TABLE conversations (
    conversation_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(250),
    type ENUM('private', 'group') NOT NULL
);

CREATE TABLE messages (
    messages_id INT AUTO_INCREMENT PRIMARY KEY,
    conversation_id INT,
    user_id INT NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id),
    FOREIGN KEY (user_id) REFERENCES User (user_id)
);

CREATE TABLE group_memberships (
    membership_id INT AUTO_INCREMENT PRIMARY KEY,
    conversation_id INT,
    user_id INT NOT NULL,
    FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id),
    FOREIGN KEY (user_id) REFERENCES User (user_id)
);


INSERT INTO User
(fullName, email, password)
VALUES
("Lydia Hague", "ljhague94@gmail.com", "LJH38ty25"),
("Marie Williams", "tj19@hotmail.co.uk", "hello1990"),
("Josie Barker", "jellyfish9@gmail.com", "jellyfiiish55");

INSERT INTO User_profile
(first_name, age, location, profile_picture_url, about_me, favourite_artists, attended_festivals, plan_to_visit)
VALUES
("Lydia", 29, "Cardiff", "https://i.pinimg.com/originals/9b/20/4c/9b204c0801c9cc705ee129b61af3b6dc.jpg", "lorem...	", "Fred Again, Cat Burns, Caity Baser", "Leeds Festival, Isle of Wight Festival, Glastonbury", "Reading Festival, Glastonbury"),
("Sarah", 26, "London", "https://media.istockphoto.com/id/1457409025/photo/festival-moment.jpg?s=612x612&w=0&k=20&c=fC9ihV9iAr8M4PwqCbn428T1JLeFGOURxEkOFmg9Rvs=", "I am a festival goer from London", "Beyonce, Raye, Dave", "Reading Festival", "Boomtown"),
("Josie", 22, "Sussex", "https://img.freepik.com/free-photo/young-people-bonding-spending-time-together-youth-activities_23-2151664337.jpg", "lorem...", "Raye, Loyle Carner, Coldplay", "Glastonbury, Coachella", "Reading");

INSERT INTO Feeds
(user_id, post_message)
VALUES
(1, "Hey guys, I'm going to Leeds festival on the weekend by myself, would be great if anyone wants to meet"),
(2, "Hi everyone, I'm Hannah! I'm so excited to go to Glastonbury but none of my friends could get tickets, if anyone wants to meet up who also loves dance music let me know!"),
(3, "Hi guys, can't wait to see Raye at Reading next week, would be great to meet some like-minded people");

INSERT INTO conversations (name) 
VALUES ("Glasto!!"), ("Festival gals");

INSERT INTO messages (conversation_id, user_id, content) 
VALUES 
(1, 1, "Hey, I saw youre attending Glasto on the feeds page, I am too!"),
(2, 2, "Hiya!! I LOVE dance music!!");


CREATE TABLE Comments (
comment_id INT AUTO_INCREMENT PRIMARY KEY,
post_id INT NOT NULL,
user_id INT NOT NULL,
comment VARCHAR (500) NOT NULL,
FOREIGN KEY (post_id) REFERENCES Feeds (post_id),
FOREIGN KEY (user_id) REFERENCES User (user_id));

INSERT INTO Comments 
(post_id, user_id, comment)
VALUES
(1, 1, "hey guys");