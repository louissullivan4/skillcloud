from db_connect import connect_db

mydb = connect_db()

def apply_project(email, role_id):
    cursor = mydb.cursor()
    sql = "SELECT role_no_needed, role_filled FROM roles WHERE role_id = %s"
    val = (role_id,)
    res = cursor.fetchall(sql, val)
    if len(res) > 0:
        print(res[0][0], res[0][1])
        if (res[0][0] - res[0][1]) > 0:
            print("Role available")
    return "You have applied for the project"

print(apply_project("sullivanlouis0@gmail.com", "00240535"))
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