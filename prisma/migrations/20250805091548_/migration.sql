-- CreateTable
CREATE TABLE `courses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NULL,
    `date` VARCHAR(191) NOT NULL,
    `start_time` VARCHAR(191) NOT NULL,
    `end_time` VARCHAR(191) NOT NULL,
    `teacher_id` INTEGER NOT NULL,
    `total_rez` SMALLINT UNSIGNED NOT NULL,
    `baseline_rez` INTEGER NOT NULL DEFAULT 2,
    `point` INTEGER NOT NULL DEFAULT 10,
    `price` INTEGER NOT NULL DEFAULT 250,
    `isOpen` BOOLEAN NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `courses_teacher_id_idx`(`teacher_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `plan_name` VARCHAR(191) NOT NULL,
    `plan_value` INTEGER NOT NULL,
    `state` ENUM('SUCCESS', 'PENDING', 'CANCEL') NOT NULL DEFAULT 'SUCCESS',
    `category` ENUM('POINT', 'SINGLE') NOT NULL DEFAULT 'POINT',
    `point_balance` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `reservations_user_id_idx`(`user_id`),
    UNIQUE INDEX `reservations_course_id_user_id_key`(`course_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serial_number` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `role` ENUM('ADMIN', 'EDITOR', 'TEACHER', 'STUDENT') NOT NULL DEFAULT 'STUDENT',
    `point` INTEGER NOT NULL DEFAULT 0,
    `point_deadline` DATETIME(3) NULL,
    `schedule_service` VARCHAR(191) NULL DEFAULT '',
    `email_varified` BOOLEAN NOT NULL DEFAULT false,
    `gender` ENUM('MALE', 'FEMALE', 'UNKNOW') NOT NULL DEFAULT 'UNKNOW',
    `birth` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `medical` VARCHAR(191) NULL,
    `em_name` VARCHAR(191) NULL,
    `em_relation` VARCHAR(191) NULL,
    `em_phone` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `note` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacher_id` INTEGER NOT NULL,
    `rule` ENUM('SOLID', 'DYNAMIC') NULL,
    `solid_price` INTEGER NOT NULL DEFAULT 0,
    `dynamic_baseline_price` INTEGER NOT NULL DEFAULT 0,
    `dynamic_add_price` INTEGER NOT NULL DEFAULT 0,
    `pay_method` VARCHAR(191) NULL,
    `pay_account` VARCHAR(191) NULL,
    `unPayMonth` VARCHAR(191) NULL,
    `created_month` VARCHAR(191) NULL,

    UNIQUE INDEX `salary_teacher_id_key`(`teacher_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salary_old_record` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `salaryTeacher_id` INTEGER NULL,
    `rule` ENUM('SOLID', 'DYNAMIC') NULL,
    `solid_price` INTEGER NOT NULL DEFAULT 0,
    `dynamic_baseline_price` INTEGER NOT NULL DEFAULT 0,
    `dynamic_add_price` INTEGER NOT NULL DEFAULT 0,
    `pay_method` VARCHAR(191) NULL,
    `pay_account` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `due_to` VARCHAR(191) NOT NULL,
    `userId` INTEGER NULL,

    INDEX `salary_old_record_salaryTeacher_id_idx`(`salaryTeacher_id`),
    INDEX `salary_old_record_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `discounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `point_discount` VARCHAR(191) NULL,
    `price_discount` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_discounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `discount_id` INTEGER NOT NULL,
    `course_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `user_discounts_user_id_idx`(`user_id`),
    INDEX `user_discounts_discount_id_idx`(`discount_id`),
    INDEX `user_discounts_course_id_idx`(`course_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cancel_log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `stateTo` VARCHAR(191) NOT NULL,
    `returnPoint` INTEGER NOT NULL DEFAULT 0,
    `point_balance` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `cancel_log_course_id_idx`(`course_id`),
    INDEX `cancel_log_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `course_id` INTEGER NULL,
    `description` VARCHAR(191) NULL,
    `receive_date` VARCHAR(191) NULL,
    `receive_price` INTEGER NULL,
    `receive_account` VARCHAR(191) NULL,
    `receive_note` VARCHAR(191) NULL,
    `state` ENUM('SUCCESS', 'PENDING', 'CHECKING', 'CANCEL', 'ERROR') NOT NULL DEFAULT 'PENDING',
    `category` ENUM('POINT', 'SINGLE') NOT NULL DEFAULT 'POINT',
    `point_balance` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `payment_course_id_idx`(`course_id`),
    INDEX `payment_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
