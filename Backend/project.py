from inspect import modulesbyfile
import mysql.connector
from datetime import date

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="admin",
  database="skillcloud"
)

class Project:
    def __init__(self):
        self.id = ""
        self.title = ""
        self.author = ""
        self.create_date = ""
        self.start_date = ""
        self.end_date = ""
        self.summary = ""
        self.state = ""
        self.roles = []

    def create_roles(self, project_id, roles):
        cursor = mydb.cursor()
        for val in roles:
            role_category = val[0]
            role_title = val[1]
            role_desc = val[2]
            role_no_needed = val[3]
            sql = """INSERT INTO roles 
                (project_id, role_category, role_title, role_desc, role_no_needed)
                VALUES (%s,%s,%s,%s,%s)"""
            val = (project_id, role_category, role_title, role_desc, role_no_needed)
            cursor.execute(sql, val)
            mydb.commit()
        return roles

    def get_roles(self, id):
        roles = []
        cursor = mydb.cursor()
        sql = "SELECT * FROM roles WHERE project_id = %s"
        cursor.execute(sql, (id, ))
        row = cursor.fetchall()
        if row == None:
            return "Error! Project does not exist."
        else:
            for role in row:
                roles.append(role)
        return roles

    def create_project(self, id, title, author, start_date, end_date, summary, state, roles):
        today = str(date.today())
        cursor = mydb.cursor()
        sql = "SELECT * FROM projects WHERE project_id = %s"
        cursor.execute(sql, (id, ))
        row = cursor.fetchone()
        if row == None:
            sql = """INSERT INTO projects 
                (project_id, project_title, project_author, project_createdate, project_startdate, project_enddate, project_summary, project_state)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"""
            val = (id, title, author, today, start_date, end_date, summary, state)
            cursor.execute(sql, val)
            mydb.commit()
            self.id = id
            self.title = title
            self.author = author
            self.create_date = today
            self.start_date = start_date
            self.end_date = end_date
            self.summary = summary
            self.state = state
            self.roles = self.create_roles(id, roles)
        else:
            return "Error! Project already exists."
            

    def get_project(self, id):
        cursor = mydb.cursor()
        sql = "SELECT * FROM projects WHERE project_id = %s"
        cursor.execute(sql, (id, ))        
        row = cursor.fetchone()
        if row == None:
            return "Error! Project does not exist."
        else:
            self.id = row[0]
            self.title = row[1]
            self.author = row[2]
            self.create_date = row[3]
            self.start_date = row[4]
            self.end_date = row[5]
            self.summary = row[6]
            self.state = row[6]
            self.roles = self.get_roles(id)
            return (self.id, self.title, self.author, self.create_date, self.start_date, self.end_date, self.summary, self.state, self.roles)

p1 = Project()
p1.create_project('1', 'Tree View Estate Development', 'louis@gmail.com', '2022/10/01', '2023/4/01', 'Development of 20 house estate called TreeView on the North East side of Cork City.', 'Open', [['Trades workers, construction, electrical and other related', 'Electrician', 'Electrician with multiple year experience for private and commercial projects', '4'], ['Trades workers, construction, electrical and other related', 'Block Layers', 'Block Layers for private and commercial projects. Experience not needed but ideal', '8']])

print(p1.get_project('1'))