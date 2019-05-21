DROP DATABASE IF EXISTS photoPortal;
CREATE DATABASE IF NOT EXISTS photoPortal;
USE photoPortal;

CREATE TABLE IF NOT EXISTS Users
(
Id int auto_increment not null,
Nickname varchar(30) not null,
unique(Id),
primary key(Id)
);

CREATE TABLE IF NOT EXISTS Posts
(
Post_id int auto_increment not null,
Description varchar(200) default '',
Creation_date datetime default now(),
Photo_path varchar(200) not null,
Hashtags varchar(300) default '',
Num_of_likes int default 0,	
User_id int not null,
unique(Post_id),
primary key(Post_id),
foreign key (User_id) references Users (Id) on delete cascade
);

INSERT Users(Nickname)
VALUES
('Maxime'), ('Vova'), ('Kirill'), ('Dasha'), ('Oleg'), ('Semen'),
('Yana'), ('Kirill'), ('Misha'), ('Lesha');

INSERT Posts(Description, Photo_path, Hashtags, User_id, Creation_date)
VALUES
("hello!", "img/1.jpg", "moment, funny", 5, now()), ("I want to hello free", "img/5.jpg", "feelings", 2, "2019-05-01 19:21:34"),
("cool!", "img/2.jpg", "cute, funny", 2, "2017-05-25 19:21:34"), ("oleg", "img/6.jpg", "oleg", 10, "2018-05-25 19:20:34"),
("sad", "img/3.jpg", "", 2, "2016-05-25 19:21:34"), ("myau", "img/10.jpg", "cat, kitty, cute", 3, "2019-05-09 19:21:30"),
("", "img/4.jpg", "winter", 1, "2015-05-25 19:21:34"), ("Hey!", "img/18.jpg", "suddenly", 3, "2017-04-25 19:21:34"),
("", "img/2.jpg", "cold", 3, "2014-05-25 19:21:34"), ("Such a hello moment", "img/2.jpg", "moments", 2, "2019-05-09 15:03:00"),
("happy", "img/2.jpg", "moments", 5, now()), ("", "img/2.jpg", "", 5, now()),
("moment", "img/2.jpg", "", 2, "2019-05-21 09:03:00"), ("hey!", "img/8.jpg", "funny", 5, now());