from datetime import date
from db_connect import connect_db
import json

from match_event import event_match
from project import Project
from notification_service import *
mydb = connect_db()

def notify_response_project(user_email, role_id, req):
    try:
        cursor = mydb.cursor()
        sql = "SELECT roles.role_no_needed, roles.roles_filled FROM roles WHERE role_id = %s"
        cursor.execute(sql, (role_id, ))
        row = cursor.fetchone()
        if req == "accepted" and int(row[1]) < int(row[0]):
            print("here")
            sql = "UPDATE roles SET roles_filled = %s WHERE role_id = %s"
            val = int(row[1]) + 1
            cursor.execute(sql, (str(val), role_id))
            mydb.commit()
            sql = "DELETE FROM ineligible WHERE user_email = %s"
            cursor.execute(sql, (user_email, ))
            mydb.commit()
            sql = "UPDATE notifications SET status = %s WHERE user_notified = %s && role_id = %s"
            cursor.execute(sql, (req, user_email, role_id))
            mydb.commit()
        elif req == "declined":
            if int(row[1]) == 0:
                val = 0
            else:
                val = int(row[1]) - 1
            sql = "UPDATE roles SET roles_filled = %s WHERE role_id = %s"
            cursor.execute(sql, (str(val), role_id))
            mydb.commit()
            sql = "INSERT INTO ineligible (user_email, role_id) VALUES (%s, %s)"
            cursor.execute(sql, (user_email, role_id))
            mydb.commit()
            sql = "SELECT roles.role_no_needed, roles.roles_filled FROM roles WHERE role_id = %s"
            cursor.execute(sql, (role_id, ))
            total = cursor.fetchone()
            total_needed = int(total[0]) - int(total[1])
            if total_needed > 0:
                sql = "SELECT roles.project_id FROM roles WHERE role_id = %s"
                cursor.execute(sql, (role_id, ))
                row = cursor.fetchone()
                project_id = str(row[0])
                p1 = Project()
                p1.get_project(project_id)
                project_json = p1.get_project_json()
                candidates = event_match(project_json)
                create_role_notifications(candidates, project_json)
            sql = "UPDATE notifications SET status = %s WHERE user_notified = %s && role_id = %s"
            cursor.execute(sql, (req, user_email, role_id))
            mydb.commit()
        return 200
    except Exception as e:
        print(e)
        return 404


print(notify_response_project("timmy@gmail.com", "01334698", "accepted"))

# candidates = {'billy@gmail.com': 19.38, 'timmy@gmail.com': 5.866}
# role = {
#     "role_category" : "Other",
#     "role_title" : "Host",
#     "role_desc" : "Need host with time spent in presenting news on a weekly basis. Degree in journalism preferred but not required. Preferred area in technology but also not required",
#     "role_no_needed" : "2",
#     "role_id" : "00550596",
#     "role_filled" : "1"
# }
# project_author = "louis@gmail.com"
# project_id = "05847316"
# print(notify_invite_project(candidates, role, project_author, project_id))
