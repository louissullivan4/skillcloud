from datetime import date
from Tools.gf import check_id
from db_connect import connect_db

mydb = connect_db()

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
            role_id = check_id(mydb)
            role_category = val['role_category']
            role_title = val['role_title']
            role_desc = val['role_desc']
            role_no_needed = val['role_no_needed']
            print(val)
            sql = """INSERT INTO roles 
                (project_id, role_id, role_category, role_title, role_desc, role_no_needed, roles_filled)
                VALUES (%s,%s,%s,%s,%s,%s,%s)"""
            val = (project_id, role_id, role_category, role_title, role_desc, role_no_needed, "0")
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

    def create_project(self, requestjson):
        today = str(date.today())
        id = check_id(mydb)
        title = requestjson['project_title']
        author = requestjson['project_author']
        start_date = requestjson['project_startdate']
        end_date = requestjson['project_enddate']
        summary = requestjson['project_summary']
        roles = requestjson['roles']
        cursor = mydb.cursor()
        sql = "SELECT * FROM projects WHERE project_id = %s"                
        cursor.execute(sql, (id, ))
        row = cursor.fetchone()
        if row == None:
            sql = """INSERT INTO projects 
                (project_id, project_title, project_author, project_createdate, project_startdate, project_enddate, project_summary, project_state)
                VALUES (%s,%s,%s,%s,%s,%s,%s,'Open')"""
            val = (id, title, author, today, start_date, end_date, summary)
            cursor.execute(sql, val)
            mydb.commit()
            self.id = id
            self.title = title
            self.author = author
            self.create_date = today
            self.start_date = start_date
            self.end_date = end_date
            self.summary = summary
            self.state = 'Open'
            self.roles = self.create_roles(id, roles)
            if self.author == 'test@gmail.com':
                sql = "DELETE FROM projects WHERE project_author = 'sullivanlouis0@gmail.com'"
                cursor.execute(sql)
                mydb.commit()
                sql = "DELETE FROM roles WHERE project_id = %s"
                cursor.execute(sql, (self.id, ))
                mydb.commit()
            return "200"
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
            self.state = row[7]
            self.roles = self.get_roles(id)
            return (self.id, self.title, self.author, self.create_date, self.start_date, self.end_date, self.summary, self.state, self.roles)

    def create_project_pane(self, num=20):
        cursor = mydb.cursor()
        sql = "SELECT project_id, project_title, project_summary, project_state, project_createdate FROM projects ORDER BY project_createdate DESC LIMIT %s"
        cursor.execute(sql, (num, ))
        row = cursor.fetchall()
        if row == None:
            project_json = {"Status Code": 404, "Message": "Error! No projects exist."}
        else:
            projects = []
            for project in row:
                project_json = {"id":project[0], "title":project[1], "summary":project[2], "state":project[3]}
                projects.append(project_json)
            projects_json = {"result":projects}
            return projects_json
    
    def get_project_json(self):
        self.get_project(self.id)
        roles_json = []
        for val in self.roles:
            role_json = {"role_category":val[1], "role_title":val[2], "role_desc":val[3], "role_no_needed":val[4], "role_no_needed":val[4], "role_id":val[5], "role_filled":val[6]}
            roles_json.append(role_json)
        project_json = {"id":self.id, "title":self.title, "author":self.author, "create_date":self.create_date, "start_date":self.start_date, "end_date":self.end_date, "summary":self.summary, "state":self.state, "roles":roles_json}
        return project_json