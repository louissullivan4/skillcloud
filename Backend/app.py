from flask import Flask, request, Response
from flask_cors import CORS
import json

from project import Project
from user import User
from match_event import *
from Tools.gf import *

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
    """
    Returns the homepage
    """
    home_panes = Project()
    project_panes = home_panes.create_project_pane()
    return json.dumps(project_panes)
        
@app.route('/project/<string:id>')
def projectpage(id: str):
    """
    Returns the project page from the input id
    """
    project = Project()
    project.get_project(id)
    project_json = project.get_project_json()
    return json.dumps(project_json)

@app.route('/createproject', methods=['POST'])
def createproject():
    """
    Creates a project from the input json and returns the project created
    """
    p1 = Project()
    p1.create_project(request.json)
    projectvals = p1.get_project_json()
    return json.dumps(projectvals)

@app.route('/updateproject', methods=['POST'])
def updateproject():
    """
    Updates the project from the input json and returns the project updated
    """
    p1 = Project()
    p1.update_project(request.json)
    projectvals = p1.get_project_json()
    delete_role_notifications(projectvals)
    return json.dumps(projectvals)

@app.route('/deleteproject/<string:pid>')
def deleteproject(pid : str):
    """
    Deletes the project from the input id and returns the status code
    """
    p1 = Project()
    deleted = p1.delete_project(pid)
    if deleted == 200:
        return json.dumps({"Status Code": 200, "Message": "Success!"}), 200
    else:
        return json.dumps({"Status Code": 404, "Message": "Error!"}), 404

@app.route('/leaveproject/<string:email>/<string:pid>')
def leaveproject(email : str, pid : str):
    """
    User inputted leaves the project and returns the project
    """
    u1 = User()
    leave = u1.leave_project(email, pid)
    if leave == 200:
        p1 = Project()
        p1.get_project(pid)
        project_json = p1.get_project_json()
        return json.dumps(project_json), 200
    else:
        return json.dumps({"Status Code": 404, "Message": "Error!"}), 404

@app.route('/applyproject/<string:email>/<string:pid>')
def applyproject(email : str, pid : str):
    """
    User sends application for the inputted project
    """
    apply = apply_project(email, pid)
    if apply == 200:
        return json.dumps({"Status Code": 200, "Message": "Success!"}), 200
    else:
        return json.dumps({"Status Code": 404, "Message": "Error!"}), 404

@app.route('/closeproject/<string:pid>')
def closeproject(pid : str):
    """
    Close the input project id
    """
    p1 = Project()
    closed = p1.close_project(pid)
    if closed == 200:
        return json.dumps({"Status Code": 200, "Message": "Success!"}), 200
    else:
        return json.dumps({"Status Code": 404, "Message": "Error!"}), 404

@app.route('/eventmatch', methods=['POST'])
def eventmatchapi():
    """
    Calls the match_event function
    """
    notified = create_role_notifications(request.json)
    if notified == 200:
        return json.dumps({"Status Code": 200, "Message": "Success!"}), 200
    else:
        return json.dumps({"Status Code": 404, "Message": "Error!"}), 404
    
@app.route('/profile/<string:email>')
def profilepage(email: str):
    """
    Returns the profile page from the input email
    """
    user = User()
    user.get_user(email)
    user_json = user.get_user_json()
    return json.dumps(user_json)

@app.route('/createuser', methods=['POST'])
def createuser():
    """
    Creates a user from the input json and returns the user created
    """
    u1 = User()
    jsonvals = json.loads(request.data)
    created_user = u1.create_user(jsonvals)
    if created_user == 200:
        event_match_user(jsonvals)
        return json.dumps({"Status Code": 200, "Message": "Success!"}), 200
    elif created_user == 409:
        return json.dumps({"Status Code": 409, "Message": "User already exists!"}), 409
    else:
        return json.dumps({"Status Code": 404, "Message": "Success!"}), 404
    
@app.route('/updateuser', methods=['POST'])
def updateuser():
    """
    Updates the input use from the input json and returns the user updated
    """
    u1 = User()
    jsonvals = json.loads(request.data)
    updated_user = u1.update_user(jsonvals)
    if updated_user == 200:
        event_match_user(jsonvals)
        return json.dumps({"Status Code": 200, "Message": "Success!"}), 200
    elif updated_user == 409:
        return json.dumps({"Status Code": 409, "Message": "User did not update!"}), 409
    else:
        return json.dumps({"Status Code": 404, "Message": "Success!"}), 404

@app.route('/deleteuser/<string:email>')
def deleteuser(email : str):
    """
    Deletes the input user 
    """
    u1 = User()
    deleted = u1.delete_user(email)
    if deleted == 200:
        return json.dumps({"Status Code": 200, "Message": "Success!"}), 200
    else:
        return json.dumps({"Status Code": 404, "Message": "Error!"}), 404
    
@app.route('/inbox/<string:user>')
def inbox(user : str):
    """
    Returns the notifications for the input user
    """
    result = get_notifications(user)
    return json.dumps(result)

@app.route('/invitationresponse/<string:email>/<string:role_id>/<string:req>')
def invitationresponse(email : str, role_id : str, req : str):
    """
    Updates the invitation response for the input notification
    """
    result = notify_response_project(email, role_id, req)
    if result == 200:
        return json.dumps({"Status Code": 200, "Message": "Success!"}), 200
    elif result == 403:
        return json.dumps({"Status Code": 403, "Message": "Role is now unavailable"}), 403
    else:
        return json.dumps({"Status Code": 404, "Message": "Error!"}), 404

@app.route('/applyresponse/<string:email>/<string:user_notified>/<string:role_id>/<string:response>/')
def applyresponse(email : str, user_notified : str, role_id : str, response : str):
    """
    Updates response to project application for the input notification
    """
    result = response_apply_project(email, user_notified, role_id, response)
    if result == 200:
        return json.dumps({"Status Code": 200, "Message": "Success!"}), 200
    elif result == 403:
        return json.dumps({"Status Code": 403, "Message": "Role is now unavailable"}), 403
    else:
        return json.dumps({"Status Code": 404, "Message": "Error!"}), 404

@app.route('/rolechange/<string:email>/<string:role_id>/<string:response>')
def rolechange(email : str, role_id : str, response : str):
    """
    Updates the application response for the input notification
    """
    result = notify_role_change(email, role_id, response)
    return json.dumps(result)

@app.route('/getrole/<string:roleid>/')
def getrole(roleid : str):
    """
    Returns the role values for the input user
    """
    mydb = connect_db()
    result = get_role(mydb, roleid)
    return json.dumps(result)

if __name__ == "__main__":
    app.run(threaded=True)