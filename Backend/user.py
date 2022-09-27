import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="admin",
  database="skillcloud"
)

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
        sqliteConnection = sqlite3.connect('skillcloud.db')
        cursor = sqliteConnection.cursor()
        cursor.execute("SELECT * FROM users WHERE email = ?", (email, ))
        row = cursor.fetchone()
        if row == None:
            sql = """INSERT INTO users 
                (email, fname, lname, job_title, job_category, job_desc, previous_roles, edu_name, edu_school, edu_summary, certifications, availability)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"""
            val = (email, fname, lname, job_title, job_category, job_desc, previous_roles, edu_name, edu_school, edu_summary, certifications, availability)
            cursor.execute(sql, val)
            self.email = email
            self.fname = fname
            self.lname = lname
            self.job_title = job_title
            self.role = job_category
            self.level = job_desc
            self.previous_roles = previous_roles
            self.edu_name = edu_name
            self.edu_school = edu_school
            self.edu_summary = edu_summary
            self.certifications = certifications
            self.availability = availability
            sqliteConnection.commit()
        else:
            return "Error! User already exists."
        sqliteConnection.close()

    def get_user(self, email):
        sqliteConnection = sqlite3.connect('skillcloud.db')
        cursor = sqliteConnection.cursor()
        cursor.execute("SELECT * FROM users WHERE email = ?", (email, ))
        row = cursor.fetchone()
        if row == None:
            return "Error! User does not exist."
        else:
            self.email = row[0]
            self.fname = row[1]
            self.lname = row[2]
            self.job_title = row[3]
            self.role = row[4]
            self.level = row[5]
            self.previous_roles = row[6]
            self.edu_name = row[7]
            self.edu_school = row[8]
            self.edu_summary = row[9]
            self.project_ids = row[10]
            self.certifications = row[11]
            self.availability = row[12]
        sqliteConnection.close()