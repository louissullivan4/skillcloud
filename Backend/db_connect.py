import mysql.connector
# import os

def connect_db():
    # vars = os.getenv("CLEARDB_DATABASE_URL")
    # hostname=vars.split("@")[1].split("/")[0]
    # user=vars.split("://")[1].split(":")[0]
    # password=vars.split(":")[2].split("@")[0]
    # database=vars.split("/")[3].split("?")[0]

    # mydb = mysql.connector.connect(
    # host=hostname,
    # user=user,
    # password=password,
    # database=database)

    mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="admin",
    database="skillcloud")
    return mydb

def clear_dbs(mydb):
    cursor = mydb.cursor()
    sql = "DELETE FROM projects"
    cursor.execute(sql)
    mydb.commit()
    sql = "DELETE FROM roles"
    cursor.execute(sql)
    mydb.commit()
    sql = "DELETE FROM notifications"
    cursor.execute(sql)
    mydb.commit()