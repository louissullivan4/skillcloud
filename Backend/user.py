import sqlite3

class User:
    def __init__(self):
        self.email = ""
        self.fname = ""
        self.lname = ""
        self.job_title = ""
        self.role = ""
        self.level = ""
        self.edu_name = ""
        self.edu_school = ""
        self.edu_gradyear = ""
        self.edu_summary = ""
        self.project_ids = []
        self.certifications = ""
        self.availability = ""

    def create_user(self, email, fname, lname, job_title, role, level, edu_name, edu_school, edu_gradyear, edu_summary, certification, availability):
        sqliteConnection = sqlite3.connect('skillcloud.db')
        cursor = sqliteConnection.cursor()
        cursor.execute("SELECT * FROM users WHERE email = ?", (email, ))
        row = cursor.fetchone()
        if row == None:
            sql = """INSERT INTO users 
                (email, fname, lname, job_title, role, level, edu_name, edu_school, edu_gradyear, edu_summary, certifications, availability)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"""
            val = (email, fname, lname, job_title, role, level, edu_name, edu_school, edu_gradyear, edu_summary, certification, availability)
            cursor.execute(sql, val)
            self.email = email
            self.fname = fname
            self.lname = lname
            self.job_title = job_title
            self.role = role
            self.level = level
            self.edu_name = edu_name
            self.edu_school = edu_school
            self.edu_gradyear = edu_gradyear
            self.edu_summary = edu_summary
            self.certifications = certification
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
            self.edu_name = row[6]
            self.edu_school = row[7]
            self.edu_gradyear = row[8]
            self.edu_summary = row[9]
            self.certifications = row[11]
            self.availability = row[12]
        sqliteConnection.close()

# p1 = User()
# p1.create_user('molly@gmail.com', 'Molly', 'Adams', 'Software Engineer', 'Frontend', '6', 'BSc Computer Science', 'University College Dublin', '2016', 'Advanced Software Engineering, Mobile Development, UI Design, Web Development', 'Certified Web Professional - Web Developer', 'Open')
