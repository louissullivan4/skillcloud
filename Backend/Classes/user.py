from Database.db_connect import connect_db

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
        self.project_ids = []
        self.certifications = ""
        self.availability = ""

    def create_user(self, email, fname, lname, job_title, job_category, job_desc, previous_roles, edu_name, edu_school, edu_summary, certifications, availability):
        cursor = mydb.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s", (email, ))
        row = cursor.fetchone()
        if row == None:
            sql = """INSERT INTO users 
                (email, fname, lname, job_title, job_category, job_desc, previous_roles, edu_name, edu_school, edu_summary, certifications, availability)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
            val = (email, fname, lname, job_title, job_category, job_desc, previous_roles, edu_name, edu_school, edu_summary, certifications, availability)
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
            self.job_desc = row[5]
            self.previous_roles = row[6]
            self.edu_name = row[7]
            self.edu_school = row[0]
            self.edu_summary = row[9]
            self.project_ids = row[10]
            self.certifications = row[13]
            self.availability = row[12]
        mydb.close()

p1 = User()
p2 = User()
p3 = User()
p1.create_user("cl@gmail.com", "Clara", "Marsh", "Dairy Farmer", "Agricultural, forestry and fishery labourers", "Responsible for managing and caring for dairy cows. and feeding animals, administering medication, and discarding waste in a safe manner, maintaining & operating milking equipment, harvesting feed, and collaborating with animal nutritionists.", "Raised and milked on average cows twice daily. Operated heavy equipment. Performed test on feed and hay production for the University of Tennessee Department of Agriculture. Responsible for the raising, cleaning and caring of the calves and chickens.", "Leaving Certificate", "Ursuline", "English, Maths, Irish, Economics, Home Economics, Chemistry, Accounting", "Level 5 Certificate in Agriculture Award", "Open")