import mysql.connector

def connect_db():
    """
    Connects to the database and returns the connection
    """
    mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="admin",
    database="skillcloud")
    return mydb