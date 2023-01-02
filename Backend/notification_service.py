from datetime import date
from db_connect import connect_db
import json

from match_event import event_match
from project import Project

mydb = connect_db()

def get_notifications(user_email):
    cursor = mydb.cursor()
    msg_json = []
    sql = "SELECT * FROM notifications WHERE user_notified = %s && status = 'pending'"
    cursor.execute(sql, (user_email, ))
    row = cursor.fetchall()
    if row == None:
        return {"Status Code": 404, "Message": "Error! No notifications found."}
    else:
        for msg in row:
            val = {"type": msg[0], "project_author": msg[1], "user_notified": msg[2], "project_id": msg[3], "date_created": msg[4], "status": msg[5], "role_id": msg[6]}
            msg_json.append(val)
    sql = "SELECT * FROM notifications WHERE project_author = %s && (status != 'pending' || type = 'project_role_wait')"
    cursor.execute(sql, (user_email, ))
    row = cursor.fetchall()
    if row == None:
        return {"Status Code": 404, "Message": "Error! No notifications found."}
    else:
        for msg in row:
            val = {"type": msg[0], "project_author": msg[1], "user_notified": msg[2], "project_id": msg[3], "date_created": msg[4], "status": msg[5], "role_id": msg[6]}
            sql = "SELECT roles.role_title FROM roles WHERE role_id = %s"
            cursor.execute(sql, (msg[6], ))
            row = cursor.fetchall()
            if len(row) > 0:
                val["roles_title"] = row[0][0]
            msg_json.append(val)
    mydb.commit()
    return {"Status Code": 200, "result": msg_json}

def no_candidates_notifications(project, role):
    try :
        project = str(project).replace("'", '"')
        project = json.loads(project)
        print(project)
        role = str(role).replace("'", '"')
        role = json.loads(role)
        cursor = mydb.cursor()
        sql = "SELECT * FROM notifications WHERE project_author = %s && type = 'project_role_wait'"
        cursor.execute(sql, (project["author"], ))
        row = cursor.fetchall()
        if len(row) < 1:
            sql = "INSERT INTO notifications (type, project_author, user_notified, project_id, date_created, status, role_id) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, ("project_role_wait", project["author"], None, project["id"], str(date.today()), "pending", role['role_id']))
            mydb.commit()
        return 200
    except Exception as e:
        print(e)
        return 404

def create_role_notifications(project):
    project = str(project).replace("'", '"')
    new = json.loads(project)
    roles = new["roles"]
    for role in roles:
        candidates = event_match(role)
        print(candidates)
        if len(candidates) < 1:
            no_candidates_notifications(project, role)
        else:
            notify_invite_project(candidates, role, new["author"], new["id"])
    return 200

def notify_invite_project(candidates, role, project_author, project_id):
    try:
        cursor = mydb.cursor()
        total_needed = int(role["role_no_needed"]) - int(role["role_filled"])
        candidates_needed = {}
        if total_needed < 0:
            total_needed = 0
        for key, val in candidates.items():
            if len(candidates_needed) >= total_needed:
                break
            candidates_needed[key] = val
        for key, val in candidates_needed.items():
            sql = "SELECT * FROM notifications WHERE user_notified = %s && role_id = %s"
            cursor.execute(sql, (key, role['role_id'])) 
            row = cursor.fetchall()
            if len(row) < 1:
                sql = "INSERT INTO notifications (type, project_author, user_notified, project_id, date_created, status, role_id) VALUES (%s, %s, %s, %s, %s, %s, %s)"
                cursor.execute(sql, ("project_invite", project_author, key, project_id, str(date.today()), "pending", role['role_id']))
                mydb.commit()
        return 200
    except Exception as e:
        print(e)
        return 404

def notify_response_project(user_email, role_id, req):
    try:
        cursor = mydb.cursor()
        sql = "SELECT roles.role_no_needed, roles.roles_filled FROM roles WHERE role_id = %s"
        cursor.execute(sql, (role_id, ))
        row = cursor.fetchone()
        if req == "accepted" and int(row[1]) < int(row[0]):
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
            sql = "UPDATE users SET availability = %s WHERE email = %s"
            cursor.execute(sql, ("Closed", user_email))
            mydb.commit()
        elif req == "declined":
            if int(row[1]) == 0 or int(row[1]) < 0:
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
                create_role_notifications(project_json)
            sql = "UPDATE notifications SET status = %s WHERE user_notified = %s && role_id = %s"
            cursor.execute(sql, (req, user_email, role_id))
            mydb.commit()
            sql = "UPDATE users SET availability = %s WHERE email = %s"
            cursor.execute(sql, ("Open", user_email))
            mydb.commit()
        else:
            sql = "DELETE FROM notifications WHERE user_notified = %s && role_id = %s"
            cursor.execute(sql, (user_email, role_id))
            mydb.commit()
            sql = "UPDATE users SET availability = %s WHERE email = %s"
            cursor.execute(sql, ("Open", user_email))
            mydb.commit()
            return 403
        return 200
    except Exception as e:
        print(e)
        return 404

def notify_role_change(user_email, role_id, req):
    cursor = mydb.cursor()
    sql = "SELECT roles.role_no_needed, roles.roles_filled FROM roles WHERE role_id = %s"
    cursor.execute(sql, (role_id, ))
    row = cursor.fetchone()
    try:
        cursor = mydb.cursor()
        if req == "add" and int(row[1]) < int(row[0]):
            sql = "DELETE FROM ineligible WHERE user_email = %s"
            cursor.execute(sql, (user_email, ))
            mydb.commit()
            sql = "UPDATE notifications SET status = %s WHERE role_id = %s && user_notified = %s"
            cursor.execute(sql, ("accepted", role_id, user_email))
            mydb.commit()
            sql = "UPDATE roles SET roles_filled = %s WHERE role_id = %s"
            val = int(row[1]) + 1
            cursor.execute(sql, (str(val), role_id))
            mydb.commit()
            sql = "UPDATE users SET availability = %s WHERE email = %s"
            cursor.execute(sql, ("Closed", user_email))
            mydb.commit()
        elif req == "remove":
            if int(row[1]) == 0:
                val = 0
            else:
                val = int(row[1]) - 1
            sql = "INSERT INTO ineligible (user_email, role_id) VALUES (%s, %s)"
            cursor.execute(sql, (user_email, role_id))
            mydb.commit()
            sql = "UPDATE notifications SET status = %s WHERE role_id = %s && user_notified = %s"
            cursor.execute(sql, ("declined", role_id, user_email))
            mydb.commit()
            sql = "UPDATE roles SET roles_filled = %s WHERE role_id = %s"
            cursor.execute(sql, (str(val), role_id))
            mydb.commit()
            sql = "UPDATE users SET availability = %s WHERE email = %s"
            cursor.execute(sql, ("Open", user_email))
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
                create_role_notifications(project_json)
        return 200
    except Exception as e:
        print(e)
        return 404

# project_json = {
#     "id" : "11111111",
#     "title" : "Tech News Youtube Channel",
#     "author" : "louis@gmail.com",
#     "create_date" : "2022-12-29",
#     "start_date" : "2023-01-01",
#     "end_date" : "2023-04-30",
#     "summary" : "Need a host to present tech news on a youtube channel",
#     "state" : "Open",
#     "roles" : [
#         {
#             "role_category" : "Food preparation",
#             "role_title" : "Host",
#             "role_desc" : "Need host with time spent in presenting news on a weekly basis. Degree in journalism preferred but not required. Preferred area in technology but also not required",
#             "role_no_needed" : "1",
#             "role_id" : "1231231",
#             "role_filled" : "0"
#         }
#     ]
# }

# print(create_role_notifications(project_json))