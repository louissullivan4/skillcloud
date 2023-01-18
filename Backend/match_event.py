from match_skills import *
from db_connect import connect_db
from notification_service import *

import json

mydb = connect_db()

def get_final_candidates_dict(job, candidates):
    percentages_dict = {}
    percentages_dict = match_skills(job, candidates)
    return dict(sorted(percentages_dict.items(), key=lambda val: val[:1]))

def get_input_users(category):
    cursor = mydb.cursor()
    sql = "SELECT email, job_title, job_desc, certifications FROM users WHERE job_category = %s && availability = 'Open'"
    cursor.execute(sql, (category, ))     
    row = cursor.fetchall()
    candidates = {}    
    for person in row:
        if len(row) > 0:
            candidates[person[0]] = ' '.join(person[1:])
    cursor = mydb.cursor()
    for key, val in candidates.items():
        sql = "SELECT experience_desc FROM user_experience WHERE user_email = %s"
        cursor.execute(sql, (key, ))     
        row = cursor.fetchall()
        row = [i[0] for i in row]
        row = ' '.join(row)
        candidates[key] = val + " " + row
    for key, val in candidates.items():
        sql = "SELECT edu_type, edu_degree, edu_desc FROM user_education WHERE user_email = %s"
        cursor.execute(sql, (key, ))     
        row = cursor.fetchall()
        if len(row) > 0:
            row = [i[0] + " " + i[1] + " " + i[2] for i in row]
            row = ' '.join(row)
            candidates[key] = val + " " + row
    return candidates

def get_ineligible_users(role_id):
    cursor = mydb.cursor()
    sql = "SELECT user_email FROM ineligible WHERE role_id = %s"
    cursor.execute(sql, (role_id, ))     
    row = cursor.fetchall()
    ineligible_users = [i[0] for i in row]
    return ineligible_users

def fulfill_roles(data):
    data = str(data).replace("'", '"')
    json_data = json.loads(data)
    desc = json_data["role_desc"]
    title = json_data["role_title"]
    job = desc + " " + title
    role_ineligible_users = get_ineligible_users(json_data["role_id"])
    category = json_data["role_category"].lower()
    candidates = get_input_users(category)
    removed_ineligible_candidates = {}
    for user, val in candidates.items():
        if user not in role_ineligible_users:
            removed_ineligible_candidates[user] = val
    final  = {}
    final = get_final_candidates_dict(job, removed_ineligible_candidates)
    return final

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

def fulfill_user(jsonVals):
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
        return "400"

def event_match_user(jsonVals):
    jsonVals = str(jsonVals).replace("'", '"')
    data = json.loads(jsonVals)
    complete = fulfill_user(data)
    return complete

def event_match(jsonVals):
    jsonVals = str(jsonVals).replace("'", '"')
    data = json.loads(jsonVals)
    candidates = fulfill_roles(data)
    return candidates

