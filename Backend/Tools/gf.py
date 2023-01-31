import random

def check_id(mydb, table):
        uid = generate_id()
        cursor = mydb.cursor()    
        if table == "projects":
            sql = 'SELECT * FROM projects WHERE project_id = %s'
        elif table == "roles":
            sql = 'SELECT * FROM roles WHERE role_id = %s'
        cursor.execute(sql, (uid, ))
        row = cursor.fetchone()
        while row != None:
            uid = generate_id()
            if table == "projects":
                sql = 'SELECT * FROM projects WHERE project_id = %s'
            elif table == "roles":
                sql = 'SELECT * FROM roles WHERE role_id = %s'
        cursor.execute(sql, (uid, ))
        row = cursor.fetchone()
        return uid

def generate_id():
    uid = "0"
    i = 0
    while i < 7:
        uid += str(random.randint(0,9))
        i += 1
    return uid

def get_role(mydb, role_id):
    cursor = mydb.cursor()
    sql = 'SELECT * FROM roles WHERE role_id = %s'
    cursor.execute(sql, (role_id, ))
    row = cursor.fetchone()
    print(row)
    return row