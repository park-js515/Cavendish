-- 데이터 베이스 삭제

DROP DATABASE IF EXISTS s09p22c105;

-- 데이터 베이스 생성

CREATE DATABASE IF NOT EXISTS s09p22c105;
USE s09p22c105;

-- 사용자 테이블

CREATE TABLE `users` (
	`id` UUID NOT NULL,
	`login_id` varchar(20) NOT NULL UNIQUE,
	`password` varchar(20) NOT NULL,
	`nickname` varchar(20) NOT NULL UNIQUE,
	`state` tinyint NOT NULL DEFAULT 0 COMMENT '0:일반, 1: 탈퇴',
	PRIMARY KEY (`id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- 사용자 역할 테이블

CREATE TABLE `users_roles` (
	`user_id` UUID NOT NULL,
	`roles` varchar(255) DEFAULT NULL,
	PRIMARY KEY (`user_id`),
	CONSTRAINT `users_roles_user_id`
		FOREIGN KEY (`user_id`)
		REFERENCES `users` (`id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- 부품 북마크 테이블

CREATE TABLE `part_bookmark` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` UUID NOT NULL,
	`pid` tinyint NOT NULL COMMENT '0:CPU, 1:메인보드, 2:메모리, 3:그래픽카드, 4:SSD, 5:HDD, 6: 케이스, 7: 파워, 8:쿨러',
	`part_id` int NOT NULL,
	PRIMARY KEY (`id`),
	CONSTRAINT `fk_part_bookmark_user_id`
		FOREIGN KEY (`user_id`)
		REFERENCES `users` (`id`) ON UPDATE CASCADE
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- 견적 테이블(연결필요)

CREATE TABLE `quotation` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` UUID NULL COMMENT '견적함',
	`cpu_id` int NULL,
	`power_id` int NULL,
	`mainboard_id` int NULL,
	`ram_id` int NULL,
	`graphic_id` int NULL,
	`hdd_id` int NULL,
	`ssd_id` int NULL,
	`case_id` int NULL,
	`cooler_id` int NULL,
	`name` varchar(100) NULL COMMENT '견적함',
	`state` int NULL COMMENT '비트 마스킹, 견적함',
	`create_date` date NULL COMMENT '견적함',
	PRIMARY KEY (`id`)
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- 게시판 테이블

CREATE TABLE `boards` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` UUID NOT NULL,
	`quotation_id` int NULL,
	`title` varchar(100) NOT NULL,
	`contents` varchar(1000) NOT NULL,
	`create_date` date NOT NULL,
	`image_path` varchar(100) NOT NULL,
	`status` tinyint NOT NULL COMMENT '0:일반, 1: 삭제',
	`view` int NULL,
	`like` int NULL,
	PRIMARY KEY (`id`),
	CONSTRAINT `fk_boards_user_id`
		FOREIGN KEY (`user_id`)
		REFERENCES `users` (`id`) ON UPDATE CASCADE,
	CONSTRAINT `fk_boards_quotation_id`
		FOREIGN KEY (`quotation_id`)
		REFERENCES `quotation` (`id`) ON UPDATE CASCADE
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- 게시글 좋아요 테이블

CREATE TABLE `boards_like` (
	`user_id` UUID NOT NULL,
	`board_id` int NOT NULL,
	PRIMARY KEY (`user_id`, `board_id`),
	CONSTRAINT `fk_boards_like_user_id`
		FOREIGN KEY (`user_id`)
		REFERENCES `users` (`id`) ON UPDATE CASCADE,
	CONSTRAINT `fk_boards_like_board_id`
		FOREIGN KEY (`board_id`)
		REFERENCES `boards` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- 댓글 테이블

CREATE TABLE `comments` (
	`id` int NOT NULL AUTO_INCREMENT,
	`board_id` int NOT NULL,
	`user_id` UUID NOT NULL COMMENT '작성자',
	`contents` varchar(100) NOT NULL,
	`create_date` date NOT NULL,
	`status` tinyint NOT NULL COMMENT '0:일반, 1: 삭제',
	PRIMARY KEY (`id`),
	CONSTRAINT `fk_comments_board_id`
		FOREIGN KEY (`board_id`)
		REFERENCES `boards` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT `fk_comments_user_id`
		FOREIGN KEY (`user_id`)
		REFERENCES `users` (`id`) ON UPDATE CASCADE
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;