from cgi import test
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import nltk


# nltk.download('punkt')
# nltk.download('stopwords')
# nltk.download('wordnet')
# nltk.download('omw-1.4')

def tokenise_descs(val):
    return word_tokenize(val)

def remove_stopwords_datasets(val):
    sw = set(stopwords.words('english'))
    return [word for word in val if not word in sw]

def check_for_alpha(val):
    return [word for word in val if word.isalpha()]

def convert_string(val):
    return ' '.join(val)

def get_percent_match(desc, test):
    candidates = {}
    for key, val in test.items():
        Match_Test=[desc, val]
        count_vect = CountVectorizer()
        count_vect.fit(Match_Test)
        distance = count_vect.transform(Match_Test)
        MatchPercentage=round(cosine_similarity(distance)[0][1]*100, 2)
        # print(count_vect.get_feature_names_out())
        # if MatchPercentage > 20:
        candidates[key] = MatchPercentage
    return candidates

def match_job(job_desc, all_candidates):
    job_desc = job_desc.lower()
    final = {}
    for key, val in all_candidates.items():
        filtered = tokenise_descs(val)
        filtered = remove_stopwords_datasets(filtered)
        filtered = check_for_alpha(filtered)
        # if all_candidates.index(val) != 0:
        #     filtered =[w for w in filtered if w.lower() in job_desc]
        filtered_string = convert_string(filtered)
        final[key] = filtered_string
    final_percent_dict = get_percent_match(job_desc, final)
    return final_percent_dict
