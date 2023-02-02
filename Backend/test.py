from db_connect import connect_db

mydb = connect_db()

def deleteuser(email):
    mycursor = mydb.cursor()
    sql = "DELETE FROM users WHERE email = %s"
    val = (email,)
    mycursor.execute(sql, val)
    mydb.commit()
    sql = "DELETE FROM user_education WHERE user_email = %s"
    val = (email,)
    mycursor.execute(sql, val)
    mydb.commit()
    sql = "DELETE FROM user_experience WHERE user_email = %s"
    val = (email,)
    mycursor.execute(sql, val)
    mydb.commit()
    sql = "SELECT role_id FROM notifications WHERE user_notified = %s and status = 'accepted'"
    val = (email,)
    mycursor.execute(sql, val)
    roles = mycursor.fetchall()
    for role in roles:
        sql = "SELECT roles_filled FROM roles WHERE role_id = %s"
        val = (role[0],)
        mycursor.execute(sql, val)
        roles_filled = mycursor.fetchall()
        roles_filled = roles_filled[0][0] - 1
        sql = "UPDATE roles SET roles_filled = %s WHERE role_id = %s"
        val = (roles_filled, role[0])
        mycursor.execute(sql, val)
        mydb.commit()
    sql = "DELETE FROM notifications WHERE user_notified = %s"
    val = (email,)
    mycursor.execute(sql, val)
    mydb.commit()
    sql = "DELETE FROM notifications WHERE project_author = %s"
    val = (email,)
    mycursor.execute(sql, val)
    mydb.commit()
    sql = "DELETE FROM ineligible WHERE user_email = %s"
    val = (email,)
    mycursor.execute(sql, val)
    mydb.commit()
    sql = "SELECT project_id FROM projects WHERE project_author = %s"
    val = (email,)
    mycursor.execute(sql, val)
    projects = mycursor.fetchall()
    for project in projects:
        sql = "DELETE FROM roles WHERE project_id = %s"
        val = (project[0],)
        mycursor.execute(sql, val)
        mydb.commit()
        sql = "DELETE FROM projects WHERE project_id = %s"
        val = (project[0],)
        mycursor.execute(sql, val)
        mydb.commit()
    return 200


    
    
    
print(deleteuser("katie@gmail.com"))