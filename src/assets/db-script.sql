-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
SHOW WARNINGS;
-- -----------------------------------------------------
-- Schema student_staff_assistance
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `student_staff_assistance` ;

-- -----------------------------------------------------
-- Schema student_staff_assistance
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `student_staff_assistance` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `student_staff_assistance` ;

-- -----------------------------------------------------
-- Table `student_staff_assistance`.`user_roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_staff_assistance`.`user_roles` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `student_staff_assistance`.`user_roles` (
  `role_id` VARCHAR(50) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `description` VARCHAR(1000) NULL DEFAULT NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `student_staff_assistance`.`departments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_staff_assistance`.`departments` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `student_staff_assistance`.`departments` (
  `dept_id` VARCHAR(50) NOT NULL,
  `dept_name` VARCHAR(100) NOT NULL,
  `dept_desc` VARCHAR(1000) NULL DEFAULT NULL,
  PRIMARY KEY (`dept_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `student_staff_assistance`.`programs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_staff_assistance`.`programs` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `student_staff_assistance`.`programs` (
  `program_id` VARCHAR(50) NOT NULL,
  `program_name` VARCHAR(100) NOT NULL,
  `program_desc` VARCHAR(1000) NULL DEFAULT NULL,
  `dept_id` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`program_id`),
  CONSTRAINT `Prog Dept Id`
    FOREIGN KEY (`dept_id`)
    REFERENCES `student_staff_assistance`.`departments` (`dept_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;
CREATE INDEX `Prog Dept Id_idx` ON `student_staff_assistance`.`programs` (`dept_id` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `student_staff_assistance`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_staff_assistance`.`users` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `student_staff_assistance`.`users` (
  `user_id` VARCHAR(50) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `email_id` VARCHAR(100) NOT NULL,
  `fname` VARCHAR(45) NULL DEFAULT NULL,
  `lname` VARCHAR(45) NULL DEFAULT NULL,
  `role_id` VARCHAR(50) NOT NULL,
  `mobile_no` BIGINT(10) NULL DEFAULT NULL,
  `password` VARCHAR(100) NOT NULL,
  `dept_id` VARCHAR(50) NULL DEFAULT NULL,
  `prog_id` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `Role Id`
    FOREIGN KEY (`role_id`)
    REFERENCES `student_staff_assistance`.`user_roles` (`role_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `User Dept Id`
    FOREIGN KEY (`dept_id`)
    REFERENCES `student_staff_assistance`.`departments` (`dept_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `User Prog Id`
    FOREIGN KEY (`prog_id`)
    REFERENCES `student_staff_assistance`.`programs` (`program_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;
CREATE UNIQUE INDEX `userid_UNIQUE` ON `student_staff_assistance`.`users` (`user_id` ASC);

SHOW WARNINGS;
CREATE UNIQUE INDEX `emailid_UNIQUE` ON `student_staff_assistance`.`users` (`email_id` ASC);

SHOW WARNINGS;
CREATE UNIQUE INDEX `username_UNIQUE` ON `student_staff_assistance`.`users` (`username` ASC);

SHOW WARNINGS;
CREATE INDEX `role_id_idx` ON `student_staff_assistance`.`users` (`role_id` ASC);

SHOW WARNINGS;
CREATE INDEX `User Prog Id_idx` ON `student_staff_assistance`.`users` (`prog_id` ASC);

SHOW WARNINGS;
CREATE INDEX `User Dept Id_idx` ON `student_staff_assistance`.`users` (`dept_id` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `student_staff_assistance`.`activity_trace`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_staff_assistance`.`activity_trace` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `student_staff_assistance`.`activity_trace` (
  `activity_id` VARCHAR(50) NOT NULL,
  `description` VARCHAR(4000) NULL DEFAULT NULL,
  `username` VARCHAR(50) NOT NULL,
  `timestamp` DATETIME NOT NULL,
  `user_id` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`activity_id`),
  CONSTRAINT `activity userid`
    FOREIGN KEY (`user_id`)
    REFERENCES `student_staff_assistance`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `activity username`
    FOREIGN KEY (`username`)
    REFERENCES `student_staff_assistance`.`users` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;
CREATE INDEX `activity userid_idx` ON `student_staff_assistance`.`activity_trace` (`user_id` ASC);

SHOW WARNINGS;
CREATE INDEX `activity username_idx` ON `student_staff_assistance`.`activity_trace` (`username` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `student_staff_assistance`.`avatar_img`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_staff_assistance`.`avatar_img` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `student_staff_assistance`.`avatar_img` (
  `user_id` VARCHAR(50) NOT NULL,
  `avatar_img` MEDIUMBLOB NOT NULL,
  `length` BIGINT(50) NULL DEFAULT NULL,
  `content_type` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `Image User ID`
    FOREIGN KEY (`user_id`)
    REFERENCES `student_staff_assistance`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `student_staff_assistance`.`courses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_staff_assistance`.`courses` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `student_staff_assistance`.`courses` (
  `course_id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(1000) NULL DEFAULT NULL,
  `dept_id` VARCHAR(50) NOT NULL,
  `prog_id` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`course_id`),
  CONSTRAINT `Course Dept Id`
    FOREIGN KEY (`dept_id`)
    REFERENCES `student_staff_assistance`.`departments` (`dept_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Course Prog Id`
    FOREIGN KEY (`prog_id`)
    REFERENCES `student_staff_assistance`.`programs` (`program_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;
CREATE UNIQUE INDEX `name_UNIQUE` ON `student_staff_assistance`.`courses` (`name` ASC);

SHOW WARNINGS;
CREATE INDEX `Corse Dept Id_idx` ON `student_staff_assistance`.`courses` (`dept_id` ASC);

SHOW WARNINGS;
CREATE INDEX `Course Prog Id_idx` ON `student_staff_assistance`.`courses` (`prog_id` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `student_staff_assistance`.`discussion_thread`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_staff_assistance`.`discussion_thread` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `student_staff_assistance`.`discussion_thread` (
  `disc_thread_id` VARCHAR(45) NOT NULL,
  `topic_name` VARCHAR(100) NOT NULL,
  `topic_desc` VARCHAR(5000) NULL DEFAULT NULL,
  `created_by` VARCHAR(50) NOT NULL,
  `updated_by` VARCHAR(50) NOT NULL,
  `timestamp` DATETIME NULL DEFAULT NULL,
  `created_by_username` VARCHAR(50) NOT NULL,
  `updated_by_username` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`disc_thread_id`),
  CONSTRAINT `Created By`
    FOREIGN KEY (`created_by`)
    REFERENCES `student_staff_assistance`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Disc Created By Username`
    FOREIGN KEY (`created_by_username`)
    REFERENCES `student_staff_assistance`.`users` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Disc Updated By Username`
    FOREIGN KEY (`updated_by_username`)
    REFERENCES `student_staff_assistance`.`users` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Updated By`
    FOREIGN KEY (`updated_by`)
    REFERENCES `student_staff_assistance`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;
CREATE INDEX `Created By_idx` ON `student_staff_assistance`.`discussion_thread` (`created_by` ASC);

SHOW WARNINGS;
CREATE INDEX `Updated By_idx` ON `student_staff_assistance`.`discussion_thread` (`updated_by` ASC);

SHOW WARNINGS;
CREATE INDEX `Disc Created By Username_idx` ON `student_staff_assistance`.`discussion_thread` (`created_by_username` ASC);

SHOW WARNINGS;
CREATE INDEX `Disc Updated By Username_idx` ON `student_staff_assistance`.`discussion_thread` (`updated_by_username` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `student_staff_assistance`.`discussion_chats`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_staff_assistance`.`discussion_chats` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `student_staff_assistance`.`discussion_chats` (
  `disc_chat_id` VARCHAR(50) NOT NULL,
  `chat_desc` VARCHAR(5000) NOT NULL,
  `disc_thread_id` VARCHAR(50) NOT NULL,
  `user_id` VARCHAR(50) NOT NULL,
  `timestamp` DATETIME NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`disc_chat_id`),
  CONSTRAINT `Discc Chat Username`
    FOREIGN KEY (`username`)
    REFERENCES `student_staff_assistance`.`users` (`username`),
  CONSTRAINT `Discussion ID`
    FOREIGN KEY (`disc_thread_id`)
    REFERENCES `student_staff_assistance`.`discussion_thread` (`disc_thread_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `UserID`
    FOREIGN KEY (`user_id`)
    REFERENCES `student_staff_assistance`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;
CREATE INDEX `UserID_idx` ON `student_staff_assistance`.`discussion_chats` (`user_id` ASC);

SHOW WARNINGS;
CREATE INDEX `Discussion ID` ON `student_staff_assistance`.`discussion_chats` (`disc_thread_id` ASC);

SHOW WARNINGS;
CREATE INDEX `Discc Chat Username_idx` ON `student_staff_assistance`.`discussion_chats` (`username` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `student_staff_assistance`.`document_master`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_staff_assistance`.`document_master` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `student_staff_assistance`.`document_master` (
  `doc_id` VARCHAR(50) NOT NULL,
  `length` BIGINT(10) NOT NULL,
  `content_type` VARCHAR(45) NOT NULL,
  `doc_file` LONGBLOB NOT NULL,
  `doc_type` VARCHAR(45) NULL DEFAULT NULL,
  `created_by` VARCHAR(50) NOT NULL,
  `updated_by` VARCHAR(50) NOT NULL,
  `timestamp` DATETIME NOT NULL,
  `doc_title` VARCHAR(100) NULL DEFAULT NULL,
  `doc_desc` VARCHAR(1000) NULL DEFAULT NULL,
  PRIMARY KEY (`doc_id`),
  CONSTRAINT `SM Created By`
    FOREIGN KEY (`created_by`)
    REFERENCES `student_staff_assistance`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `SM Updated By`
    FOREIGN KEY (`updated_by`)
    REFERENCES `student_staff_assistance`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;
CREATE INDEX `Created By_idx` ON `student_staff_assistance`.`document_master` (`created_by` ASC);

SHOW WARNINGS;
CREATE INDEX `Updated By_idx` ON `student_staff_assistance`.`document_master` (`updated_by` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `student_staff_assistance`.`enroll_course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_staff_assistance`.`enroll_course` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `student_staff_assistance`.`enroll_course` (
  `user_id` VARCHAR(50) NOT NULL,
  `course_id` VARCHAR(50) NOT NULL,
  `approved` TINYINT(4) NOT NULL,
  PRIMARY KEY (`user_id`, `course_id`),
  CONSTRAINT `Course ID`
    FOREIGN KEY (`course_id`)
    REFERENCES `student_staff_assistance`.`courses` (`course_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `User ID`
    FOREIGN KEY (`user_id`)
    REFERENCES `student_staff_assistance`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;
CREATE INDEX `Course ID_idx` ON `student_staff_assistance`.`enroll_course` (`course_id` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `student_staff_assistance`.`events`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `student_staff_assistance`.`events` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `student_staff_assistance`.`events` (
  `event_id` VARCHAR(50) NOT NULL,
  `event_name` VARCHAR(100) NOT NULL,
  `event_desc` VARCHAR(1000) NULL DEFAULT NULL,
  `event_type` VARCHAR(100) NULL DEFAULT NULL,
  `event_date` TIMESTAMP NULL DEFAULT NULL,
  `created_by` VARCHAR(50) NOT NULL,
  `updated_by` VARCHAR(50) NOT NULL,
  `created_by_username` VARCHAR(50) NOT NULL,
  `updated_by_username` VARCHAR(50) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL,
  `event_category` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  CONSTRAINT `Event Created by`
    FOREIGN KEY (`created_by`)
    REFERENCES `student_staff_assistance`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Event Created username`
    FOREIGN KEY (`created_by_username`)
    REFERENCES `student_staff_assistance`.`users` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Event Updated by`
    FOREIGN KEY (`updated_by`)
    REFERENCES `student_staff_assistance`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Event Updated username`
    FOREIGN KEY (`updated_by_username`)
    REFERENCES `student_staff_assistance`.`users` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SHOW WARNINGS;
CREATE INDEX `Event Created by_idx` ON `student_staff_assistance`.`events` (`created_by` ASC);

SHOW WARNINGS;
CREATE INDEX `Event Updated by_idx` ON `student_staff_assistance`.`events` (`updated_by` ASC);

SHOW WARNINGS;
CREATE INDEX `Event Created username_idx` ON `student_staff_assistance`.`events` (`created_by_username` ASC);

SHOW WARNINGS;
CREATE INDEX `Event Updated username_idx` ON `student_staff_assistance`.`events` (`updated_by_username` ASC);

SHOW WARNINGS;
USE `student_staff_assistance`;

DELIMITER $$

USE `student_staff_assistance`$$
DROP TRIGGER IF EXISTS `student_staff_assistance`.`users_AFTER_DELETE` $$
SHOW WARNINGS$$
USE `student_staff_assistance`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `student_staff_assistance`.`users_AFTER_DELETE`
AFTER DELETE ON `student_staff_assistance`.`users`
FOR EACH ROW
BEGIN
	INSERT INTO activity_trace
		VALUES(UUID(), 'Deleted User Account', OLD.username, NOW(), OLD.user_id);
END$$

SHOW WARNINGS$$

USE `student_staff_assistance`$$
DROP TRIGGER IF EXISTS `student_staff_assistance`.`users_AFTER_INSERT` $$
SHOW WARNINGS$$
USE `student_staff_assistance`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `student_staff_assistance`.`users_AFTER_INSERT`
AFTER INSERT ON `student_staff_assistance`.`users`
FOR EACH ROW
BEGIN
	INSERT INTO activity_trace
		VALUES(UUID(), 'Created New User Account', NEW.username, NOW(), NEW.user_id);
END$$

SHOW WARNINGS$$

USE `student_staff_assistance`$$
DROP TRIGGER IF EXISTS `student_staff_assistance`.`users_AFTER_UPDATE` $$
SHOW WARNINGS$$
USE `student_staff_assistance`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `student_staff_assistance`.`users_AFTER_UPDATE`
AFTER UPDATE ON `student_staff_assistance`.`users`
FOR EACH ROW
BEGIN
	INSERT INTO activity_trace
		VALUES(UUID(), 'Updated User Data', NEW.username, NOW(), NEW.user_id);
END$$

SHOW WARNINGS$$

USE `student_staff_assistance`$$
DROP TRIGGER IF EXISTS `student_staff_assistance`.`discussion_thread_AFTER_DELETE` $$
SHOW WARNINGS$$
USE `student_staff_assistance`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `student_staff_assistance`.`discussion_thread_AFTER_DELETE`
AFTER DELETE ON `student_staff_assistance`.`discussion_thread`
FOR EACH ROW
BEGIN
	INSERT INTO activity_trace
		VALUES(UUID(), concat(OLD.updated_by_username ,' deleted discussion as ', OLD.topic_name), OLD.updated_by_username, NOW(), OLD.updated_by);
END$$

SHOW WARNINGS$$

USE `student_staff_assistance`$$
DROP TRIGGER IF EXISTS `student_staff_assistance`.`discussion_thread_AFTER_INSERT` $$
SHOW WARNINGS$$
USE `student_staff_assistance`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `student_staff_assistance`.`discussion_thread_AFTER_INSERT`
AFTER INSERT ON `student_staff_assistance`.`discussion_thread`
FOR EACH ROW
BEGIN
    INSERT INTO activity_trace
		VALUES(UUID(), concat(NEW.created_by_username ,' started new discussion as ', NEW.topic_name), NEW.created_by_username, NOW(), NEW.created_by);
END$$

SHOW WARNINGS$$

USE `student_staff_assistance`$$
DROP TRIGGER IF EXISTS `student_staff_assistance`.`discussion_thread_AFTER_UPDATE` $$
SHOW WARNINGS$$
USE `student_staff_assistance`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `student_staff_assistance`.`discussion_thread_AFTER_UPDATE`
AFTER UPDATE ON `student_staff_assistance`.`discussion_thread`
FOR EACH ROW
BEGIN
	INSERT INTO activity_trace
		VALUES(UUID(), concat(NEW.updated_by_username ,' updated ', NEW.topic_name, 'discussion details. '), NEW.updated_by_username, NOW(), NEW.updated_by);
END$$

SHOW WARNINGS$$

USE `student_staff_assistance`$$
DROP TRIGGER IF EXISTS `student_staff_assistance`.`discussion_chats_AFTER_DELETE` $$
SHOW WARNINGS$$
USE `student_staff_assistance`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `student_staff_assistance`.`discussion_chats_AFTER_DELETE`
AFTER DELETE ON `student_staff_assistance`.`discussion_chats`
FOR EACH ROW
BEGIN
	DECLARE topic VARCHAR(100);

    SELECT c.topic_name into topic FROM discussion_thread c WHERE c.disc_thread_id=OLD.disc_thread_id;
    
	INSERT INTO activity_trace
		VALUES(UUID(), concat(OLD.username ,' deleted comment as ',OLD.chat_desc ,' in ', topic,' discussion'), OLD.username, NOW(), OLD.user_id);
END$$

SHOW WARNINGS$$

USE `student_staff_assistance`$$
DROP TRIGGER IF EXISTS `student_staff_assistance`.`discussion_chats_AFTER_INSERT` $$
SHOW WARNINGS$$
USE `student_staff_assistance`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `student_staff_assistance`.`discussion_chats_AFTER_INSERT`
AFTER INSERT ON `student_staff_assistance`.`discussion_chats`
FOR EACH ROW
BEGIN
	DECLARE topic VARCHAR(100);

    SELECT c.topic_name into topic FROM discussion_thread c WHERE c.disc_thread_id=NEW.disc_thread_id;
    
	INSERT INTO activity_trace
		VALUES(UUID(), concat(NEW.username ,' added comment as ',NEW.chat_desc ,' in ', topic,' discussion'), NEW.username, NOW(), NEW.user_id);
END$$

SHOW WARNINGS$$

USE `student_staff_assistance`$$
DROP TRIGGER IF EXISTS `student_staff_assistance`.`discussion_chats_AFTER_UPDATE` $$
SHOW WARNINGS$$
USE `student_staff_assistance`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `student_staff_assistance`.`discussion_chats_AFTER_UPDATE`
AFTER UPDATE ON `student_staff_assistance`.`discussion_chats`
FOR EACH ROW
BEGIN
	DECLARE topic VARCHAR(100);

    SELECT c.topic_name into topic FROM discussion_thread c WHERE c.disc_thread_id=NEW.disc_thread_id;
    
	INSERT INTO activity_trace
		VALUES(UUID(), concat(NEW.username ,' updated comment as ',NEW.chat_desc ,' in ', topic,' discussion'), NEW.username, NOW(), NEW.user_id);
END$$

SHOW WARNINGS$$

USE `student_staff_assistance`$$
DROP TRIGGER IF EXISTS `student_staff_assistance`.`enroll_course_AFTER_DELETE` $$
SHOW WARNINGS$$
USE `student_staff_assistance`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `student_staff_assistance`.`enroll_course_AFTER_DELETE`
AFTER DELETE ON `student_staff_assistance`.`enroll_course`
FOR EACH ROW
BEGIN
	DECLARE username, course VARCHAR(50);

    SELECT c.name into course FROM courses c WHERE c.course_id=OLD.course_id;
    SELECT u.username into username FROM users u WHERE u.user_id=OLD.user_id;
    
	INSERT INTO activity_trace
		VALUES(UUID(), concat(username,' has removed the request for ',course,' course'), username, NOW(), OLD.user_id);
END$$

SHOW WARNINGS$$

USE `student_staff_assistance`$$
DROP TRIGGER IF EXISTS `student_staff_assistance`.`enroll_course_AFTER_INSERT` $$
SHOW WARNINGS$$
USE `student_staff_assistance`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `student_staff_assistance`.`enroll_course_AFTER_INSERT`
AFTER INSERT ON `student_staff_assistance`.`enroll_course`
FOR EACH ROW
BEGIN
	DECLARE username, course VARCHAR(50);

    SELECT c.name into course FROM courses c WHERE c.course_id=NEW.course_id;
    SELECT u.username into username FROM users u WHERE u.user_id=NEW.user_id;
    
    INSERT INTO activity_trace
		VALUES(UUID(), concat(username ,' make request to enroll in ', course, ' course'), username, NOW(), NEW.user_id);
END$$

SHOW WARNINGS$$

USE `student_staff_assistance`$$
DROP TRIGGER IF EXISTS `student_staff_assistance`.`enroll_course_AFTER_UPDATE` $$
SHOW WARNINGS$$
USE `student_staff_assistance`$$
CREATE
DEFINER=`root`@`localhost`
TRIGGER `student_staff_assistance`.`enroll_course_AFTER_UPDATE`
AFTER UPDATE ON `student_staff_assistance`.`enroll_course`
FOR EACH ROW
BEGIN
	DECLARE username, course VARCHAR(50);

    SELECT c.name into course FROM courses c WHERE c.course_id=NEW.course_id;
    SELECT u.username into username FROM users u WHERE u.user_id=NEW.user_id;
    
    if (NEW.approved=1 and OLD.approved=0)
    then
		INSERT INTO activity_trace
			VALUES(UUID(), concat('Enrollment request of ',username,' for course ',course,' is approved'), username, NOW(), NEW.user_id);
	end if;
END$$

SHOW WARNINGS$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
