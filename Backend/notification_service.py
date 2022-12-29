from datetime import date
from db_connect import connect_db
import json

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
            val = {"type": msg[0], "project_author": msg[1], "user_notified": msg[2], "project_id": msg[3], "date_created": msg[4], "status": msg[5], "role_id": msg[7]}
            msg_json.append(val)
    mydb.commit()

    sql = "SELECT * FROM notifications WHERE project_author = %s && status != 'pending'"
    cursor.execute(sql, (user_email, ))
    row = cursor.fetchall()
    if row == None:
        return {"Status Code": 404, "Message": "Error! No notifications found."}
    else:
        for msg in row:
            val = {"type": msg[0], "project_author": msg[1], "user_notified": msg[2], "project_id": msg[3], "date_created": msg[4], "status": msg[5]}
            msg_json.append(val)
    mydb.commit()
    return {"Status Code": 200, "result": msg_json}

def create_role_notifications(candidates, project):
    project = str(project).replace("'", '"')
    new = json.loads(project)
    roles = new["roles"]
    try:
        for role in roles:
            notify_invite_project(candidates, role, new["author"], new["id"])
        return 200
    except Exception as e:
        return 404

def notify_invite_project(candidates, role, project_author, project_id):
    cursor = mydb.cursor()
    try:
        for key, val in candidates.items():
            sql = "SELECT * FROM notifications WHERE user_notified = %s && project_id = %s"
            cursor.execute(sql, (key, project_id)) 
            row = cursor.fetchall()
            if len(row) < 1:
                sql = "INSERT INTO notifications (type, project_author, user_notified, project_id, date_created, status, role_id) VALUES (%s, %s, %s, %s, %s, %s, %s)"
                cursor.execute(sql, ("project_invite", project_author, key, project_id, str(date.today()), "pending", role['role_id']))
                mydb.commit()
            return 200
    except Exception as e:
        return 404

def notify_response_project(user_email, role_id, response):
    cursor = mydb.cursor()
    try :
        sql = "UPDATE notifications SET status = %s WHERE user_notified = %s && role_id = %s"
        cursor.execute(sql, (response, user_email, role_id))
        mydb.commit()
        sql = "SELECT roles.role_no_needed, roles.roles_filled FROM roles WHERE role_id = %s"
        cursor.execute(sql, (role_id, ))
        row = cursor.fetchone()
        if response == "accepted" and row[1] < row[0]:
            sql = "UPDATE roles SET roles_filled = %s WHERE role_id = %s"
            val = int(row[1]) + 1
            cursor.execute(sql, (str(val), role_id))
            mydb.commit()
        elif response == "declined" and row[1] > 0:
            sql = "UPDATE roles SET role_no_needed = %s WHERE role_id = %s"
            val = int(row[1]) - 1
            cursor.execute(sql, (str(val), role_id))
            mydb.commit()
        return 200
    except Exception as e:
        return 404

def notify_project_role_change(project_author, user_email, project_id, response):
    cursor = mydb.cursor()
    updated_users = []
    try :
        sql = "SELECT ineligible_users FROM notifications WHERE project_author = %s && project_id = %s"
        cursor.execute(sql, (project_author, project_id))
        ineligible_users = cursor.fetchone()
        for val in ineligible_users:
            if val is None:
                updated_users.append(val)
        if response == "add":   
            for val in updated_users:
                if val == user_email:
                    updated_users.remove(user_email)
        if response == "remove":
            updated_users.append(user_email)
        new = " ".join(updated_users)
        sql = "UPDATE notifications SET ineligible_users = %s WHERE project_author = %s && project_id = %s"
        cursor.execute(sql, (str(tuple(updated_users)), project_author, project_id))
        mydb.commit()
        return {"Status Code": 200, "Message": "Notification updated successfully."}
    except Exception as e:
        return {"Status Code": 404, "Message": "Error! Notification not updated."}