from db_connect import connect_db
from datetime import date

mydb = connect_db()

def response_apply_project(email, user_notified, role_id, response):
    cursor = mydb.cursor()
    try:
        if response == "accepted":
            sql = "SELECT role_no_needed, roles_filled, project_id FROM roles WHERE role_id = %s"
            cursor.execute(sql, (role_id, ))
            res = cursor.fetchall()
            if len(res) > 0:
                roles_available = int(res[0][0]) - int(res[0][1])
                if roles_available > 0:
                    project_id = res[0][2]
                    if len(res) > 0:
                        print("Role(s) available: ", roles_available)
                        sql = "UPDATE notifications SET status = %s WHERE type = %s AND user_notified = %s AND role_id = %s"
                        cursor.execute(sql, ("accepted", "project_apply", user_notified, role_id))
                        mydb.commit()
                        sql = "UPDATE roles SET roles_filled = roles_filled + 1 WHERE role_id = %s"
                        cursor.execute(sql, (role_id, ))
                        mydb.commit()
                        sql = "UPDATE users SET current_project = %s, availability = %s WHERE email = %s"
                        cursor.execute(sql, (project_id, "Closed", email))
                        mydb.commit()
                        sql = "SELECT role_no_needed, roles_filled FROM roles WHERE role_id = %s"
                        cursor.execute(sql, (role_id, ))
                        res = cursor.fetchall()
                        roles_available = int(res[0][0]) - int(res[0][1])
                        if roles_available < 1:
                            sql = "DELETE FROM notifications WHERE status = %s AND role_id = %s"
                            cursor.execute(sql, ("pending", role_id))
                            mydb.commit()
                        return 200
        elif response == "declined":
            sql = "UPDATE notifications SET status = %s WHERE type = %s AND user_notified = %s AND role_id = %s"
            cursor.execute(sql, ("declined", "project_apply", user_notified, role_id))
            mydb.commit()
            return 200
        else:
            print("Error with response"), response
    except Exception as e:
        print(e)
        return 404




# print(response_apply_project("sullivanlouis0@gmail.com", "sullivanlouis0@gmail.com", "09344075", "declined"))

def apply_project(email, role_id):
    cursor = mydb.cursor()
    sql = "SELECT role_no_needed, roles_filled, project_id FROM roles WHERE role_id = %s"
    cursor.execute(sql, (role_id, ))
    res = cursor.fetchall()
    if len(res) > 0:
        roles_available = int(res[0][0]) - int(res[0][1])
        if roles_available > 0:
            project_id = res[0][2]
            sql = "SELECT project_author FROM projects WHERE project_id = %s"
            cursor.execute(sql, (project_id, ))
            res = cursor.fetchall()
            if len(res) > 0:
                project_author = res[0][0]
                print("Role(s) available: ", roles_available)
                sql = "INSERT INTO notifications (type, project_author, user_notified, project_id, date_created, status, role_id) VALUES (%s, %s, %s, %s, %s, %s, %s)"
                cursor.execute(sql, ("project_apply", project_author, email, project_id, str(date.today()), "pending", role_id))
                mydb.commit()
            return 200

# print(apply_project("sullivanlouis0@gmail.com", "09344075"))

"""
Apply button on project page
Clicked takes you to form that asks for what role you want to apply for
Submit send request to backend endpoint applyproject
Check if project role is available
create notification for project owner that contains user email and role they applied for
Notification on frontend should have accept and decline buttons, display user profile link and the role name on which project
accept = add user to project role, reduce number of available roles, delete apply notification, if it was the final place for role, delete role notification for other users
decline = delete apply notification, notify user that they have been declined
"""