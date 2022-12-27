from flask import Flask, request
from flask_cors import CORS
from flask_api import status


import json

from project import Project
from user import User
from auth_login import auth_user
from match_event import event_match
from notification_service import get_notifications, notify_response_project

app = Flask(__name__)
CORS(app)

@app.route('/')
def welcome():  
    homepage = """
        <br>
        <p>Welcome to SkillCloud's backend server.</p>
        <br>
    """
    return homepage

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['user']
    pwd = data['pwd']
    resp = auth_user(email, pwd)
    if resp == 200:
        return "User login details were correct.", status.HTTP_200_OK
    elif resp == 401:
        return "User login details were incorrect.", status.HTTP_401_UNAUTHORIZED
    else:
        return "Server error has occurred.", status.HTTP_500_INTERNAL_SERVER_ERROR

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
    created = p1.create_project(request.json)
    print(request.json)
    candidates = event_match(request.json)
    print(candidates)
    # notified = notify_user(candidates, created[1])
    # if created[0] != 200:
    #     return json.dumps({"Status Code": 200, "Message": "Success!"})
    # else:
    #     return json.dumps({"Status Code": 404, "Message": "Error!"})

@app.route('/profile/<string:email>')
def profilepage(email: str):
    user = User()
    user.get_user(email)
    user_json = user.get_user_json()
    return json.dumps(user_json)

@app.route('/register', methods=['POST'])
def register_user():
    u1 = User()
    created = u1.register_user(request.json)
    if created == 200:
        return json.dumps({"Status Code": 200, "Message": "Success!"})
    elif created == 409:
        return json.dumps({"Status Code": 409, "Message": "User already exists!"})
    else:
        return json.dumps({"Status Code": 404, "Message": "Error!"})

@app.route('/createuser', methods=['POST'])
def createuser():
    u1 = User()
    created = u1.create_user(request.json)
    if created != 200:
        return json.dumps({"Status Code": 404, "Message": "Error!"})
    else:
        return json.dumps({"Status Code": 200, "Message": "Success!"})
    
    
@app.route('/inbox/<string:user>')
def inbox(user : str):
    result = get_notifications(user)
    return json.dumps(result)

@app.route('/invitationresponse/<string:email>/<string:project_id>/<string:response>')
def invitationresponse(email : str, project_id : str, response : str):
    result = notify_response_project(email, project_id, response)
    return json.dumps(result)

if __name__ == "__main__":
    app.run()