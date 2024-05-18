CREATE TABLE `plan` (
	`plan_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`create_count` integer NOT NULL,
	`view_count` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_DATE,
	`lastmodified_at` text DEFAULT CURRENT_DATE
);
--> statement-breakpoint
CREATE TABLE `comment` (
	`comment_id` text PRIMARY KEY NOT NULL,
	`poll_id` text,
	`user_id` text,
	`comment` text NOT NULL,
	`created_at` text DEFAULT CURRENT_DATE,
	`lastmodified_at` text DEFAULT CURRENT_DATE,
	FOREIGN KEY (`poll_id`) REFERENCES `poll`(`poll_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `poll` (
	`poll_id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`poll_like` integer NOT NULL,
	`poll_dislike` integer NOT NULL,
	`description` text NOT NULL,
	`created_at` text DEFAULT CURRENT_DATE,
	`lastmodified_at` text DEFAULT CURRENT_DATE,
	`user_id` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_poll_action` (
	`user_poll_action_id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`poll_id` text,
	`created_date` text DEFAULT CURRENT_DATE,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`poll_id`) REFERENCES `poll`(`poll_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`email` text NOT NULL,
	`plan_id` text DEFAULT '1',
	`created_at` text DEFAULT CURRENT_DATE,
	`lastmodified_at` text DEFAULT CURRENT_DATE,
	FOREIGN KEY (`plan_id`) REFERENCES `plan`(`plan_id`) ON UPDATE no action ON DELETE no action
);
