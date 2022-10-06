import mysql.connector

def connect_db():
    mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="admin",
    database="skillcloud")
    return mydb