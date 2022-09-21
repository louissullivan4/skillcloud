import sqlite3

sqliteConnection = sqlite3.connect('skillcloud.db')
cursor = sqliteConnection.cursor()


# cursor.execute('DROP TABLE IF EXISTS users_login')
# cursor.execute('DROP TABLE IF EXISTS users')

create_login = """CREATE TABLE users_login (
                email TEXT PRIMARY KEY,
                password TEXT);"""

create_users = """CREATE TABLE users (
                email TEXT PRIMARY KEY,
                fname TEXT,
                lname TEXT,
                job_title TEXT,
                role TEXT,
                level TEXT,                
                edu_name TEXT,         
                edu_school TEXT,         
                edu_gradyear TEXT,        
                edu_summary TEXT,
                project_ids TEXT,
                certifications TEXT,
                availability TEXT
                );"""

create_projects = """CREATE TABLE projects (
                project_id TEXT,
                project_title TEXT,
                project_author TEXT,
                project_createdate TEXT,
                project_startdate TEXT,
                project_enddate TEXT,
                project_length TEXT,
                project_desc TEXT,  
                project_state TEXT,
                project_roles TEXT,
                project_github TEXT
                );"""


# cursor.execute(create_login)
# cursor.execute(create_projects)
# cursor.execute(create_users)
sqliteConnection.commit()
sqliteConnection.close()


