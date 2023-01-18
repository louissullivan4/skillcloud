from match_skills import match_skills
from db_connect import connect_db
from notification_service import notify_invite_project
import json

# mydb = connect_db()
# cursor = mydb.cursor()
# sql = """Update roles SET project_id = %s, role_category = %s, role_title = %s, role_desc = %s, roles_filled = %s, role_no_needed = %s, role_remote = %s WHERE role_id = %s"""
# values = ('01766992', 'Information and communications technology', 'Software Developer', 'Software Developer who likes kubernetes', '0', '2', 'Yes', '11111111')
# cursor.execute(sql, values)
