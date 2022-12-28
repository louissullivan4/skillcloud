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
            sql = """INSERT INTO roles 
                (project_id, role_id, role_category, role_title, role_desc, role_no_needed)
                VALUES (%s,%s,%s,%s,%s,%s)"""
            val = (project_id, role_id, role_category, role_title, role_desc, role_no_needed)
            cursor.execute(sql, val)
            mydb.commit()
        return roles

    def get_roles(self, pid):
        roles = []
        cursor = mydb.cursor()
        sql = "SELECT * FROM roles WHERE project_id = %s"
        cursor.execute(sql, (pid, ))
        row = cursor.fetchall()
        if row == None:
            return "Error! Project does not exist."
        else:
            for role in row:
                roles.append(role)
        return roles

    def create_project(self, requestjson):
        today = str(date.today())
        pid = check_id(mydb)
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
            val = (pid, title, author, today, start_date, end_date, summary)
            cursor.execute(sql, val)
            mydb.commit()
            self.id = pid
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
            return 200, self.id
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
        roles_json = []
        for val in self.roles:
            role_json = {"role_category":val[1], "role_title":val[2], "role_desc":val[3], "role_no_needed":val[4]}
            roles_json.append(role_json)
        projects = []
        project_json = {"id":self.id, "title":self.title, "author":self.author, "create_date":self.create_date, "start_date":self.start_date, "end_date":self.end_date, "summary":self.summary, "state":self.state, "roles":roles_json}
        projects.append(project_json)
        projects_json = {"result":projects}
        return projects_json


# p1 = Project()
# p1.create_project('DB Productions', 'ddotbridge@gmail.com', '2022-10-02', '2023-6-31', 'A production of a short film starring one actor who plays multiple roles.', 'Closed', [['Acting, Music and other Creative Arts', 'Actor', 'Looking for a male actor who has a wealth of experience. Preferred to have starred in silent pieces and to be an expert in the field of interpretive dancing.', '1']])
# # p1.create_project('Trew View Real Estate', 'louis@gmail.com', '2022-11-02', '2023-7-31', 'Development of 5, bungalow houses in Waterford city', 'Open', [['Trades workers, construction, electrical and other related', 'Electritian', 'Electritian with multiple years experience in house related projects. Skills include wiring and smoke alarms', '1'], ['Trades workers, construction, electrical and other related', 'Plumber', 'Plumber with multiple years experience in house related projects. Skills include restroom piping and immersion tanks', '1'], ['Trades workers, construction, electrical and other related', 'Block Layers', 'Block Layers with diffrent levels of experience both junior and senior accepted. Must have be fully qualified', '3']])
# p1.create_project('Banana Apps', 'laiah@gmail.com', '2022-11-02', '2023-8-31', 'A new app coming to android and ios.', 'Open', [['Information and communications technology', 'Software Engineer', 'Backend app developer with skills in the following technologies, android, ios, sqlite3, xml and java. Must have a degree in Computer Science or related degrees.', '1'], ['Information and communications technology', 'UI/UX Designer', 'UI/UX Designer that has used wireframe, photoshop and has done app development before. Portfolio and related degree', '1']])
# p1.create_project('Test', 'test@gmail.com', '2022-10-25', '2022-10-26', 'Test Test Test', 'Close', [['Information and communications technology', 'Software Engineer', 'Test needs docker, kubernetes and java. Must have a degree in Computer Science or related degrees.', '1']])

# print(p1.get_project(''))