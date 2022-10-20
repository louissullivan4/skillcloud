from flask import Flask, request
from flask_cors import CORS
import json

from project import Project
from user import User

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

@app.route('/home')
def homepage():
    home_panes = Project();
    project_panes = home_panes.create_project_pane()
    return json.dumps(project_panes)
        
@app.route('/project/<string:id>')
def projectpage(id: str):
    project = Project();
    project.get_project(id)
    project_json = project.get_project_json()
    return json.dumps(project_json)

@app.route('/createproject', methods=['POST'])
def createproject():
    p1 = Project();
    created = p1.create_project(request.json)
    if created != 200:
        return json.dumps({"Status Code": 200, "Message": "Success!"})
    else:
        return json.dumps({"Status Code": 404, "Message": "Error!"})

@app.route('/profile/<string:email>')
def profilepage(email: str):
    user = User();
    user.get_user(email)
    user_json = user.get_user_json()
    return json.dumps(user_json)

@app.route('/createuser', methods=['POST'])
def createuser():
    u1 = User();
    created = u1.create_user(request.json)
    if created != 200:
        return json.dumps({"Status Code": 200, "Message": "Success!"})
    else:
        return json.dumps({"Status Code": 404, "Message": "Error!"})



if __name__ == "__main__":
    app.run()