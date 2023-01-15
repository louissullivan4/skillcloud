from flask import Flask, request
from flask_cors import CORS
from flask_api import status

import json

from project import Project
from user import User
from notification_service import *
from match_event import *
from messages import *

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

@app.route('/chat/<string:sender>/<string:receiver>')
def msghistory(sender: str, receiver: str):
    msg_json = get_msg_history(sender, receiver)
    print(msg_json)
    return json.dumps(msg_json)

@app.route('/contacts/<string:email>')
def contacts(email: str):
    contacts_json = get_contacts(email)
    return json.dumps(contacts_json)

@app.route('/updateMsg', methods=['POST'])
def updateMsg():
    added = add_message(request.json)
    if added == 200:
        return json.dumps({"Status Code": 200, "Message": "Success!"}), 200
    else:
        return json.dumps({"Status Code": 404, "Message": "Error!"}), 404




if __name__ == "__main__":
    app.run()