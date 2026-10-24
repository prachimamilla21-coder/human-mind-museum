-- The Human Mind Museum - MySQL Database Schema
-- Compatible with MySQL 5.7+ / MySQL 8.0+ / MariaDB (XAMPP / phpMyAdmin)

CREATE DATABASE IF NOT EXISTS `mind_museum_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `mind_museum_db`;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(64) PRIMARY KEY,
  `username` VARCHAR(64) NOT NULL UNIQUE,
  `email` VARCHAR(128) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('visitor', 'guest', 'curator', 'admin') DEFAULT 'visitor',
  `visitor_badge_id` VARCHAR(32) NOT NULL UNIQUE,
  `visitor_level` VARCHAR(64) DEFAULT 'Novice Explorer',
  `join_date` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. User Visited Rooms
CREATE TABLE IF NOT EXISTS `user_visited_rooms` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` VARCHAR(64) NOT NULL,
  `room_id` VARCHAR(32) NOT NULL,
  `visited_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uniq_user_room` (`user_id`, `room_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. User Quiz Results (28 questions across 7 rooms)
CREATE TABLE IF NOT EXISTS `user_quiz_results` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` VARCHAR(64) NOT NULL,
  `room_id` VARCHAR(32) NOT NULL,
  `score` INT NOT NULL,
  `total` INT NOT NULL DEFAULT 4,
  `completed_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uniq_user_quiz` (`user_id`, `room_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. User Badges & Honors
CREATE TABLE IF NOT EXISTS `user_badges` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` VARCHAR(64) NOT NULL,
  `badge_name` VARCHAR(128) NOT NULL,
  `awarded_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uniq_user_badge` (`user_id`, `badge_name`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Arcade Game High Scores
CREATE TABLE IF NOT EXISTS `game_scores` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` VARCHAR(64) NOT NULL,
  `username` VARCHAR(64) NOT NULL,
  `game_id` VARCHAR(32) NOT NULL,
  `score` INT NOT NULL,
  `metric_label` VARCHAR(64) DEFAULT 'points',
  `details` TEXT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Subconscious Vault Journal Reflections
CREATE TABLE IF NOT EXISTS `journal_entries` (
  `id` VARCHAR(64) PRIMARY KEY,
  `user_id` VARCHAR(64) NOT NULL,
  `room` VARCHAR(32) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================================
-- Initial Seed: Chief Curator Account & Sample Data
-- Password for Dr. Vance is: mindcurator2026
-- ==========================================================
INSERT IGNORE INTO `users` (`id`, `username`, `email`, `password_hash`, `role`, `visitor_badge_id`, `visitor_level`)
VALUES (
  'usr_curator',
  'Dr. Vance',
  'curator@mindmuseum.org',
  '$2y$10$wN9QjE9.2q6X7XhZp9oQO.vD0ZflqL001cOmz0u61W2m234xY/Ece',
  'curator',
  'HMM-CUR-001',
  'Chief Neuro-Curator'
);

INSERT IGNORE INTO `user_badges` (`user_id`, `badge_name`) VALUES
('usr_curator', 'Museum Admission Pass'),
('usr_curator', 'Memory Architect'),
('usr_curator', 'Empathy Master'),
('usr_curator', 'Illusion Breaker'),
('usr_curator', 'OCEAN Pioneer'),
('usr_curator', 'Bias Hunter'),
('usr_curator', 'Strategic Thinker'),
('usr_curator', 'Neuro Scholar'),
('usr_curator', 'Grand Scholar: All 7 Rooms Explored');
