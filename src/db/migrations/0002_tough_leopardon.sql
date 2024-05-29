CREATE TABLE `user_bookmarks` (
	`bookmark_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`poll_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`poll_id`) REFERENCES `poll`(`poll_id`) ON UPDATE no action ON DELETE no action
);
