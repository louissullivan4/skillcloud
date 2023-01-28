from flask import Flask, request, Response
from flask_cors import CORS
from flask_api import status

import json

from project import Project
from user import User
from notification_service import *
from match_event import *

app = Flask(__name__)
CORS(app)

@app.route('/')
def welcome():  
    homepage = """
        <br>
        <p>Welcome to SkillCloud's backend server.</p>
        <br>
    """
    connect_db()
    return homepage

@app.route('/home')
def homepage():
    home_panes = Project()
    project_panes = home_panes.create_project_pane()
    return json.dumps(project_panes)
        
@app.route('/project/<string:id>')
def projectpage(id: str):
    project = Project()
    project.get_project(id)
    project_json = project.get_project_json()
    return json.dumps(project_json)

@app.route('/updateproject', methods=['POST'])
def updateproject():
    p1 = Project()
    p1.update_project(request.json)
    projectvals = p1.get_project_json()
    notified = create_role_notifications(projectvals)
    if notified == 200:
        return json.dumps({"Status Code": 200, "Message": "Success!"}), 200
    else:
        return json.dumps({"Status Code": 404, "Message": "Error!"}), 404

@app.route('/createproject', methods=['POST'])
def createproject():
    p1 = Project()
    p1.create_project(request.json)
    projectvals = p1.get_project_json()
    notified = create_role_notifications(projectvals)
    if notified == 200:
        return json.dumps({"Status Code": 200, "Message": "Success!"})
    else:
        return json.dumps({"Status Code": 404, "Message": "Error!"})
    
@app.route('/profile/<string:email>')
def profilepage(email: str):
    user = User()
    user.get_user(email)
    user_json = user.get_user_json()
    return json.dumps(user_json)

@app.route('/currentProjects/<string:email>')
def currentProjects(email: str):
    user = User()
    u1 = user.get_user(email)
    user_json = user.get_current_projects(email)
    return json.dumps(user_json)

@app.route('/ownedProjects/<string:email>')
def ownedProjects(email: str):
    user = User()
    user_json = user.get_owned_projects(email)
    return json.dumps(user_json)

@app.route('/createuser', methods=['POST'])
def createuser():
    u1 = User()
    created_user = u1.create_user(request.json)
    if created_user == 200:
        event_match_user(request.json)
        return json.dumps({"Status Code": 200, "Message": "Success!"}), 200
    elif created_user == 409:
        return json.dumps({"Status Code": 409, "Message": "User already exists!"}), 409
    else:
        return json.dumps({"Status Code": 404, "Message": "Success!"}), 404
    
@app.route('/updateuser', methods=['POST'])
def updateuser():
    u1 = User()
    data = request.json
    data = str(data).replace("'", '"').replace("True", "true").replace("False", "false").replace("None", "null").replace("'", '\\"')
    new = json.loads(data)
    updated_user = u1.update_user(new)
    if updated_user == 200:
        event_match_user(data)
        return json.dumps({"Status Code": 200, "Message": "Success!"}), 200
    elif updated_user == 409:
        return json.dumps({"Status Code": 409, "Message": "User didnt update!"}), 409
    else:
        return json.dumps({"Status Code": 404, "Message": "Success!"}), 404
    
@app.route('/inbox/<string:user>')
def inbox(user : str):
    result = get_notifications(user)
    return json.dumps(result)

@app.route('/invitationresponse/<string:email>/<string:role_id>/<string:req>')
def invitationresponse(email : str, role_id : str, req : str):
    result = notify_response_project(email, role_id, req)
    if result == 200:
        return json.dumps({"Status Code": 200, "Message": "Success!"}), 200
    elif result == 403:
        return json.dumps({"Status Code": 403, "Message": "Role is now unavailable"}), 403
    else:
        return json.dumps({"Status Code": 404, "Message": "Error!"}), 404

@app.route('/rolechange/<string:email>/<string:role_id>/<string:response>')
def rolechange(email : str, role_id : str, response : str):
    result = notify_role_change(email, role_id, response)
    return json.dumps(result)

if __name__ == "__main__":
    app.run(threaded=True)