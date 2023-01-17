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
        self.profilepic = ""
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
        job_title = requestjson['title']
        job_category = requestjson['category']
        job_desc = requestjson['desc']
        work_experience = requestjson['experience']
        education = requestjson['education']
        project_ids = None
        certifications = ""
        for val in requestjson['certs']:
            certifications += val.get('certName') + ","
        certifications = certifications[:-1]
        availability = "Open"
        profilepic = None
        current_project = None
        cursor.execute("SELECT * FROM users WHERE email = %s", (email, ))
        row = cursor.fetchone()
        if row == None:
            sql = """INSERT INTO users 
                (email, fname, lname, city, country, job_title, job_category, job_desc, project_ids, certifications, availability, profilepic, current_project)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
            val = (email, fname, lname, city, country, job_title, job_category, job_desc, project_ids, certifications, availability, profilepic, current_project)
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
            self.profilepic = profilepic
            self.current_project = current_project
            mydb.commit()
            return 200
        elif row != None:
            return 409
        else:
            return 404

    def get_user(self, email):
        cursor = mydb.cursor()
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
            self.profilepic = row[11]
            self.current_project = row[12]
            self.work_experience = self.get_experience(email)
            self.education = self.get_education(email)
        return (self.email, self.fname, self.lname, self.city, self.country, self.job_title, self.job_category, self.job_desc, self.project_ids, self.certifications, self.availability, self.profilepic, self.current_project, self.work_experience, self.education)

    def update_user(self, requestjson):
        cursor = mydb.cursor()
        # try:
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
        profilepic = None
        current_project = None
        sql = """UPDATE users SET fname = %s, lname = %s, city = %s, country = %s, job_title = %s, job_category = %s, job_desc = %s, project_ids = %s, certifications = %s, availability = %s, profilepic = %s, current_project = %s WHERE email = %s"""
        val = (fname, lname, city, country, job_title, job_category, job_desc, project_ids, certifications, availability, profilepic, current_project, email)
        cursor.execute(sql, val)
        self.email = email
        self.fname = fname
        self.lname = lname
        self.city = city
        self.country = country
        self.job_title = job_title
        self.job_category = job_category
        self.job_desc= job_desc
        self.work_experience = self.update_experience(email, work_experience)
        self.education = self.update_education(email, education)
        self.project_ids = project_ids
        self.certifications = certifications
        self.availability = availability
        self.profilepic = profilepic
        self.current_project = current_project
        mydb.commit()
        return 200
        # except:
        #     return 404

        
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
            print(newVal)
            certs.append(newVal)
        user_json = {"email" : self.email, "fname" : self.fname, "lname" : self.lname, "city" : self.city, "country" : self.country, "job_title" : self.job_title, "job_category" : self.job_category, "job_desc" : self.job_desc, "work_experience" : experience_json, "education" : education_json, "project_ids" : self.project_ids, "certifications" : certs, "availability" : self.availability, "profilepic" : self.profilepic, "current_project" : self.current_project}
        user.append(user_json)
        user_json = {"result":user}
        return user_json