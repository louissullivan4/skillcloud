from datetime import date
from db_connect import connect_db
import json

from match_event import event_match
from user import User
mydb = connect_db()

def createuser(json1):
    u1 = User()
    print(json1)
    created = u1.create_user(json1)
    print(created)
    if created == 200:
        return json.dumps({"Status Code": 200, "Message": "Success!"}), 200
    elif created == 409:
        return json.dumps({"Status Code": 409, "Message": "User already exists!"}), 409
    else:
        return json.dumps({"Status Code": 404, "Message": "Success!"}), 404

# json1 = {
#     "fname":"Henry",
#     "lname":"English",
#     "city":"London",
#     "country":"United Kingdom",
#     "title":"English Teacher",
#     "category":"Teaching professionals",
#     "desc":"Dedicated and professional English and modern languages tutor with strong communication skills now seeking a graduate teaching assistant role. I am an Oxford University graduate with a 2:2 in French and Spanish, combined with on-going school experience, demonstrating excellent leadership, organisation and planning skills. Living and teaching in France during the university placement year fostered a love of teaching, making a difference in the lives of those students who may not believe they have the potential to achieve.",
#     "certs":[
#        {
#           "certName":"English Language Assistant ELA"
#        }
#     ],
#     "email":"henry@gmail.com",
#     "education":[
#        {
#           "edu_type":"BA",
#           "edu_degree":"French and Spanish",
#           "edu_school":"University of Oxford",
#           "edu_desc":"Year 4 modules included, advanced language skills (French and Spanish), European culture, French literature"
#        },
#        {
#           "edu_type":"A-levels",
#           "edu_degree":"English Literature, Spanish, French",
#           "edu_school":"Queen Mary's College, Cheltenham",
#           "edu_desc":"English Literature (A) Spanish (A) French (A)"
#        }
#     ],
#     "experience":[
#        {
#           "experience_name":"Gloucester Tuition Center",
#           "experience_title":"English Tutor",
#           "experience_start":"2018-01-01",
#           "experience_end":"2023-01-04",
#           "experience_desc":"Tutoring adults and schoolchildren preparing for GCSE and A-level languages alongside managing a small team has helped me to develop good leadership and management skills. Experience of successfully motivating staff and students to get better results has broadened my knowledge of teaching techniques and strategies to get better results. I was responsible for devising a comprehensive learning programme specifically tailored to the individual requirements of each student, this includes planning lessons, keeping records, assessing and analysing work. The role also entails drawing on strong communication skills to provide tutees with practical and pastoral support throughout their educational or professional careers."
#        }
#     ]
#  }
# print(createuser(json1))