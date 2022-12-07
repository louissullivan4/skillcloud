from db_connect import connect_db
mydb = connect_db()

def auth_user(email, pwd):
    cursor = mydb.cursor()
    sql = "SELECT * FROM login_details WHERE email = %s && pwd = %s"
    cursor.execute(sql, (email, pwd, ))
    row = cursor.fetchone()
    if row == None:
        return 401
    elif len(row) > 0:
        return 200
    else:
        return 500

def register_user(email, pwd):
    cursor = mydb.cursor()
    sql = "SELECT * FROM login_details WHERE email = %s"
    cursor.execute(sql, (email, ))
    row = cursor.fetchone()
    if row == None:
        sql = "INSERT INTO login_details (email, pwd) VALUES (%s, %s)"
        cursor.execute(sql, (email, pwd))
        mydb.commit()
        return 200
    elif len(row) > 0:
        return 409
    else:
        return 500