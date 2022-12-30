from db_connect import connect_db

mydb = connect_db()

def notify_role_change(user_email, role_id, req):
    try:
        cursor = mydb.cursor()
        if req == "add":
            sql = "DELETE FROM ineligible WHERE user_email = %s"
            cursor.execute(sql, (user_email, ))
            mydb.commit()
        elif req == "remove":
            sql = "INSERT INTO ineligible (user_email, role_id) VALUES (%s, %s)"
            cursor.execute(sql, (user_email, role_id))
            mydb.commit()
        return 200
    except Exception as e:
        return 404, e

notify_role_change("billy@gmail.com", "00550596", "remove")