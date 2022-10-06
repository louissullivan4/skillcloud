from match_skills import match_job
from Database.db_connect import connect_db

mydb = connect_db()

def get_final_candidates_dict(job, candidates):
    percentages_dict = {}
    percentages_dict = match_job(job, candidates)
    final_dict = {}
    for key, val in percentages_dict.items():
        final_dict[candidates[key-1][0]] = val
    return dict(sorted(final_dict.items(), key=lambda val: val[1]))

def get_input_users(category):
    cursor = mydb.cursor()
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
    category = 'Trades workers, construction, electrical and other related'
    job = """Electrician with multiple year experience for private and commercial projects"""
    final = {}
    candidates = get_input_users(category)
    final = get_final_candidates_dict(job, candidates)
    print(final)
main()