from datetime import date
from db_connect import connect_db
import json

mydb = connect_db()

def get_notifications(user_email):
    cursor = mydb.cursor()
    sql = "SELECT * FROM notifications WHERE user_notified = %s"
    cursor.execute(sql, (user_email, ))
    row = cursor.fetchall()
    if row == None:
        return {"Status Code": 404, "Message": "Error! No notifications found."}
    else:
        msg_json = []
        for msg in row:
            val = {"type": msg[0], "project_author": msg[1], "user_notified": msg[2], "project_id": msg[3], "date_created": msg[4], "status": msg[5]}
            msg_json.append(val)
        return {"Status Code": 200, "result": msg_json}
            
# project = '{"roles": [{"role_category": "Information and communications technology", "role_title": "Software Developer", "role_desc": "Software Developer who likes kubernetes", "role_no_needed": "1"}], "project_author": "sullivanlouis0@gmail.com", "project_title": "Another test", "project_startdate": "2022-11-03", "project_enddate": "2022-11-30", "project_summary": "Making another test project", "project_id: "01766992"}'
project = {"project_author": "sullivanlouis0@gmail.com", "project_title": "Another test", "project_startdate": "2022-11-03", "project_id": "01766993"}
candidates = {"louis@gmail.com":"20%"}
def notify_invite_project(candidates, project):
    # project_notify - type, project_author, user_notified, project_id, date_created, status
    cursor = mydb.cursor()
    for key, val in candidates.items():
        print(project["project_id"])
        sql = "SELECT * FROM notifications WHERE user_notified = %s && project_id = %s"
        cursor.execute(sql, (key, project["project_id"]))
        row = cursor.fetchall()
        if len(row) < 1:
            sql = "INSERT INTO notifications (type, project_author, user_notified, project_id, date_created, status) VALUES (%s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, ("project_invite", project["project_author"], key, project["project_id"], str(date.today()), "pending"))
            mydb.commit()
            
def notify_response_project(user_email, project_id, response):
    cursor = mydb.cursor()
    sql = "UPDATE notifications SET status = %s WHERE user_notified = %s && project_id = %s"
    cursor.execute(sql, (response, user_email, project_id))
    mydb.commit()
            
        
        
# notify_invite_project(candidates, project)
# notify_response_project("louis@gmail.com", "01766992", "accepted")
# print(get_notifications("louis@gmail.com"))