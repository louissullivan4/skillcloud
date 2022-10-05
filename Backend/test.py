from traceback import print_tb
from db_connect import connect_db
import json

mydb = connect_db()
num=20
cursor = mydb.cursor()
sql = "SELECT project_id, project_title, project_summary, project_state state FROM projects ORDER BY project_createdate DESC LIMIT %s"
cursor.execute(sql, (num, ))
row = cursor.fetchall()
if row == None:
    print("Error! No projects exist.")
else:
    """make json array inside json object from each project"""
    projects = []
    for project in row:
        project_id = project[0]
        project_title = project[1]
        project_summary = project[2]
        project_state = project[3]
        project_json = {"id":project_id, "title":project_title, "summary":project_summary, "state":project_state}
        projects.append(project_json)
    projects_json = {"Status Code": 200, "result":projects}
    print(projects_json)