import os

db_connection = os.getenv("CLEARDB_DATABASE_URL")
hostname=db_connection.split("@")[1].split("/")[0]
user=db_connection.split("://")[1].split(":")[0]
password=db_connection.split(":")[2].split("@")[0]
database=db_connection.split("/")[3].split("?")[0]
print(db_connection)
print(hostname)
print(user)
print(password)
print(database)