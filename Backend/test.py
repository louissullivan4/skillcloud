from match_skills import match_skills
from db_connect import connect_db
from notification_service import notify_invite_project
import json

mydb = connect_db()

def user_values(data):
    data = str(data).replace("'", '"')
    data = json.loads(data)
    email = data["email"].lower()
    title = data["title"].lower()
    category = data["category"].lower()
    desc = data["desc"].lower()
    certs = ""
    for cert in data["certs"]:
        certs += cert["certName"].lower() + " "
    education = ""
    for edu in data["education"]:
        education += edu["edu_type"].lower() + " " + edu["edu_degree"].lower() + " " + edu["edu_desc"].lower() + " "
    experience = ""
    for exp in data["experience"]:
        experience += exp["experience_name"].lower() + " " + exp["experience_title"].lower() + " " + exp["experience_desc"].lower() + " "
    profile = title + " " + desc + " " + certs + " " + education + " " + experience
    return profile, category, email

def fufill_user(jsonVals):
    percentages_dict = {}
    job = {}
    candidates = {}
    try:
        jsonVals = str(jsonVals).replace("'", '"')
        data = json.loads(jsonVals)
        profile, category, email = user_values(data)
        cursor = mydb.cursor()
        sql = "SELECT role_id, role_desc, role_title from roles WHERE roles_filled < role_no_needed && role_category = %s"
        cursor.execute(sql, (category, ))
        row = cursor.fetchall()
        candidates[email] = profile
        if len(row) > 0:
            for val in row:
                job_desc = val[1].lower() + " " + val[2].lower()
                job[val[0]] = job_desc
                percentages_dict = match_skills(profile, job)
        for roleid, percent in percentages_dict.items():
            if len(percentages_dict) > 0:
                if percent > 0:
                    sql = "SELECT * FROM roles WHERE role_id = %s"
                    cursor.execute(sql, (roleid, ))
                    role = cursor.fetchone()
                    if len(role) > 0:
                        sql = "SELECT project_author FROM projects WHERE project_id = %s"
                        cursor.execute(sql, (role[0], ))
                        project_author = cursor.fetchone()
                        if len(project_author) > 0:
                            notify_invite_project(candidates, role, project_author, role[0])     
        return "200" 
    except Exception as e:
        print(e)
        return "400"




person1 = {
    "fname":"Henry",
    "lname":"English",
    "city":"London",
    "country":"United Kingdom",
    "title":"English Teacher",
    "category":"Teaching professionals",
    "desc":"Dedicated and professional English and modern languages tutor with strong communication skills now seeking a graduate teaching assistant role. I am an Oxford University graduate with a 2:2 in French and Spanish, combined with on-going school experience, demonstrating excellent leadership, organisation and planning skills. Living and teaching in France during the university placement year fostered a love of teaching, making a difference in the lives of those students who may not believe they have the potential to achieve.",
    "certs":[
       {
          "certName":"English Language Assistant ELA"
       }
    ],
    "email":"henry@gmail.com",
    "education":[
       {
          "edu_type":"BA",
          "edu_degree":"French and Spanish",
          "edu_school":"University of Oxford",
          "edu_desc":"Year 4 modules included, advanced language skills (French and Spanish), European culture, French literature"
       },
       {
          "edu_type":"A-levels",
          "edu_degree":"English Literature, Spanish, French",
          "edu_school":"Queen Marys College, Cheltenham",
          "edu_desc":"English Literature (A) Spanish (A) French (A)"
       }
    ],
    "experience":[
       {
          "experience_name":"Gloucester Tuition Center",
          "experience_title":"English Tutor",
          "experience_start":"2018-01-01",
          "experience_end":"2023-01-04",
          "experience_desc":"Tutoring adults and schoolchildren preparing for GCSE and A-level languages alongside managing a small team has helped me to develop good leadership and management skills. Experience of successfully motivating staff and students to get better results has broadened my knowledge of teaching techniques and strategies to get better results. I was responsible for devising a comprehensive learning programme specifically tailored to the individual requirements of each student, this includes planning lessons, keeping records, assessing and analysing work. The role also entails drawing on strong communication skills to provide tutees with practical and pastoral support throughout their educational or professional careers."
       }
    ]
}

fufill_user(person1)