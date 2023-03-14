import mysql.connector
import os

# def connect_db():
#     mydb = mysql.connector.connect(
#     host="localhost",
#     user="root",
#     password="admin",
#     database="skillcloud")
#     return mydb

def connect_db():
    db_host = os.environ['DB_HOST']
    db_user = os.environ['DB_USER']
    db_password = os.environ['DB_PWORD']
    db_name = os.environ['DB_NAME']
    mydb = mysql.connector.connect(
        host = db_host,
        user = db_user,
        password = db_password)
    cursor = mydb.cursor()
    cursor.execute("USE {}".format(db_name))
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
