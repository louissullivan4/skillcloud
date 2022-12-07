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

def fulfill_roles(data):
    for val in data["roles"]:
        category = val["role_category"].lower()
        candidates = get_input_users(category)
        desc = val["role_desc"]
        title = val["role_title"]
        job = desc + " " + title
        final  = {}
        final = get_final_candidates_dict(job, candidates)
    return final

def event_match(jsonVals):
    data = json.loads(jsonVals)
    candidates = fulfill_roles(data)
    # print(candidates)
    return candidates


# x = '{"roles": [{"role_category": "Information and communications technology", "role_title": "Software Developer", "role_desc": "Software Developer who likes kubernetes", "role_no_needed": "1"}], "project_author": "sullivanlouis0@gmail.com", "project_title": "Another test", "project_startdate": "2022-11-03", "project_enddate": "2022-11-30", "project_summary": "Making another test project"}'
# eventMatch(x)

