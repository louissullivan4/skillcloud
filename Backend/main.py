import sqlite3
from match_skills import match_job

def get_final_candidates_dict(job, candidates):
    percentages_dict = {}
    percentages_dict = match_job(job, candidates)
    final_dict = {}
    for key, val in percentages_dict.items():
        final_dict[candidates[key-1][0]] = val
    return dict(sorted(final_dict.items(), key=lambda val: val[1]))

def get_input_users(category):
    sqliteConnection = sqlite3.connect('skillcloud.db')
    cursor = sqliteConnection.cursor()
    cursor.execute("SELECT * FROM users")
    row = cursor.fetchall()
    candidates = []
    for val in row:
        if val[12] == 'Open' and val[4] == category:
            desc = str(val[3] + " " + val[4] + " " + val[5] + " " + val[6] + " " + val[7] + " " + val[9] + " " + val[11]).replace("\n", " ").replace("\r", "").lower()
            user = [val[0], desc]
            candidates.append(user)
    return candidates


def main():
    # category = 'Information and communications technology'
    category = 'Trades workers, construction, electrical and other related'
    # job = """Backend developer with computer science degree and experience in Kubernetes for 10 years"""
    job = """Electrician with multiple year experience for private and commercial projects"""
    # person1 = ['1@gmail.com', """Computer science backend developer with 10 years in kubernetes and some frontend development in react.js. projects worked on include htp and cisco"""]
    # person2 = ['2@gmail.com', """Computer science frontend developer with experience in Docker"""]
    # person3 = ['3@gmail.com',"""Butcher with experience in business building"""]
    # candidates = [person1, person2, person3]
    final = {}
    candidates = get_input_users(category)
    final = get_final_candidates_dict(job, candidates)
    print(final)
main()