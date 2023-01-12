from datetime import date
from db_connect import connect_db
from Tools.gf import check_id
import json

mydb = connect_db()

def add_message(new_msg):
    cursor = mydb.cursor()
    try:
        for row in new_msg["new_messages"]:
            msg_id = check_id(mydb)
            sender = row['sender']
            receiver = row['receiver']
            date = row['date']
            time = row['time']
            content = row['content']
            sql = "INSERT INTO messages (message_id, sender, receiver, date, time, content) VALUES (%s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, (msg_id, sender, receiver, date, time, content))
            mydb.commit()
        return 200
    except Exception as e:
        print(e)
        return 404
    

def get_msg_history(sender, receiver):
    cursor = mydb.cursor()
    msg_json = []
    sql = """
        SELECT * FROM messages WHERE `sender` = %s &&  `receiver` = %s
        UNION SELECT * FROM messages WHERE `sender` = %s &&  `receiver` = %s
        order by date asc, time asc"""
    cursor.execute(sql, (sender, receiver, receiver, sender))
    result = cursor.fetchall()
    for row in result:
        msg_json.append({"message_id": row[0], "sender": row[1], "receiver": row[2], "date": row[3], "time": row[4], "content": row[5]})
    return {"result": msg_json}
    

# json_data = {"new_messages" : [{'sender': 'jim@gmail.com', 'receiver': 'admin@gmail.com', 'date': '2023-01-11', 'time': '20:14:15', 'content': 'Wow my message was added'}]}
# add_message(json_data)
get_msg_history("sullivanlouis0@gmail.com", "admin@gmail.com")