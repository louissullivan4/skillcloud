from db_connect import connect_db

mydb = connect_db()

class User:
    def __init__(self):
        self.email = ""
        self.fname = ""
        self.lname = ""
        self.job_title = ""
        self.job_category = ""
        self.job_desc= ""
        self.city = ""
        self.country = ""
        self.work_experience = []
        self.education = []
        self.project_ids = ""
        self.certifications = ""
        self.availability = ""
        self.current_project = ""

    def create_experience(self, email, experience):
        cursor = mydb.cursor()
        for val in experience:
            experience_name = val['experience_name']
            experience_title = val['experience_title']
            experience_start = val['experience_start']
            experience_end = val['experience_end']
            experience_desc = val['experience_desc']
            sql = """INSERT INTO user_experience 
                (user_email, experience_name, experience_title, experience_start, experience_end, experience_desc)
                VALUES (%s,%s,%s,%s,%s,%s)"""
            val = (email, experience_name, experience_title, experience_start, experience_end, experience_desc)
            cursor.execute(sql, val)
            mydb.commit()
        return experience
    
    def update_experience(self, email, experience):
        cursor = mydb.cursor()
        for val in experience:
            experience_name = val['experience_name']
            experience_title = val['experience_title']
            experience_start = val['experience_start']
            experience_end = val['experience_end']
            experience_desc = val['experience_desc']
            sql = """UPDATE user_experience SET experience_name = %s, experience_title = %s, experience_start = %s, experience_end = %s, experience_desc = %s WHERE user_email = %s"""
            val = (experience_name, experience_title, experience_start, experience_end, experience_desc, email)
            cursor.execute(sql, val)
            mydb.commit()
        return experience

    def get_experience(self, email):
        try:
            experience = []
            cursor = mydb.cursor()
            sql = "SELECT * FROM user_experience WHERE user_email = %s"
            cursor.execute(sql, (email, ))
            row = cursor.fetchall()
            if row == None:
                return "Error! User does not exist."
            else:
                for person in row:
                    experience.append(person)
            return experience
        except Exception as e:
            print(e)
            return "404"

    def create_education(self, email, education):
        cursor = mydb.cursor()
        for val in education:
            edu_type = val['edu_type']
            edu_degree = val['edu_degree']
            edu_school = val['edu_school']
            edu_desc = val['edu_desc']
            sql = """INSERT INTO user_education 
                (user_email, edu_type, edu_degree, edu_school, edu_desc)
                VALUES (%s,%s,%s,%s,%s)"""
            val = (email, edu_type, edu_degree, edu_school, edu_desc)
            cursor.execute(sql, val)
            mydb.commit()
        return education

    def get_education(self, email):
        try:
            education = []
            cursor = mydb.cursor()
            sql = "SELECT * FROM user_education WHERE user_email = %s"
            cursor.execute(sql, (email, ))
            row = cursor.fetchall()
            if row == None:
                return "Error! User does not exist."
            else:
                for person in row:
                    education.append(person)
            return education
        except Exception as e:
            print(e)
            return "404"

    
    def update_education(self, email, education):
        cursor = mydb.cursor()
        for val in education:
            edu_type = val['edu_type']
            edu_degree = val['edu_degree']
            edu_school = val['edu_school']
            edu_desc = val['edu_desc']
            sql = """UPDATE user_education SET edu_type = %s, edu_degree = %s, edu_school = %s, edu_desc = %s WHERE user_email = %s"""
            val = (edu_type, edu_degree, edu_school, edu_desc, email)
            cursor.execute(sql, val)
            mydb.commit()
        return education

    def create_user(self, requestjson):
        cursor = mydb.cursor()
        email = requestjson['email']
        fname = requestjson['fname']
        lname = requestjson['lname']
        city = requestjson['city']
        country = requestjson['country']
        job_title = requestjson['job_title']
        job_category = requestjson['job_category']
        job_desc = requestjson['job_desc']
        work_experience = requestjson['work_experience']
        education = requestjson['education']
        project_ids = None
        certifications = ""
        for val in requestjson['certifications']:
            certifications += val.get('certName') + ","
        certifications = certifications[:-1]
        availability = "Open"
        current_project = None
        cursor.execute("SELECT * FROM users WHERE email = %s", (email, ))
        row = cursor.fetchone()
        if row == None:
            sql = """INSERT INTO users 
                (email, fname, lname, city, country, job_title, job_category, job_desc, project_ids, certifications, availability, current_project)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
            val = (email, fname, lname, city, country, job_title, job_category, job_desc, project_ids, certifications, availability, current_project)
            cursor.execute(sql, val)
            self.email = email
            self.fname = fname
            self.lname = lname
            self.city = city
            self.country = country
            self.job_title = job_title
            self.job_category = job_category
            self.job_desc= job_desc
            self.work_experience = self.create_experience(email, work_experience)
            self.education = self.create_education(email, education)
            self.project_ids = project_ids
            self.certifications = certifications
            self.availability = availability
            self.current_project = current_project
            mydb.commit()
            return 200
        elif row != None:
            return 409
        else:
            return 404

    def get_user(self, email):
        cursor = mydb.cursor()
        try :
            cursor.execute("SELECT * FROM users WHERE email = %s", (email, ))
            row = cursor.fetchone()
            if row == None:
                return "Error! User does not exist."
            else:
                self.email = row[0]
                self.fname = row[1]
                self.lname = row[2]
                self.city = row[3]
                self.country = row[4]
                self.job_title = row[5]
                self.job_category = row[6]
                self.job_desc= row[7]
                self.project_ids = row[8]
                self.certifications = row[9]
                self.availability = row[10]
                self.current_project = row[11]
                self.work_experience = self.get_experience(email)
                self.education = self.get_education(email)
            return "200"
        except Exception as e:
            print(e)
            return "404"

    def update_user(self, requestjson):
        cursor = mydb.cursor()
        try:
            email = requestjson["email"]
            fname = requestjson["fname"]
            lname = requestjson['lname']
            city = requestjson['city']
            country = requestjson['country']
            job_title = requestjson['job_title']
            job_category = requestjson['job_category']
            job_desc = requestjson['job_desc']
            work_experience = requestjson['work_experience']
            education = requestjson['education']
            project_ids = None
            certifications = ""
            for val in requestjson['certifications']:
                certifications += val.get('certName') + ","
            certifications = certifications[:-1]
            availability = "Open"
            current_project = None
            sql = """UPDATE users SET fname = %s, lname = %s, city = %s, country = %s, job_title = %s, job_category = %s, job_desc = %s, project_ids = %s, certifications = %s, availability = %s, current_project = %s WHERE email = %s"""
            val = (fname, lname, city, country, job_title, job_category, job_desc, project_ids, certifications, availability, current_project, email)
            cursor.execute(sql, val)
            mydb.commit()
            self.update_education(email, education)
            self.update_experience(email, work_experience)
            return 200
        except:
            return 404

    def delete_user(self, email):
        try:
            mycursor = mydb.cursor()
            sql = "DELETE FROM users WHERE email = %s"
            val = (email,)
            mycursor.execute(sql, val)
            mydb.commit()
            sql = "DELETE FROM user_education WHERE user_email = %s"
            val = (email,)
            mycursor.execute(sql, val)
            mydb.commit()
            sql = "DELETE FROM user_experience WHERE user_email = %s"
            val = (email,)
            mycursor.execute(sql, val)
            mydb.commit()
            sql = "SELECT role_id FROM notifications WHERE user_notified = %s and status = 'accepted'"
            val = (email,)
            mycursor.execute(sql, val)
            roles = mycursor.fetchall()
            for role in roles:
                sql = "SELECT roles_filled FROM roles WHERE role_id = %s"
                val = (role[0],)
                mycursor.execute(sql, val)
                roles_filled = mycursor.fetchall()
                roles_filled = roles_filled[0][0] - 1
                sql = "UPDATE roles SET roles_filled = %s WHERE role_id = %s"
                val = (roles_filled, role[0])
                mycursor.execute(sql, val)
                mydb.commit()
            sql = "DELETE FROM notifications WHERE user_notified = %s"
            val = (email,)
            mycursor.execute(sql, val)
            mydb.commit()
            sql = "DELETE FROM notifications WHERE project_author = %s"
            val = (email,)
            mycursor.execute(sql, val)
            mydb.commit()
            sql = "DELETE FROM ineligible WHERE user_email = %s"
            val = (email,)
            mycursor.execute(sql, val)
            mydb.commit()
            sql = "SELECT project_id FROM projects WHERE project_author = %s"
            val = (email,)
            mycursor.execute(sql, val)
            projects = mycursor.fetchall()
            for project in projects:
                sql = "DELETE FROM roles WHERE project_id = %s"
                val = (project[0],)
                mycursor.execute(sql, val)
                mydb.commit()
                sql = "DELETE FROM projects WHERE project_id = %s"
                val = (project[0],)
                mycursor.execute(sql, val)
                mydb.commit()
            return 200
        except Exception as e:
            print(e)
            return 404

    def get_current_projects(self, email):
        cursor = mydb.cursor()
        sql = "SELECT current_project FROM users WHERE email = %s"
        cursor.execute(sql, (email, ))
        row = cursor.fetchall()
        if len(row) == 0:
            current_project_ids = []
            for val in row:
                current_project_ids.append(val[0])
            projects = []
            for ids in current_project_ids:
                sql = "SELECT * FROM projects WHERE project_id = %s"
                val = (ids, )
                cursor.execute(sql, val)
                row = cursor.fetchone()
                projects.append(row)
            projects_json = []
            for val in projects:
                newVal = {"project_id": val[0], "project_title": val[1], "project_author": val[2], "project_createdate": val[3], "project_startdate": val[4], "project_enddate": val[5], "project_summary": val[6], "project_state": val[7], "project_city": val[8], "project_country": val[9]}
                projects_json.append(newVal)
            return projects_json
        else:
            projects_json = []
            return projects_json

    def get_previous_projects(self, email):    
        cursor = mydb.cursor()
        sql = "SELECT project_ids FROM users WHERE email = %s"
        cursor.execute(sql, (email, ))
        row = cursor.fetchall()
        if row[0][0] != None:
            current_project_ids = []
            for val in row:
                current_project_ids.append(val[0])
            projects = []
            for ids in current_project_ids:
                sql = "SELECT * FROM projects WHERE project_id = %s"
                val = (ids, )
                cursor.execute(sql, val)
                row = cursor.fetchone()
                projects.append(row)
            projects_json = []
            for val in projects:
                newVal = {"project_id": val[0], "project_title": val[1], "project_author": val[2], "project_createdate": val[3], "project_startdate": val[4], "project_enddate": val[5], "project_summary": val[6], "project_state": val[7], "project_city": val[8], "project_country": val[9]}
                projects_json.append(newVal)
            return projects_json
        else:
            projects_json = []
            return projects_json
        
    def get_owned_projects(self, email):
        cursor = mydb.cursor()
        sql = "SELECT * FROM projects WHERE project_author = %s"
        cursor.execute(sql, (email, ))
        row = cursor.fetchall()
        projects_json = []
        for val in row:
            newVal = {"project_id": val[0], "project_title": val[1], "project_author": val[2], "project_createdate": val[3], "project_startdate": val[4], "project_enddate": val[5], "project_summary": val[6], "project_state": val[7], "project_city": val[8], "project_country": val[9]}
            projects_json.append(newVal)
        return projects_json

    def leave_project(self, email, project_id):
        try:
            cursor = mydb.cursor()
            sql = "UPDATE users SET current_project = null, availability = 'Open' WHERE email = %s"
            val = (email,)
            cursor.execute(sql, val)
            mydb.commit()
            sql = "SELECT role_id FROM notifications WHERE user_notified = %s AND project_id = %s AND status = 'accepted'"
            val = (email, project_id)
            cursor.execute(sql, val)
            role_id = cursor.fetchone()
            if role_id is not None:
                sql = "UPDATE notifications SET status = 'pending', user_notified = null, type = 'project_role_wait' WHERE role_id = %s"
                val = (role_id[0],)
                cursor.execute(sql, val)
                mydb.commit()
                sql = "UPDATE roles SET roles_filled = roles_filled - 1 WHERE role_id = %s"
                val = (role_id[0],)
                cursor.execute(sql, val)
                mydb.commit()
                sql = "INSERT into ineligible (user_email, role_id) VALUES (%s, %s)"
                val = (email, role_id[0])
                cursor.execute(sql, val)
                mydb.commit()
                return 200
        except Exception as e:
            print(e)
            return 404            

    def get_user_json(self):
        experience_json = []
        for val in self.work_experience:
            newVal = {"experience_name":val[1], "experience_title":val[2], "experience_start":val[3], "experience_end":val[4], "experience_desc":val[5]}
            experience_json.append(newVal)
        education_json = []
        for val in self.education:
            newVal = {"edu_type":val[1], "edu_degree":val[2], "edu_school":val[3], "edu_desc":val[4]}
            education_json.append(newVal)
        user = [] 
        certs = []
        newcerts = self.certifications.split(",")
        for val in newcerts:
            newVal = {"certName": val}
            certs.append(newVal)
        user_json = {"email" : self.email, "fname" : self.fname, "lname" : self.lname, "city" : self.city, "country" : self.country, "job_title" : self.job_title, "job_category" : self.job_category, "job_desc" : self.job_desc, "work_experience" : experience_json, "education" : education_json, "project_ids" : self.project_ids, "certifications" : certs, "availability" : self.availability, "current_project" : self.current_project, "current_projects" : self.get_current_projects(self.email), "owned_projects" : self.get_owned_projects(self.email), "previous_projects" : self.get_previous_projects(self.email)}
        user.append(user_json)
        user_json = {"result":user}
        return user_json
    
        
# u1 = User()
# u1.get_owned_projects("sullivanlouis0@gmail.com")
