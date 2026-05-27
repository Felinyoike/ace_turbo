-- Run this against the DATABASE2_URL database (car data)
USE `u267913486_Car_data`;

CREATE TABLE IF NOT EXISTS `vehicles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `registration` VARCHAR(255) NOT NULL UNIQUE,
  `make` VARCHAR(255),
  `model` VARCHAR(255),
  `year` INT,
  `engine` VARCHAR(255),
  `fuel` VARCHAR(255),
  `colour` VARCHAR(255),
  `source` ENUM('api', 'db', 'cache') NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
);

CREATE TABLE IF NOT EXISTS `lookup_log` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `registration` VARCHAR(255) NOT NULL,
  `source` ENUM('api', 'db', 'cache') NOT NULL,
  `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `user_ip` VARCHAR(255),
  `vehicleId` INT,
  FOREIGN KEY (`vehicleId`) REFERENCES `vehicles`(`id`) ON DELETE SET NULL,
  INDEX (`registration`)
);
