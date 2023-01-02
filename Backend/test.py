# from datetime import date
# from db_connect import connect_db
# import json

# from match_event import event_match
# from project import Project
# from notification_service import *
# mydb = connect_db()

# def notify_role_change(user_email, role_id, req):
#     cursor = mydb.cursor()
#     sql = "SELECT roles.role_no_needed, roles.roles_filled FROM roles WHERE role_id = %s"
#     cursor.execute(sql, (role_id, ))
#     row = cursor.fetchone()
#     try:
#         cursor = mydb.cursor()
#         if req == "add" and int(row[1]) < int(row[0]):
#             sql = "DELETE FROM ineligible WHERE user_email = %s"
#             cursor.execute(sql, (user_email, ))
#             sql = "UPDATE notifications SET status = %s WHERE role_id = %s && user_notified = %s"
#             cursor.execute(sql, ("accepted", role_id, user_email))
#             sql = "UPDATE roles SET roles_filled = %s WHERE role_id = %s"
#             val = int(row[1]) + 1
#             cursor.execute(sql, (str(val), role_id))
#         elif req == "remove":
#             if int(row[1]) == 0:
#                 val = 0
#             else:
#                 val = int(row[1]) - 1
#             print(val)
#             sql = "INSERT INTO ineligible (user_email, role_id) VALUES (%s, %s)"
#             cursor.execute(sql, (user_email, role_id))
#             sql = "UPDATE notifications SET status = %s WHERE role_id = %s && user_notified = %s"
#             cursor.execute(sql, ("declined", role_id, user_email))
#             sql = "UPDATE roles SET roles_filled = %s WHERE role_id = %s"
#             cursor.execute(sql, (str(val), role_id))
#             sql = "SELECT roles.role_no_needed, roles.roles_filled FROM roles WHERE role_id = %s"
#             cursor.execute(sql, (role_id, ))
#             total = cursor.fetchone()
#             total_needed = int(total[0]) - int(total[1])
#             if total_needed > 0:
#                 sql = "SELECT roles.project_id FROM roles WHERE role_id = %s"
#                 cursor.execute(sql, (role_id, ))
#                 row = cursor.fetchone()
#                 project_id = str(row[0])
#                 p1 = Project()
#                 p1.get_project(project_id)
#                 project_json = p1.get_project_json()
#                 candidates = event_match(project_json)
#                 if len(candidates) > 0:
#                     create_role_notifications(candidates, project_json)
#                 else:
#                     print("No candidates")
#         mydb.commit()
#         return 200
#     except Exception as e:
#         print(e)
#         return 404


# print(notify_role_change("billy@gmail.com", "01334698", "remove"))

# candidates = {'billy@gmail.com': 19.38, 'timmy@gmail.com': 5.866}
# role = {
#     "role_category" : "Other",
#     "role_title" : "Host",
#     "role_desc" : "Need host with time spent in presenting news on a weekly basis. Degree in journalism preferred but not required. Preferred area in technology but also not required",
#     "role_no_needed" : "2",
#     "role_id" : "00550596",
#     "role_filled" : "1"
# }
# project_author = "louis@gmail.com"
# project_id = "05847316"
# print(notify_invite_project(candidates, role, project_author, project_id))
