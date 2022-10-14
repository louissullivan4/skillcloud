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
        self.previous_roles = ""
        self.edu_name = ""
        self.edu_school = ""
        self.edu_summary = ""
        self.project_ids = ""
        self.certifications = ""
        self.availability = ""

    def create_user(self, email, fname, lname, job_title, job_category, job_desc, previous_roles, edu_name, edu_school, edu_summary, project_ids, certifications, availability):
        cursor = mydb.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s", (email, ))
        row = cursor.fetchone()
        if row == None:
            sql = """INSERT INTO users 
                (email, fname, lname, job_title, job_category, job_desc, previous_roles, edu_name, edu_school, edu_summary, project_ids, certifications, availability)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
            val = (email, fname, lname, job_title, job_category, job_desc, previous_roles, edu_name, edu_school, edu_summary, project_ids, certifications, availability)
            cursor.execute(sql, val)
            self.email = email
            self.fname = fname
            self.lname = lname
            self.job_title = job_title
            self.job_category = job_category
            self.job_desc= job_desc
            self.previous_roles = previous_roles
            self.edu_name = edu_name
            self.edu_school = edu_school
            self.edu_summary = edu_summary
            self.project_ids = project_ids
            self.certifications = certifications
            self.availability = availability
            mydb.commit()
        else:
            return "Error! User already exists."

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
            self.job_title = row[3]
            self.job_category = row[4]
            self.job_desc= row[5]
            self.previous_roles = row[6]
            self.edu_name = row[7]
            self.edu_school = row[8]
            self.edu_summary = row[9]
            self.project_ids = row[10]
            self.certifications = row[11]
            self.availability = row[12]
        return 200

    def get_user_json(self):
        user = []
        user_json = {"email":self.email, "fname" : self.fname, "lname" : self.lname, "job_title" : self.job_title, "job_category" : self.job_category, "job_desc" : self.job_desc, "previous_roles" : self.previous_roles, "edu_name" : self.edu_name, "edu_school" : self.edu_school, "edu_summary" : self.edu_summary, "project_ids" : self.project_ids, "certifications" : self.certifications, "availability" : self.availability}
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