delete from skillcloud.notifications where project_id = "03733624";
delete from skillcloud.projects where project_id = "03733624";
-- delete from skillcloud.ineligible where role_id = "06706313";
UPDATE `skillcloud`.`users`
SET
`availability` = "Open",
`current_project` = null
WHERE current_project = "03733624";
delete from skillcloud.roles where project_id = "03733624";

