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
        self.city = ""
        self.country = ""
        self.roles = []

    def create_roles(self, project_id, roles):
        cursor = mydb.cursor()
        for val in roles:
            role_id = check_id(mydb)
            role_category = val['role_category']
            role_title = val['role_title']
            role_desc = val['role_desc']
            role_no_needed = val['role_no_needed']
            role_remote = val['role_remote']
            sql = """INSERT INTO roles 
                (project_id, role_id, role_category, role_title, role_desc, role_no_needed, roles_filled, role_remote)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"""
            val = (project_id, role_id, role_category, role_title, role_desc, role_no_needed, "0", role_remote)
            cursor.execute(sql, val)
            mydb.commit()
        return roles
    
    def update_roles(self, project_id, roles):
        cursor = mydb.cursor()
        for val in roles:
            role_id = val['role_id']
            role_category = val['role_category']
            role_title = val['role_title']
            role_desc = val['role_desc']
            role_no_needed = val['role_no_needed']
            role_remote = val['role_remote']
            sql = """Update roles SET project_id = %s role_category = %s, role_title = %s, role_desc = %s, role_filled = %s role_no_needed = %s, role_remote = %s WHERE role_id = %s"""
            val = (project_id, role_category, role_title, role_desc, "0", role_no_needed, role_remote, role_id)
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
        city = requestjson['project_city']
        country = requestjson['project_country']
        roles = requestjson['roles']
        cursor = mydb.cursor()
        sql = "SELECT * FROM projects WHERE project_id = %s"                
        cursor.execute(sql, (id, ))
        row = cursor.fetchone()
        if row == None:
            sql = """INSERT INTO projects 
                (project_id, project_title, project_author, project_createdate, project_startdate, project_enddate, project_summary, project_state, project_city, project_country)
                VALUES (%s,%s,%s,%s,%s,%s,%s,'Open',%s,%s)"""
            val = (id, title, author, today, start_date, end_date, summary, city, country)
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
            self.city = city
            self.country = country
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
        
    def update_project(self, requestjson):
        try:
            pid = requestjson['id']
            title = requestjson['title']
            author = requestjson['author']
            start_date = requestjson['start_date']
            end_date = requestjson['end_date']
            summary = requestjson['summary']
            city = requestjson['city']
            country = requestjson['country']
            roles = requestjson['roles']
            cursor = mydb.cursor()
            sql = """UPDATE projects SET project_title = %s, project_author = %s, project_startdate = %s, project_enddate = %s, project_summary = %s, project_city = %s, project_country = %s WHERE project_id = %s"""
            val = (title, author, start_date, end_date, summary, city, country, pid)
            cursor.execute(sql, val)
            mydb.commit()
            self.roles = self.update_roles(pid, roles)
            return "200"
        except:
            return "404"
            
    def get_project(self, id):
        cursor = mydb.cursor()
        sql = "SELECT * FROM projects WHERE project_id = %s"
        cursor.execute(sql, (id, ))        
        row = cursor.fetchone()
        if row == None:
            return "Error! Project does not exist."
        else:
            print(row)
            self.id = row[0]
            self.title = row[1]
            self.author = row[2]
            self.create_date = row[3]
            self.start_date = row[4]
            self.end_date = row[5]
            self.summary = row[6]
            self.state = row[7]
            self.city = row[8]
            self.country = row[9]
            self.roles = self.get_roles(id)
            print(self.roles)
            return (self.id, self.title, self.author, self.create_date, self.start_date, self.end_date, self.summary, self.state, self.city, self.country, self.roles)

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
            role_json = {"role_category":val[1], "role_title":val[2], "role_desc":val[3], "role_no_needed":val[4], "role_no_needed":val[4], "role_id":val[5], "role_filled":val[6], "role_remote":val[7]}
            roles_json.append(role_json)
        project_json = {"id":self.id, "title":self.title, "author":self.author, "create_date":self.create_date, "start_date":self.start_date, "end_date":self.end_date, "summary":self.summary, "state":self.state, "city":self.city, "country":self.country, "roles":roles_json}
        return project_json
