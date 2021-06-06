/* DO NOT TOUCH OR CHANGE BELOW SQL STATEMENT */
USE learnmysql;

/* DESIGN SCHEMA FOR REQUIREMENT */

-- PART 3:
-- 여기 user 테이블 생성 SQL 구문이 있습니다. user 테이블을 참고해서, content 테이블 생성 SQL 구문을 완성하세요.

CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) not NULL,
  `email` varchar(255) not NULL
);

CREATE TABLE `content` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `body` varchar(255) NOT NULL,
  `created_at` timestamp not NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int,
  FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
);

-- PART 5:
-- 아래 주석을 제거하고 category, content_category, role 테이블을 만드세요.


CREATE TABLE `category` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) not null
);


CREATE TABLE `content_category` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `contentId` int not null,
  `categoryId` int not null,
  FOREIGN KEY (`contentId`) REFERENCES `category` (`id`),
  FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`)


);


CREATE TABLE `role` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) not null
);


ALTER TABLE `user` ADD roleId int;
ALTER TABLE `user` ADD FOREIGN KEY (`roleId`) REFERENCES `role` (`id`);
