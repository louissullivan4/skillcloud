from db_connect import connect_db

mydb = connect_db()

cursor = mydb.cursor()
# cursor.execute("CREATE DATABASE skillcloud")
# cursor.execute("DROP TABLE projects")

sql = "DELETE FROM projects WHERE project_author = 'amy@gmail.com'"
cursor.execute(sql)
mydb.commit()


# create_login = """CREATE TABLE users_login (
#                 email TEXT PRIMARY KEY,
#                 password TEXT);"""

# cursor.execute("CREATE TABLE roles (project_id TEXT,role_category TEXT,role_title TEXT,role_desc TEXT,role_no_needed TEXT);")
# cursor.execute("CREATE TABLE projects (project_id TEXT,project_title TEXT,project_author TEXT,project_createdate TEXT,project_startdate TEXT,project_enddate TEXT,project_summary TEXT,project_state TEXT);")
# cursor.execute("CREATE TABLE users (email TEXT,fname TEXT,lname TEXT,job_title TEXT,job_category TEXT,job_desc TEXT,previous_roles TEXT,edu_name TEXT,edu_school TEXT,edu_summary TEXT,project_ids TEXT,certifications TEXT,availability TEXT);")
# mydb.commit()


