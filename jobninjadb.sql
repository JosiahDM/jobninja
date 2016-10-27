-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema jobninjadb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `jobninjadb` ;

-- -----------------------------------------------------
-- Schema jobninjadb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `jobninjadb` DEFAULT CHARACTER SET utf8 ;
USE `jobninjadb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `userid` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `tooktest` TINYINT NOT NULL DEFAULT 0,
  `testid` VARCHAR(300) NULL,
  PRIMARY KEY (`userid`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `password_UNIQUE` (`password` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `company`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `company` ;

CREATE TABLE IF NOT EXISTS `company` (
  `companyid` INT NOT NULL AUTO_INCREMENT,
  `companyname` VARCHAR(45) NOT NULL,
  `companyuserid` INT NOT NULL,
  PRIMARY KEY (`companyid`),
  INDEX `fkusercompany_idx` (`companyuserid` ASC),
  CONSTRAINT `fkusercompany`
    FOREIGN KEY (`companyuserid`)
    REFERENCES `user` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `words`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `words` ;

CREATE TABLE IF NOT EXISTS `words` (
  `wordid` INT NOT NULL AUTO_INCREMENT,
  `value` VARCHAR(100) NOT NULL,
  `worduserid` INT NULL,
  `wordcompanyid` INT NULL,
  PRIMARY KEY (`wordid`),
  INDEX `fkuserword_idx` (`worduserid` ASC),
  INDEX `fkcompanyword_idx` (`wordcompanyid` ASC),
  CONSTRAINT `fkuserword`
    FOREIGN KEY (`worduserid`)
    REFERENCES `user` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fkcompanyword`
    FOREIGN KEY (`wordcompanyid`)
    REFERENCES `company` (`companyid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
GRANT USAGE ON *.* TO ninja;
 DROP USER ninja;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'ninja' IDENTIFIED BY 'ninja';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'ninja';

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `jobninjadb`;
INSERT INTO `user` (`userid`, `username`, `password`, `tooktest`, `testid`) VALUES (1, 'admin', 'adminpassword', DEFAULT, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `company`
-- -----------------------------------------------------
START TRANSACTION;
USE `jobninjadb`;
INSERT INTO `company` (`companyid`, `companyname`, `companyuserid`) VALUES (1, 'Skill Distillery', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `words`
-- -----------------------------------------------------
START TRANSACTION;
USE `jobninjadb`;
INSERT INTO `words` (`wordid`, `value`, `worduserid`, `wordcompanyid`) VALUES (1, 'helpful', 1, NULL);

COMMIT;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
