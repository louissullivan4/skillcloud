from match_skills import match_job
from db_connect import connect_db
import json
import re
mydb = connect_db()

def get_final_candidates_dict(job, candidates):
    percentages_dict = {}
    percentages_dict = match_job(job, candidates)
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
    for val in data["roles"]:
        role_ineligible_users = get_ineligible_users(val["role_id"])
        category = val["role_category"].lower()
        candidates = get_input_users(category)
        removed_ineligible_candidates = {}
        for user, val in candidates.items():
            if user not in role_ineligible_users:
                removed_ineligible_candidates[user] = val
        desc = val["role_desc"]
        title = val["role_title"]
        job = desc + " " + title
        final  = {}
        final = get_final_candidates_dict(job, removed_ineligible_candidates)
    return final

def event_match(jsonVals):
    jsonVals = str(jsonVals).replace("'", '"')
    data = json.loads(jsonVals)
    candidates = fulfill_roles(data)
    print(candidates)
    return candidates



# event_match(x)

