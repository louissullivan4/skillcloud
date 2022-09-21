import sqlite3
# email = "bob@gmail.com"
sqliteConnection = sqlite3.connect('skillcloud.db')
cursor = sqliteConnection.cursor()
sql = """INSERT INTO users 
(email, fname, lname, job_title, role, level, edu_name, edu_school, edu_gradyear, edu_summary, certifications, availability)
VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"""
val = ('Molly@gmail.com', 'Molly', 'Adams', 'Software Engineer', 'Frontend', '6', 'BSc Computer Science', 'University College Dublin', '2016', 'Advanced Software Engineering, Mobile Development, UI Design, Web Development', 'Certified Web Professional - Web Developer', 'Open')
cursor.execute(sql, val)

sqliteConnection.commit()
sqliteConnection.close()