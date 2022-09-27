import random

def check_id(mydb):
        id = generate_id()
        cursor = mydb.cursor()    
        cursor.execute("SELECT * FROM projects WHERE project_id = %s", (id, ))
        row = cursor.fetchone()
        while row != None:
            id = generate_id()
            cursor.execute("SELECT * FROM projects WHERE project_id = %s", (id, ))
            row = cursor.fetchone()
        return id

def generate_id():
    id = "0"
    i = 0
    while i < 7:
        id += str(random.randint(0,9))
        i += 1
    return id