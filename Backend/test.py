from datetime import date
from db_connect import connect_db

mydb = connect_db()
project = '{"roles": [{"role_category": "Information and communications technology", "role_title": "Software Developer", "role_desc": "Software Developer who likes kubernetes", "role_no_needed": "1"}], "project_author": "sullivanlouis0@gmail.com", "project_title": "Another test", "project_startdate": "2022-11-03", "project_enddate": "2022-11-30", "project_summary": "Making another test project"}'
candidates = {"louis@gmail.com":"20%"}
def notify_user(candidates, project):
    notification_type = "project_inv"
    date_created = project["project_startdate"]
    project_id = project["project_id"]
    read = False
    status = "pending"
    cursor = mydb.cursor()
    for key, val in candidates.items():
        sql = "SELECT * FROM notifications WHERE user_email = %s)"
        cursor.execute(sql, (key, ))
        row = cursor.fetchall()
        if len(row) > 0:
            

        sql = "INSERT INTO notifications (user_email, notification_type, data_created, project_id, read, status) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(sql, (key, notification_type, date_created, project_id, read, status))
        mydb.commit()



notify_user(candidates, project)
