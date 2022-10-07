from cgi import test
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import nltk


nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('omw-1.4')

def tokenise_descs(val):
    return word_tokenize(val)

def remove_stopwords_datasets(val):
    sw = set(stopwords.words('english'))
    return [word for word in val if not word in sw]

def check_for_alpha(val):
    return [word for word in val if word.isalpha()]

def convert_string(val):
    return ' '.join(val)

def get_percent_match(tests):
    candidates = {}
    for val in range(len(tests)-1):
        Match_Test=[tests[0], tests[val+1]]
        count_vect = CountVectorizer()
        count_vect.fit(Match_Test)
        distance = count_vect.transform(Match_Test)
        MatchPercentage=round(cosine_similarity(distance)[0][1]*100, 2)
        print(count_vect.get_feature_names_out())
        # if MatchPercentage > 20:
        candidates[val+1] = MatchPercentage
    return candidates

def match_job(job_desc, all_candidates):
    all_candidates = [i[1] for i in all_candidates]
    job_desc = job_desc.lower()
    all_candidates.insert(0, job_desc)
    final = []
    for val in all_candidates:
        filtered = tokenise_descs(val)
        filtered = remove_stopwords_datasets(filtered)
        filtered = check_for_alpha(filtered)
        # if all_candidates.index(val) != 0:
        #     filtered =[w for w in filtered if w.lower() in job_desc]
        filtered_string = convert_string(filtered)
        final.append(filtered_string)
    final_percent_dict = get_percent_match(final)
    return final_percent_dict
