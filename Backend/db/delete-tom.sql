DELETE FROM notifications WHERE project_author = "tom@gmail.com";
UPDATE `skillcloud`.`notifications` SET
`type` = "project_role_wait",
`user_notified` = null,
`status` = "pending"
WHERE `user_notified` = "tom@gmail.com";
DELETE FROM ineligible WHERE user_email = "tom@gmail.com";
DELETE FROM user_education WHERE user_email = "tom@gmail.com";
DELETE FROM user_experience WHERE user_email = "tom@gmail.com";
DELETE FROM users WHERE email = "tom@gmail.com";
