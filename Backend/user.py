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
        self.location = ""
        self.work_experience = []
        self.education = []
        self.project_ids = ""
        self.certifications = ""
        self.availability = ""

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
                VALUES (%s,%s,%s,%s,%s)"""
            val = (email, experience_name, experience_title, experience_start, experience_end, experience_desc)
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

    def create_user(self, requestjson):
        cursor = mydb.cursor()
        email = requestjson['email']
        fname = requestjson['fname']
        lname = requestjson['lname']
        location = requestjson['location']
        job_title = requestjson['job_title']
        job_category = requestjson['job_category']
        job_desc = requestjson['job_desc']
        work_experience = requestjson['work_experience']
        education = requestjson['education']
        project_ids = requestjson['project_ids']
        certifications = requestjson['certifications']
        availability = requestjson['availability']
        cursor.execute("SELECT * FROM users WHERE email = %s", (email, ))
        row = cursor.fetchone()
        if row == None:
            sql = """INSERT INTO users 
                (email, fname, lname, location, job_title, job_category, job_desc, project_ids, certifications, availability)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
            val = (email, fname, lname, location, job_title, job_category, job_desc, project_ids, certifications, availability)
            cursor.execute(sql, val)
            self.email = email
            self.fname = fname
            self.lname = lname
            self.location = location
            self.job_title = job_title
            self.job_category = job_category
            self.job_desc= job_desc
            self.work_experience = self.create_experience(email, work_experience)
            self.education = self.create_education(email, education)
            self.project_ids = project_ids
            self.certifications = certifications
            self.availability = availability
            mydb.commit()
            return "200"
        elif row != None:
            return "409"
        else:
            return "404"

    def register_user(self, requestjson):
        cursor = mydb.cursor()
        email = requestjson['email']
        pwd = requestjson['pwd']
        cursor.execute("SELECT * FROM users WHERE email = %s", (email, ))
        row = cursor.fetchone()
        if row == None:
            sql = """INSERT INTO users 
                (email, pwd)
                VALUES (%s,%s)"""
            val = (email, pwd)
            cursor.execute(sql, val)
            mydb.commit()
            return "200"

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
            self.location = row[3]
            self.job_title = row[4]
            self.job_category = row[5]
            self.job_desc= row[6]
            self.work_experience = self.get_experience(email)
            self.education = self.get_education(email)
            self.project_ids = row[7]
            self.certifications = row[8]
            self.availability = row[9]
        return (self.email, self.fname, self.lname, self.location, self.job_title, self.job_category, self.job_desc, self.work_experience, self.education, self.project_ids, self.certifications, self.availability)

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
        user_json = {"email" : self.email, "fname" : self.fname, "lname" : self.lname, "location" : self.location, "job_title" : self.job_title, "job_category" : self.job_category, "job_desc" : self.job_desc, "work_experience" : experience_json, "education" : education_json, "project_ids" : self.project_ids, "certifications" : self.certifications, "availability" : self.availability}
        user.append(user_json)
        user_json = {"result":user}
        return user_json

# p1 = User()
# p2 = User()
# p3 = User()
# p4 = User()

# p1.create_user("bob@gmail.com", "Bob", "Wall", "Actor", "Acting, Music and other Creative Arts", "Actor of ten years with roles in multiple classic pieces. Took 2 years of interpertive dance school and ballet", " ", "Bachelor in Acting", "Trinity College Dublin", "Acting and Text, Movement Studies and Voice Studies. Multiple performances over a 7-day period and will play to invited agents, directors, producers, as well as the general public", "None", " ", "Open")
# p2.create_user("niamh@gmail.com", "Niamh", "Morrison", "Electrician", "Trades workers, construction, electrical and other related", " Electrician with three years and is involved in the installation, commissioning, testing and maintenance of various wiring systems and services in domestic, commercial and industrial applications.", " ",  "Electrical Apprenticeship", "Kerry College of Further Education", "Panel Wiring, Household electrics and Intruder and Fire Alarm Systems", "None", "QQI Level 6", "Open")
# p3.create_user("cian@gmail.com", "Cian", "Flynn", "App Developer", "Information and communications technology", "Junior Software Engineer who is heavily invovled with android app development in java", " ",  "Computer Science", "University College Cork", "Databases, Programming, Web Development, Algorithms and Databases", "None", "Associate Android Developer Google Certification", "Open")
# p4.create_user("sullivanlouis0@gmail.com", "Louis", "Sullivan", "Software Engineer", "Information and communications technology", "Graduate Software Engineer with a preferred area of development in cloud computing such as kubernetes and docker. ", " ",  "Computer Science", "University College Cork", "Cloud Infrastructure and Services, Ethical Hacking, Web Development, Algorithms and Databases, Software Engineering", "02675209", "Kubernetes Certified", "Open")