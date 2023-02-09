from db_connect import connect_db

mydb = connect_db()

def leave_project(email, project_id):    
        cursor = mydb.cursor()
        sql = "SELECT role_id FROM notifications WHERE user_notified = %s AND project_id = %s AND status = 'accepted'"
        val = (email, project_id)
        cursor.execute(sql, val)
        role_id = cursor.fetchone()
        if role_id is None:
            return "You are not a member of this project"
        else:
            sql = "UPDATE notifications SET status = 'pending', user_notified = null, type = 'project_role_wait' WHERE role_id = %s"
            val = (role_id[0],)
            cursor.execute(sql, val)
            mydb.commit()
            sql = "UPDATE roles SET roles_filled = roles_filled - 1 WHERE role_id = %s"
            val = (role_id[0],)
            cursor.execute(sql, val)
            mydb.commit()
            sql = "UPDATE users SET current_project = null, availability = 'Open' WHERE email = %s"
            val = (email,)
            cursor.execute(sql, val)
            mydb.commit()
            return "You have left the project"


# print(leave_project("john@gmail.com", "06914814"))

            

           


        

# print(get_previous_projects("john@gmail.com"))