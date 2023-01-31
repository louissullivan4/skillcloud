from datetime import date
import json
import traceback

from match_skills import *
from db_connect import connect_db
from project import Project


mydb = connect_db()

def get_notifications(user_email):
    cursor = mydb.cursor()
    msg_json = []
    sql = "SELECT * FROM notifications WHERE user_notified = %s && status = 'pending'"
    cursor.execute(sql, (user_email, ))
    row = cursor.fetchall()
    if row == None:
        return {"Status Code": 404, "Message": "Error! No notifications found."}
    else:
        for msg in row:
            val = {"type": msg[0], "project_author": msg[1], "user_notified": msg[2], "project_id": msg[3], "date_created": msg[4], "status": msg[5], "role_id": msg[6]}
            msg_json.append(val)
    sql = "SELECT * FROM notifications WHERE project_author = %s && (status != 'pending' || type = 'project_role_wait')"
    cursor.execute(sql, (user_email, ))
    row = cursor.fetchall()
    if row == None:
        return {"Status Code": 404, "Message": "Error! No notifications found."}
    else:
        for msg in row:
            val = {"type": msg[0], "project_author": msg[1], "user_notified": msg[2], "project_id": msg[3], "date_created": msg[4], "status": msg[5], "role_id": msg[6]}
            sql = "SELECT roles.role_title FROM roles WHERE role_id = %s"
            cursor.execute(sql, (msg[6], ))
            row = cursor.fetchall()
            if len(row) > 0:
                val["roles_title"] = row[0][0]
            msg_json.append(val)
    mydb.commit()
    return {"Status Code": 200, "result": msg_json}

def no_candidates_notifications(project, role):
    try :
        project = str(project).replace("'", '"').replace("True", "true").replace("False", "false").replace("None", "null").replace("'", '\\"')
        project = json.loads(project)
        role = str(role).replace("'", '"').replace("True", "true").replace("False", "false").replace("None", "null").replace("'", '\\"')
        role = json.loads(role)
        cursor = mydb.cursor()
        sql = "SELECT * FROM notifications WHERE role_id = %s && type = 'project_role_wait'"
        cursor.execute(sql, (role["role_id"], ))
        row = cursor.fetchall()
        if len(row) < 1:
            sql = "INSERT INTO notifications (type, project_author, user_notified, project_id, date_created, status, role_id) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, ("project_role_wait", project["author"], None, project["id"], str(date.today()), "pending", role['role_id']))
            mydb.commit()
        return 200
    except Exception as e:
        return 404

def create_role_notifications(project):
    cursor = mydb.cursor()
    project = str(project).replace("'", '"').replace("True", "true").replace("False", "false").replace("None", "null").replace("'", '\\"')
    new = json.loads(project)
    roles = new["roles"]
    for role in roles:
        sql = """DELETE FROM notifications WHERE role_id = %s"""
        cursor.execute(sql, (role["role_id"], ))
        mydb.commit()
        candidates = event_match(role)
        if len(candidates) < 1:
            no_candidates_notifications(project, role)
        else:
            notify_invite_project(candidates, role, new["author"], new["id"])
    return 200

def notify_invite_project(candidates, role, project_author, project_id):
    try:
        cursor = mydb.cursor()
        total_needed = int(role[4]) - int(role[6])
        candidates_needed = {}
        if total_needed < 0:
            total_needed = 0
        for key, val in candidates.items():
            if len(candidates_needed) >= total_needed:
                break
            candidates_needed[key] = val
        for key, val in candidates_needed.items():
            sql = "SELECT * FROM notifications WHERE user_notified = %s && role_id = %s"
            cursor.execute(sql, (key, role[5]))
            row = cursor.fetchall()
            if len(row) < 1:
                print("here 2")
                sql = "INSERT INTO notifications (type, project_author, user_notified, project_id, date_created, status, role_id) VALUES (%s, %s, %s, %s, %s, %s, %s)"
                print(("project_invite", project_author[0], key, project_id, str(date.today()), "pending", role[5]))
                cursor.execute(sql, ("project_invite", project_author[0], key, project_id, str(date.today()), "pending", role[5]))
                mydb.commit()
                sql = "DELETE FROM notifications WHERE && role_id = %s && type = 'project_role_wait'"
                cursor.execute(sql, (role[5], ))
                mydb.commit()
        return 200
    except Exception as e:
        print(traceback.format_exc())
        return 404

def notify_response_project(user_email, role_id, req):
    try:
        cursor = mydb.cursor()
        sql = "SELECT roles.role_no_needed, roles.roles_filled FROM roles WHERE role_id = %s"
        cursor.execute(sql, (role_id, ))
        row = cursor.fetchone()
        if req == "accepted" and int(row[1]) < int(row[0]):
            sql = "UPDATE roles SET roles_filled = %s WHERE role_id = %s"
            val = int(row[1]) + 1
            cursor.execute(sql, (str(val), role_id))
            mydb.commit()
            sql = "DELETE FROM ineligible WHERE user_email = %s"
            cursor.execute(sql, (user_email, ))
            mydb.commit()
            sql = "UPDATE notifications SET status = %s WHERE user_notified = %s && role_id = %s"
            cursor.execute(sql, (req, user_email, role_id))
            mydb.commit()
            sql = "UPDATE users SET availability = %s WHERE email = %s"
            cursor.execute(sql, ("Closed", user_email))
            mydb.commit()
            sql = "SELECT roles.project_id FROM roles WHERE role_id = %s"
            cursor.execute(sql, (role_id, ))
            row = cursor.fetchone()
            project_id = str(row[0])
            sql = "UPDATE users SET current_project = %s WHERE email = %s"
            cursor.execute(sql, (project_id, user_email))
            mydb.commit()
            sql = "DELETE FROM notifications WHERE && role_id = %s && type = 'project_role_wait'"
            cursor.execute(sql, (role_id, ))
            mydb.commit()
        elif req == "declined":
            if int(row[1]) == 0 or int(row[1]) < 0:
                val = 0
            else:
                val = int(row[1]) - 1
            sql = "UPDATE roles SET roles_filled = %s WHERE role_id = %s"
            cursor.execute(sql, (str(val), role_id))
            mydb.commit()
            sql = "INSERT INTO ineligible (user_email, role_id) VALUES (%s, %s)"
            cursor.execute(sql, (user_email, role_id))
            mydb.commit()
            sql = "SELECT roles.role_no_needed, roles.roles_filled FROM roles WHERE role_id = %s"
            cursor.execute(sql, (role_id, ))
            total = cursor.fetchone()
            total_needed = int(total[0]) - int(total[1])
            if total_needed > 0:
                sql = "SELECT roles.project_id FROM roles WHERE role_id = %s"
                cursor.execute(sql, (role_id, ))
                row = cursor.fetchone()
                project_id = str(row[0])
                p1 = Project()
                p1.get_project(project_id)
                project_json = p1.get_project_json()
                create_role_notifications(project_json)
            sql = "UPDATE notifications SET status = %s WHERE user_notified = %s && role_id = %s"
            cursor.execute(sql, (req, user_email, role_id))
            mydb.commit()
            sql = "UPDATE users SET availability = %s WHERE email = %s"
            cursor.execute(sql, ("Open", user_email))
            mydb.commit()
            sql = "SELECT roles.project_id FROM roles WHERE role_id = %s"
            cursor.execute(sql, (role_id, ))
            row = cursor.fetchone()
            project_id = str(row[0])
            sql = "UPDATE users SET current_project = %s WHERE email = %s"
            cursor.execute(sql, (None, user_email))
            mydb.commit()
        else:
            sql = "DELETE FROM notifications WHERE user_notified = %s && role_id = %s"
            cursor.execute(sql, (user_email, role_id))
            mydb.commit()
            sql = "UPDATE users SET availability = %s WHERE email = %s"
            cursor.execute(sql, ("Open", user_email))
            mydb.commit()
            return 403
        return 200
    except Exception as e:
        return 404

def notify_role_change(user_email, role_id, req):
    cursor = mydb.cursor()
    sql = "SELECT roles.role_no_needed, roles.roles_filled FROM roles WHERE role_id = %s"
    cursor.execute(sql, (role_id, ))
    row = cursor.fetchone()
    try:
        cursor = mydb.cursor()
        if req == "add" and int(row[1]) < int(row[0]):
            sql = "DELETE FROM ineligible WHERE user_email = %s"
            cursor.execute(sql, (user_email, ))
            mydb.commit()
            sql = "UPDATE notifications SET status = %s WHERE role_id = %s && user_notified = %s"
            cursor.execute(sql, ("accepted", role_id, user_email))
            mydb.commit()
            sql = "UPDATE roles SET roles_filled = %s WHERE role_id = %s"
            val = int(row[1]) + 1
            cursor.execute(sql, (str(val), role_id))
            mydb.commit()
            sql = "UPDATE users SET availability = %s WHERE email = %s"
            cursor.execute(sql, ("Closed", user_email))
            mydb.commit()
            sql = "SELECT roles.project_id FROM roles WHERE role_id = %s"
            cursor.execute(sql, (role_id, ))
            row = cursor.fetchone()
            project_id = str(row[0])
            sql = "UPDATE users SET current_project = %s WHERE email = %s"
            cursor.execute(sql, (project_id, user_email))
            mydb.commit()
            sql = "DELETE FROM notifications WHERE && role_id = %s && type = 'project_role_wait'"
            cursor.execute(sql, (role_id, ))
            mydb.commit()
        elif req == "remove":
            if int(row[1]) == 0:
                val = 0
            else:
                val = int(row[1]) - 1
            sql = "INSERT INTO ineligible (user_email, role_id) VALUES (%s, %s)"
            cursor.execute(sql, (user_email, role_id))
            mydb.commit()
            sql = "UPDATE notifications SET status = %s WHERE role_id = %s && user_notified = %s"
            cursor.execute(sql, ("declined", role_id, user_email))
            mydb.commit()
            sql = "UPDATE roles SET roles_filled = %s WHERE role_id = %s"
            cursor.execute(sql, (str(val), role_id))
            mydb.commit()
            sql = "UPDATE users SET availability = %s WHERE email = %s"
            cursor.execute(sql, ("Open", user_email))
            mydb.commit()
            sql = "SELECT roles.project_id FROM roles WHERE role_id = %s"
            cursor.execute(sql, (role_id, ))
            row = cursor.fetchone()
            project_id = str(row[0])
            sql = "UPDATE users SET current_project = %s WHERE email = %s"
            cursor.execute(sql, (None, user_email))
            mydb.commit()
            sql = "SELECT roles.role_no_needed, roles.roles_filled FROM roles WHERE role_id = %s"
            cursor.execute(sql, (role_id, ))
            total = cursor.fetchone()
            total_needed = int(total[0]) - int(total[1])
            if total_needed > 0:
                sql = "SELECT roles.project_id FROM roles WHERE role_id = %s"
                cursor.execute(sql, (role_id, ))
                row = cursor.fetchone()
                project_id = str(row[0])
                p1 = Project()
                p1.get_project(project_id)
                project_json = p1.get_project_json()
                create_role_notifications(project_json)
        return 200
    except Exception as e:
        return 404

def get_final_candidates_dict(job, candidates):
    percentages_dict = {}
    percentages_dict = match_skills(job, candidates)
    return dict(sorted(percentages_dict.items(), key=lambda val: val[:1]))

def get_input_users(category, project_id):
    cursor = mydb.cursor()
    sql = "SELECT project_author FROM projects WHERE project_id = %s"
    cursor.execute(sql, (project_id, ))
    row = cursor.fetchall()
    project_author = row[0][0]
    sql = "SELECT email, job_title, job_desc, certifications FROM users WHERE job_category = %s && availability = 'Open' && email != %s"
    cursor.execute(sql, (category, project_author))     
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
    data = str(data).replace("'", '"').replace("True", "true").replace("False", "false").replace("None", "null").replace("'", '\\"')
    json_data = json.loads(data)
    desc = json_data["role_desc"]
    title = json_data["role_title"]
    job = desc + " " + title
    role_ineligible_users = get_ineligible_users(json_data["role_id"])
    category = json_data["role_category"].lower()
    project_id = json_data["project_id"]
    candidates = get_input_users(category, project_id)
    removed_ineligible_candidates = {}
    for user, val in candidates.items():
        if user not in role_ineligible_users:
            removed_ineligible_candidates[user] = val
    final  = {}
    final = get_final_candidates_dict(job, removed_ineligible_candidates)
    return final

def user_values(data):
    data = str(data).replace("'", '"').replace("True", "true").replace("False", "false").replace("None", "null").replace("'", '\\"')
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
        jsonVals = str(jsonVals).replace("'", '"').replace("True", "true").replace("False", "false").replace("None", "null").replace("'", '\\"')
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
                print(percentages_dict)
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
                            print(candidates, role, project_author, role[0])
                            notify_invite_project(candidates, role, project_author, role[0])     
        return "200" 
    except Exception as e:
        print("Error in fulfill_user")
        print(e)
        return "400"

def event_match_user(jsonVals):
    complete = fulfill_user(jsonVals)
    return complete

def event_match(jsonVals):
    jsonVals = str(jsonVals).replace("'", '"').replace("True", "true").replace("False", "false").replace("None", "null").replace("'", '\\"')
    data = json.loads(jsonVals)
    candidates = fulfill_roles(data)
    return candidates

