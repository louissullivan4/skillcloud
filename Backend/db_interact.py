from socket import IPV6_DSTOPTS
import mysql.connector

mydb = mysql.connector.connect(
  host="127.0.0.1",
  port=3306,
  user="root",
  password="admin",
  database = "skillcloud"
)

cursor = mydb.cursor()
# cursor.execute("CREATE DATABASE skillcloud")
# cursor.execute("DROP TABLE projects")

sql = "DELETE FROM projects WHERE project_id = '1'"
cursor.execute(sql)
mydb.commit()


# create_login = """CREATE TABLE users_login (
#                 email TEXT PRIMARY KEY,
#                 password TEXT);"""

# cursor.execute("CREATE TABLE roles (project_id TEXT,role_category TEXT,role_title TEXT,role_desc TEXT,role_no_needed TEXT);")
# cursor.execute("CREATE TABLE projects (project_id TEXT,project_title TEXT,project_author TEXT,project_createdate TEXT,project_startdate TEXT,project_enddate TEXT,project_summary TEXT,project_state TEXT);")
# cursor.execute("CREATE TABLE users (email TEXT,fname TEXT,lname TEXT,job_title TEXT,job_category TEXT,job_desc TEXT,previous_roles TEXT,edu_name TEXT,edu_school TEXT,edu_summary TEXT,project_ids TEXT,certifications TEXT,availability TEXT);")



