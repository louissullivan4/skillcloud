responsejson = {'roles': [{'role_category': '1', 'role_title': '', 'role_desc': '', 'role_no_needed': ''}, {'role_category': '', 'role_title': '', 'role_desc': '', 'role_no_needed': ''}], 'project_author': 'test@gmail.com'}
#get roles area into a list
roles = responsejson['roles']
keys = ['project_title', 'project_author', 'project_startdate', 'project_enddate', 'project_summary', 'roles']
for key in keys:
    if key not in responsejson:
        print('Error keys')
for key, val in responsejson.items():
    print(key, val)
    if val == "":
        print('Error vals')
for val in roles:
    if val.get('role_category') == "" or val.get('role_title') == "" or val.get('role_desc') == "" or val.get('role_no_needed') == "":
        print('Error roles')
