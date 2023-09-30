-- 데이터 베이스 생성

CREATE DATABASE IF NOT EXISTS s09p22c105;
USE s09p22c105;

-- 테이블 삭제(순서 중요)

DROP TABLE IF EXISTS `boards_like`;
DROP TABLE IF EXISTS `comments`;
DROP TABLE IF EXISTS `boards_image`;
DROP TABLE IF EXISTS `boards`;
DROP TABLE IF EXISTS `part_bookmark`;
DROP TABLE IF EXISTS `quotation`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `requirements`;
DROP TABLE IF EXISTS `programs`;
DROP TABLE IF EXISTS `cpu`;
DROP TABLE IF EXISTS `gpu`;
DROP TABLE IF EXISTS `mainboard_pci`;
DROP TABLE IF EXISTS `mainboard`;
DROP TABLE IF EXISTS `ram`;
DROP TABLE IF EXISTS `hdd`;
DROP TABLE IF EXISTS `case`;
DROP TABLE IF EXISTS `cooler`;
DROP TABLE IF EXISTS `ssd`;
DROP TABLE IF EXISTS `power`;

-- 사용자 테이블

CREATE TABLE `users` (
	`id` int NOT NULL AUTO_INCREMENT,
	`login_id` varchar(20) NOT NULL UNIQUE,
	`password` varchar(100) NOT NULL,
	`nickname` varchar(20) NOT NULL UNIQUE,
	`roles` varchar(10) NOT NULL DEFAULT 'USER',
	`state` tinyint NOT NULL DEFAULT 0 COMMENT '0:일반, 1: 탈퇴',
	PRIMARY KEY (`id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- 부품 북마크 테이블

CREATE TABLE `part_bookmark` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int NOT NULL,
	`pid` tinyint NOT NULL COMMENT '0:CPU, 1:메인보드, 2:메모리, 3:그래픽카드, 4:SSD, 5:HDD, 6: 케이스, 7: 파워, 8:쿨러',
	`part_id` int NOT NULL,
    `create_date_time` datetime NOT NULL DEFAULT now(),
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
	`user_id` int NULL,
	`cpu_id` int NULL,
	`power_id` int NULL,
	`mainboard_id` int NULL,
	`ram_id` int NULL,
	`graphic_id` int NULL,
	`hdd_id` int NULL,
	`ssd_id` int NULL,
	`case_id` int NULL,
	`cooler_id` int NULL,
	`name` varchar(100) NOT NULL,
	`create_date_time` datetime NOT NULL DEFAULT now(),
	`state` int NOT NULL DEFAULT 0 COMMENT '비트 마스킹',
	PRIMARY KEY (`id`)
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- 게시판 테이블

CREATE TABLE `boards` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int NOT NULL,
	`quotation_id` int NULL,
	`title` varchar(100) NOT NULL,
	`contents` varchar(1000) NOT NULL,
	`create_date_time` datetime NOT NULL DEFAULT now(),
	`status` tinyint NOT NULL DEFAULT 0 COMMENT '0:일반, 1: 삭제',
	`view` int NULL DEFAULT 0,
	`like_cnt` int NULL DEFAULT 0,
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

-- 게시판 이미지 테이블

CREATE TABLE `boards_image` (
    `id` int NOT NULL AUTO_INCREMENT,
    `board_id` int NOT NULL,
    `image_path` varchar(1000) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_boards_image_board_id`
        FOREIGN KEY (`board_id`)
        REFERENCES `boards` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- 게시글 좋아요 테이블

CREATE TABLE `boards_like` (
	`user_id` int NOT NULL,
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
	`user_id` int NOT NULL,
	`contents` varchar(100) NOT NULL,
	`create_date_time` datetime NOT NULL DEFAULT now(),
	`status` tinyint NOT NULL DEFAULT 0 COMMENT '0:일반, 1: 삭제',
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

-- CPU 테이블

CREATE TABLE `cpu` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(200) NOT NULL,
	`price` int NULL,
	`link` varchar(500) NOT NULL,
	`company` varchar(30) NOT NULL,
	`product_seq` int NOT NULL,
	`image` varchar(500) NULL COMMENT '이미지 링크',
	`code` varchar(30) NULL,
	`socket` varchar(30) NOT NULL COMMENT '호환성',
	`core_number` int NULL,
	`thread_number` int NULL,
	`l2_cache` int NULL COMMENT '단위: MB',
	`l3_cache` int NULL COMMENT '단위: MB',
	`tdp` int NULL COMMENT '발열관련 표시단위 : W',
	`pbpmtp` int NULL COMMENT '단위: W',
	`has_graphic` tinyint NULL COMMENT '0: 없음, 1: 있음',
	`graphic_name` varchar(100) NULL,
	`graphic_core_speed` int NULL COMMENT '단위: MHz',
	`memory_capacity` int NULL COMMENT '단위: GB',
	`memory_type` int NULL COMMENT '호환성, 비트마스킹',
	`memory_clock` int NULL COMMENT '단위:MHz',
	`memory_channel` int NULL,
	`pcie_version` int NULL COMMENT '호환성, 비트마스킹',
	`pcie_channel_number` int NULL,
	`has_cooler` tinyint NULL COMMENT '0: 없음, 1: 있음',
	`clock_basic` float NULL COMMENT '단위: GHz',
	`clock_max` float NULL COMMENT '단위: GHz',
	`nm` int NULL COMMENT '단위: nm',
	`tech_support` varchar(100) NULL,
	`bench_mark` int NULL,
	`reg_date` int NULL COMMENT 'yyyymm',
	`bookmark` int NULL DEFAULT 0,
	PRIMARY KEY (`id`)
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- 그래픽카드 테이블

CREATE TABLE `gpu` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(200) NOT NULL,
	`price` int NULL,
	`link` varchar(500) NOT NULL,
	`company` varchar(30) NOT NULL,
	`product_seq` int NOT NULL,
	`image` varchar(500) NULL COMMENT '이미지 링크',
	`chipset_company` varchar(30) NULL,
	`chipset` varchar(30) NOT NULL,
	`nm` int NULL COMMENT '단위: nm',
	`base_clock` int NULL COMMENT '단위: MHz',
	`boost_clock` int NULL COMMENT '단위: MHz',
	`cuda_processor` int NULL COMMENT '단위: 개',
	`stream_processor` int NULL COMMENT '단위: 개',
	`interface` varchar(30) NULL COMMENT '호환성',
	`memory_type` varchar(20) NULL,
	`memory_capacity` float NULL COMMENT '단위: GB',
	`memory_clock` int NULL COMMENT '단위: MHz',
	`memory_bus` int NULL COMMENT '단위: bit',
	`port` int NULL COMMENT '비트마스킹',
	`monitor_support` int NULL COMMENT '단위: 최대 n개',
	`additional_function` int NULL COMMENT '비트마스킹',
	`usage_power` int NULL COMMENT '단위: 최대 nW',
	`recommend_power` int NULL COMMENT '호환성, 단위: W',
	`cooling_type` int NULL COMMENT '비트마스킹',
	`pan_number` tinyint NULL COMMENT '단위: 개',
	`length` float NULL COMMENT '호환성, 단위: mm',
	`thickness` float NULL COMMENT '단위: mm',
	`pin` char(6) NULL COMMENT '6/8/12/16핀 갯수',
	`feature` int NULL COMMENT '비트마스킹',
	`as_years` tinyint NULL COMMENT '단위: 년',
	`bench_mark` int NULL,
	`reg_date` int NULL COMMENT 'yyyymm',
	`bookmark` int NULL DEFAULT 0,
	PRIMARY KEY (`id`)
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- 프로그램 테이블

CREATE TABLE `programs` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	`usage` varchar(50) NOT NULL,
	`image` varchar(500) NULL COMMENT '이미지 링크',
	PRIMARY KEY (`id`)
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- 사양 테이블

CREATE TABLE `requirements` (
	`id` int NOT NULL AUTO_INCREMENT,
	`program_id` int NOT NULL,
	`cpu_id` int NOT NULL,
	`gpu_id` int NOT NULL,
	`ram` float NOT NULL COMMENT 'GB',
	`dx` varchar(120) NULL,
	`storage` float NULL COMMENT 'GB',
	`os` varchar(200) NULL,
	`spec_class` tinyint NOT NULL COMMENT '0: 최소, 1: 권장, 2: 최고',
	PRIMARY KEY (`id`),
	CONSTRAINT `fk_requirements_program_id`
		FOREIGN KEY (`program_id`)
		REFERENCES `programs` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT `fk_requirements_cpu_id`
		FOREIGN KEY (`cpu_id`)
		REFERENCES `cpu` (`id`) ON UPDATE CASCADE,
	CONSTRAINT `fk_requirements_gpu_id`
		FOREIGN KEY (`gpu_id`)
		REFERENCES `gpu` (`id`) ON UPDATE CASCADE
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- 메인보드 테이블

CREATE TABLE `mainboard` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(200) NOT NULL,
	`price` int NULL,
	`link` varchar(500) NOT NULL,
	`company` varchar(30) NOT NULL,
	`product_seq` int NOT NULL,
	`image` varchar(500) NULL COMMENT '이미지 링크',
	`cpu_socket` varchar(30) NOT NULL COMMENT '호환성(CPU)',
	`chipset` varchar(30) NULL,
	`form_factor` varchar(30) NOT NULL COMMENT '호환성(케이스)',
	`memory_type` varchar(30) NOT NULL COMMENT '호환성(램)',
	`memory_number` int NULL COMMENT '호환성(램 개수)',
	`memory_capacity` float NULL COMMENT '단위: GB',
	`xmp` tinyint NULL DEFAULT NULL COMMENT '1: XMP, 2: XMP3.0, 호환성(인텔 램 오버클럭)',
	`expo` tinyint NULL DEFAULT NULL COMMENT '1: EXPO, 호환성(AMD 램 오버클럭)',
	`sata3_number` int NULL COMMENT '호환성(SSD/HDD 개수)',
	`m2_number` int NULL COMMENT '호환성(SSD 개수)',
	`m2_interface` int NULL COMMENT '비트마스킹, 호환성(SSD 인터페이스)',
	`m2_formfactor` int NULL COMMENT '비트마스킹, 호환성(SSD)',
	`pcie_version` int NULL COMMENT '비트마스킹',
	`vga_connection` varchar(30) NULL COMMENT '호환성(그래픽카드 인터페이스)',
	`wireless_lan` int NULL COMMENT '비트마스킹',
	`wired_lan_speed` int NULL COMMENT '단위: 100Mbps',
	`phase` tinyint NULL COMMENT '단위: 개',
	`graphic_output` int NULL COMMENT '비트마스킹, 호환성(모니터)',
	`back_panel` varchar(200) NULL COMMENT '후면단자',
	`io_header` int NULL COMMENT '비트마스킹',
	`feature` int NULL COMMENT '비트마스킹',
	`reg_date` int NULL COMMENT 'yyyymm',
	`bookmark` int NULL DEFAULT 0,
	PRIMARY KEY (`id`)
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- 메인보드 PCI 테이블

CREATE TABLE `mainboard_pci` (
	`id` int NOT NULL AUTO_INCREMENT,
	`mainboard_id` int NOT NULL,
	`pci_type` varchar(30) NOT NULL COMMENT '호환성',
	`pci_number` int NULL,
	PRIMARY KEY (`id`),
	CONSTRAINT `fk_mainboard_pci_mainboard_id`
		FOREIGN KEY (`mainboard_id`)
		REFERENCES `mainboard` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- RAM 테이블

CREATE TABLE `ram` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(200) NOT NULL,
	`price` int NULL,
	`link` varchar(500) NOT NULL,
	`company` varchar(30) NOT NULL,
	`product_seq` int NOT NULL,
	`image` varchar(500) NULL COMMENT '이미지 링크',
	`generation` varchar(10) NULL COMMENT 'DDR',
	`capacity` float NULL COMMENT 'GB',
	`clock` int NULL COMMENT 'MHz',
	`timing` varchar(20) NULL,
	`number` tinyint NULL,
	`ecc` tinyint NULL DEFAULT 0 COMMENT '0: none, 1: ECC, 2: 온다이ECC',
	`xmp` tinyint NULL DEFAULT NULL COMMENT '1: XMP, 2: XMP3.0, 호환성',
	`expo` tinyint NULL DEFAULT NULL COMMENT '1: EXPO, 호환성',
	`heatsink` tinyint NULL DEFAULT 0 COMMENT '0: 미포함, 1: 방열판',
	`heatsink_color` varchar(20) NULL,
	`led` tinyint NULL COMMENT '0: false, 1: true',
	`led_color` varchar(20) NULL,
	`reg_date` int NULL COMMENT 'yyyymm',
	`bookmark` int NULL DEFAULT 0,
	PRIMARY KEY (`id`)
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- 하드디스크 테이블

CREATE TABLE `hdd` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(200) NOT NULL,
	`price` int NULL,
	`link` varchar(500) NOT NULL,
	`company` varchar(30) NOT NULL,
	`product_seq` int NOT NULL,
	`image` varchar(500) NULL COMMENT '이미지 링크',
	`size` double NULL COMMENT 'cm',
	`capacity` int NULL COMMENT 'GB',
	`interface` varchar(30) NOT NULL COMMENT '호환성(메인보드 SATA 슬롯)',
	`rpm` int NULL COMMENT 'RPM',
	`transfer_rate` int NULL COMMENT 'MB/s',
	`buffer_capacity` int NULL COMMENT 'MB',
	`recording_method` tinyint NULL COMMENT '0: CMR, 1: SMR',
	`thickness` float NULL COMMENT 'mm',
	`as_year` int NULL COMMENT '년',
	`reg_date` int NULL COMMENT 'yyyymm',
	`bookmark` int NULL DEFAULT 0,
	PRIMARY KEY (`id`)
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- 케이스 테이블

CREATE TABLE `case` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(200) NULL,
	`price` int NULL,
	`link` varchar(500) NOT NULL,
	`company` varchar(30) NOT NULL,
	`product_seq` int NOT NULL,
	`image` varchar(500) NULL COMMENT '이미지 링크',
	`category` varchar(20) NOT NULL,
	`size` varchar(20) NOT NULL,
	`power_included` varchar(15) NULL,
	`power_support` varchar(30) NULL COMMENT '호환성',
	`board_support` int NOT NULL COMMENT '호환성, 비트마스킹',
	`bay_133` tinyint NULL COMMENT '단위: 개',
	`bay_89` tinyint NULL COMMENT '단위: 개',
	`bay_64` tinyint NULL COMMENT '단위: 개',
	`pci_horizontal` tinyint NULL COMMENT '단위: 개',
	`pci_vertical` tinyint NULL COMMENT '단위: 개',
	`cooling_fan` tinyint NULL COMMENT '총n개',
	`led_fan` tinyint NULL DEFAULT NULL COMMENT '개',
	`front_type` varchar(10) NULL,
	`side_open` varchar(10) NULL,
	`side_type` varchar(10) NULL,
	`back_vent` varchar(30) NULL,
	`front_vent` varchar(30) NULL,
	`top_vent` varchar(30) NULL,
	`bottom_vent` varchar(30) NULL,
	`external_port` int NULL COMMENT '비트마스킹',
	`width` float NULL COMMENT 'mm, 호환성',
	`height` float NULL COMMENT 'mm, 호환성',
	`depth` float NULL COMMENT 'mm, 호환성',
	`gpu_size` int NULL COMMENT 'mm, 호환성',
	`cpu_cooler_size` int NULL COMMENT 'mm, 호환성',
	`power_size` int NULL COMMENT 'mm, 호환성',
	`liquid_cooler` tinyint NULL DEFAULT NULL COMMENT '최대 n열 지원, 호환성',
	`radiator_top` int NULL DEFAULT NULL COMMENT 'mm, 호환성',
	`radiator_front` int NULL DEFAULT NULL COMMENT 'mm, 호환성',
	`radiator_rear` int NULL DEFAULT NULL COMMENT 'mm, 호환성',
	`radiator_side` int NULL DEFAULT NULL COMMENT 'mm, 호환성',
	`feature` int NULL COMMENT '비트마스킹',
	`led_color` varchar(10) NULL,
	`reg_date` int NULL COMMENT 'yyyymm',
	`bookmark` int NULL DEFAULT 0,
	PRIMARY KEY (`id`)
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- 쿨러 테이블

CREATE TABLE `cooler` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(200) NOT NULL,
	`price` int NULL,
	`link` varchar(500) NOT NULL,
	`company` varchar(30) NOT NULL,
	`product_seq` int NOT NULL,
	`image` varchar(500) NULL COMMENT '이미지 링크',
	`category` varchar(30) NULL,
	`cooling_type` tinyint NULL COMMENT '0: 공랭, 1: 수랭',
	`aircool_form` tinyint NULL COMMENT '0:싱글타워, 1:듀얼타워, 2:일반, 3:슬림, 4:서버',
	`tdp` int NULL COMMENT 'W',
	`intel_socket` int NULL COMMENT '비트마스킹',
	`amd_socket` int NULL COMMENT '비트마스킹',
	`fan_size` int NULL COMMENT 'mm',
	`fan_count` tinyint NULL COMMENT '개',
	`airflow` int NULL COMMENT 'CFM',
	`noise` float NULL COMMENT 'dBA',
	`width` float NULL COMMENT 'mm, 호환성',
	`length` float NULL COMMENT 'mm, 호환성',
	`height` float NULL COMMENT 'mm, 호환성',
	`radiator` int NULL COMMENT '열, 호환성',
	`radiator_length` float NULL COMMENT 'mm, 호환성',
	`radiator_tickness` float NULL COMMENT 'mm, 호환성',
	`hose_length` float NULL COMMENT 'mm',
	`feature` int NULL COMMENT '비트마스킹',
	`as_years` int NULL COMMENT '년',
	`reg_date` int NULL COMMENT 'yyyymm',
	`bookmark` int NULL DEFAULT 0,
	PRIMARY KEY (`id`)
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- SSD 테이블

CREATE TABLE `ssd` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(200) NOT NULL,
	`price` int NULL,
	`link` varchar(500) NOT NULL,
	`company` varchar(30) NOT NULL,
	`product_seq` int NOT NULL,
	`image` varchar(500) NULL COMMENT '이미지 링크',
	`form_factor` varchar(30) NOT NULL COMMENT '호환성(메인보드)',
	`interface` varchar(30) NOT NULL COMMENT '호환성(메인보드)',
	`protocol` varchar(20) NULL,
	`volume` int NULL COMMENT 'GB',
	`memory_type` varchar(30) NULL,
	`nand` varchar(10) NULL,
	`ram_mounted` tinyint NULL COMMENT '0: none, 1: DRAM탑재',
	`ram_type` varchar(30) NULL,
	`sequential_read` int NULL COMMENT 'MB/s',
	`sequential_write` int NULL COMMENT 'MB/s',
	`read_iops` int NULL COMMENT 'K',
	`write_iops` int NULL COMMENT 'K',
	`heatsink` tinyint NULL COMMENT '0: 없음, 1: 있음',
	`rgbled` tinyint NULL COMMENT '0: 없음, 1: 있음',
	`as_year` int NULL COMMENT '년',
	`reg_date` int NULL COMMENT 'yyyymm',
	`bookmark` int NULL DEFAULT 0,
	`support_option` int NULL COMMENT '비트마스킹',
	PRIMARY KEY (`id`)
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- 파워 테이블

CREATE TABLE `power` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(200) NOT NULL,
	`price` int NULL,
	`link` varchar(500) NOT NULL,
	`company` varchar(30) NOT NULL,
	`product_seq` int NOT NULL,
	`image` varchar(500) NULL COMMENT '이미지 링크',
	`category` varchar(15) NOT NULL COMMENT '호환성',
	`rated_power` int NULL COMMENT 'W, 호환성',
	`80plus_certification` varchar(30) NULL,
	`eta_certification` varchar(15) NULL,
	`lambda_certification` varchar(15) NULL COMMENT '소음',
	`voltage_fluctuation` float NULL COMMENT '+-n%, 성능, 안정성, 시스템수명',
	`output_method` varchar(10) NULL COMMENT '성능(고성능 글카)',
	`availability` int NULL COMMENT '%, 안정성(고성능 글카, 오버클럭)',
	`pfc_circuit` char(6) NULL,
	`pf_factor` int NULL COMMENT '%',
	`fan_size` int NULL COMMENT 'mm, 소음',
	`fan_number` int NULL COMMENT '소음(0인 경우)',
	`bearing` varchar(20) NULL,
	`output_12v` float NULL COMMENT '단위: A',
	`cable_connection` varchar(10) NULL,
	`depth` int NULL COMMENT 'mm',
	`main_power` varchar(10) NULL COMMENT '핀',
	`sub_power` varchar(20) NULL COMMENT '핀',
	`pcie_16pin` tinyint NULL COMMENT '0: none, 1: 12VHPWR 1개, 2: 12VHPWR 2개, 3: 12V2x6 1개, 호환성',
	`pcie_8pin` tinyint NULL COMMENT '개, 호환성',
	`pcie_6pin` tinyint NULL COMMENT '개, 호환성',
	`sata` tinyint NULL COMMENT '개, 호환성',
	`ide_4` tinyint NULL COMMENT '개, 호환성',
	`rgb_connector` int NULL COMMENT '개',
	`feature` int NULL COMMENT '비트마스킹',
	`inside` int NULL COMMENT '비트마스킹',
	`protection` int NULL COMMENT '비트마스킹',
	`as_years` int NULL COMMENT '년',
	`reg_date` int NULL COMMENT 'yyyymm',
	`bookmark` int NULL DEFAULT 0,
	PRIMARY KEY (`id`)
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;