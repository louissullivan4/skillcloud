
# from project import Project
# from Tools.gf import *
# from db_connect import connect_db, clear_dbs
# from notification_service import *
# from match_event import *
# mydb = connect_db()
# clear_dbs(mydb)

# jsonVals = {'roles': [{'role_category': 'Information and communications technology', 'role_title': 'Software Engineer (App Development)', 'role_desc': 'A developer who has experience in IOS app development. Must have good knowledge on data basing practices too.', 'role_no_needed': '4', 'role_remote': 'Yes'}, {'role_category': 'Information and communications technology', 'role_title': 'UX Designer', 'role_desc': 'A designer with proven work in mobile or web application design. Portfolio required.', 'role_no_needed': '2', 'role_remote': 'Yes'}, {'role_category': 'Business and administration professionals', 'role_title': 'Digital Marketing Strategist', 'role_desc': 'A person who has experience working with social media advertising. Fitness advertising is a want but not a need.', 'role_no_needed': '1', 'role_remote': 'Yes'}], 'project_author': 'sullivanlouis0@gmail.com', 'project_title': 'Gym Workout Application', 'project_summary': 'The application will provide users with user generated programs that will create a self sustaining ecosystem of new workouts for fitness, bodybuilding or any other type of sport. It will allow users to stay consistent with set plans and how to adjust the workout to cater for their needs.', 'project_startdate': '2023-02-01', 'project_enddate': '2023-08-01', 'project_city': 'Cork', 'project_country': 'Ireland'}

# p1 = Project()
# p1.create_project(jsonVals)
# projectvals = p1.get_project_json()
# notified = create_role_notifications(projectvals)
