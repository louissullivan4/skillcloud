from flask import Flask
from flask_cors import CORS

import json

from Classes.project import Project

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


if __name__ == "__main__":
    app.run()