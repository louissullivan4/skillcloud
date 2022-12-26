# notification_type = "project_inv"
#     date_created = project["project_startdate"]
#     project_id = project["project_id"]
#     read = False
#     status = "pending"
#     cursor = mydb.cursor()
#     for key, val in candidates.items():
#         sql = "SELECT * FROM notifications WHERE user_email = %s && project_id = %s"
#         cursor.execute(sql, (key, project_id))
#         row = cursor.fetchall()
#         if len(row) < 1:
#             sql = "INSERT INTO notifications (user_email, notification_type, data_created, project_id, read, status) VALUES (%s, %s, %s, %s, %s, %s)"
#             cursor.execute(sql, (key, notification_type, date_created, project_id, read, status))
#             mydb.commit()
#         elif row["status"] == "accepted":
#             print("sending to person")


## Notification DB
# Types:
# project_notify - type, project_author, user_notified, project_id, date_created, status    
