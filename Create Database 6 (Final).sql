-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema goforgolddb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `goforgolddb` ;

-- -----------------------------------------------------
-- Schema goforgolddb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `goforgolddb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `goforgolddb` ;

-- -----------------------------------------------------
-- Table `goforgolddb`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goforgolddb`.`categories` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(100) NOT NULL,
  `active` TINYINT NOT NULL DEFAULT '1',
  PRIMARY KEY (`category_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `goforgolddb`.`school_years`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goforgolddb`.`school_years` (
  `year_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`year_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `goforgolddb`.`activities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goforgolddb`.`activities` (
  `activity_id` INT NOT NULL AUTO_INCREMENT,
  `activity_name` VARCHAR(100) NOT NULL,
  `category_id` INT NOT NULL,
  `active` TINYINT NOT NULL DEFAULT '1',
  `year_id` INT NOT NULL DEFAULT '1',
  PRIMARY KEY (`activity_id`),
  INDEX `category_id_idx` (`category_id` ASC) VISIBLE,
  INDEX `year_id_idx` (`year_id` ASC) VISIBLE,
  CONSTRAINT `categories_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `goforgolddb`.`categories` (`category_id`),
  CONSTRAINT `year_id`
    FOREIGN KEY (`year_id`)
    REFERENCES `goforgolddb`.`school_years` (`year_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 103
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `goforgolddb`.`user_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goforgolddb`.`user_role` (
  `user_role_id` INT NOT NULL AUTO_INCREMENT,
  `user_role` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`user_role_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `goforgolddb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goforgolddb`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email_address` VARCHAR(100) NOT NULL,
  `user_role_id` INT NOT NULL,
  `active` TINYINT NOT NULL DEFAULT '1',
  `password` VARCHAR(100) NOT NULL DEFAULT 'Vianney!',
  `google_id` VARCHAR(255) NULL DEFAULT NULL,
  `token` VARCHAR(255) NULL DEFAULT NULL,
  `token_created_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `userID_UNIQUE` (`user_id` ASC) VISIBLE,
  INDEX `user_type_id_idx` (`user_role_id` ASC) VISIBLE,
  CONSTRAINT `user_type_id`
    FOREIGN KEY (`user_role_id`)
    REFERENCES `goforgolddb`.`user_role` (`user_role_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 37
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `goforgolddb`.`student_enrollment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goforgolddb`.`student_enrollment` (
  `student_id` INT NOT NULL,
  `activities_id` INT NOT NULL,
  `approved` TINYINT(1) NULL DEFAULT NULL,
  `points` INT NULL DEFAULT NULL,
  PRIMARY KEY (`student_id`, `activities_id`),
  INDEX `student_id_idx` (`student_id` ASC) VISIBLE,
  INDEX `activities_Id_idx` (`activities_id` ASC) VISIBLE,
  CONSTRAINT `activity_id`
    FOREIGN KEY (`activities_id`)
    REFERENCES `goforgolddb`.`activities` (`activity_id`),
  CONSTRAINT `userID`
    FOREIGN KEY (`student_id`)
    REFERENCES `goforgolddb`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `goforgolddb`.`attendance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goforgolddb`.`attendance` (
  `attendance_date` DATE NOT NULL,
  `activity_id_fk` INT NOT NULL,
  `student_id` INT NOT NULL,
  PRIMARY KEY (`student_id`, `activity_id_fk`, `attendance_date`),
  INDEX `student_id_idx` (`student_id` ASC) VISIBLE,
  INDEX `activity_id_idx` (`activity_id_fk` ASC) VISIBLE,
  CONSTRAINT `fk_attendance_enrollment`
    FOREIGN KEY (`student_id` , `activity_id_fk`)
    REFERENCES `goforgolddb`.`student_enrollment` (`student_id` , `activities_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `goforgolddb`.`faculty_moderators`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goforgolddb`.`faculty_moderators` (
  `faculty_id` INT NOT NULL,
  `activity_moderating_id` INT NOT NULL,
  INDEX `faculty_id_idx` (`faculty_id` ASC) VISIBLE,
  INDEX `activity_moderating_id_idx` (`activity_moderating_id` ASC) VISIBLE,
  CONSTRAINT `activity_moderating_id`
    FOREIGN KEY (`activity_moderating_id`)
    REFERENCES `goforgolddb`.`activities` (`activity_id`),
  CONSTRAINT `faculty_id`
    FOREIGN KEY (`faculty_id`)
    REFERENCES `goforgolddb`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `goforgolddb`.`student_grades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goforgolddb`.`student_grades` (
  `grade_id` INT NOT NULL AUTO_INCREMENT,
  `year_grade` INT NULL DEFAULT NULL,
  `grade_name` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`grade_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `goforgolddb`.`honor_roll`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goforgolddb`.`honor_roll` (
  `honor_roll_id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(100) NOT NULL,
  `description` VARCHAR(250) NULL DEFAULT NULL,
  `year_id_fk` INT NOT NULL DEFAULT '1',
  PRIMARY KEY (`honor_roll_id`),
  INDEX `year_id_idx` (`year_id_fk` ASC) VISIBLE,
  CONSTRAINT `year_id_fk`
    FOREIGN KEY (`year_id_fk`)
    REFERENCES `goforgolddb`.`school_years` (`year_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `goforgolddb`.`honor_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `goforgolddb`.`honor_list` (
  `honor_list_id` INT NOT NULL AUTO_INCREMENT,
  `student_id` INT NOT NULL,
  `honor_roll_id` INT NOT NULL,
  `quarter` INT NOT NULL,
  `grade_id` INT NOT NULL,
  `points` INT NULL DEFAULT NULL,
  PRIMARY KEY (`honor_list_id`),
  INDEX `student_id_idx` (`student_id` ASC) VISIBLE,
  INDEX `honor_roll_id_idx` (`honor_roll_id` ASC) VISIBLE,
  INDEX `FK_honor_grades` (`grade_id` ASC) VISIBLE,
  CONSTRAINT `FK_honor_grades`
    FOREIGN KEY (`grade_id`)
    REFERENCES `goforgolddb`.`student_grades` (`grade_id`),
  CONSTRAINT `honor_roll_id`
    FOREIGN KEY (`honor_roll_id`)
    REFERENCES `goforgolddb`.`honor_roll` (`honor_roll_id`),
  CONSTRAINT `student_id_fk`
    FOREIGN KEY (`student_id`)
    REFERENCES `goforgolddb`.`users` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
