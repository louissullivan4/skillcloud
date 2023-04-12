import spacy
from spacy.matcher import PhraseMatcher

from skillNer.general_params import SKILL_DB
from skillNer.skill_extractor_class import SkillExtractor

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def load_skill_extractor():
    """
    Loads the skill extractor model
    """
    try:
        nlp = spacy.load("en_core_web_md")
    except:
        spacy.cli.download("en_core_web_md")
        nlp = spacy.load("en_core_web_md")
    skill_extractor = SkillExtractor(nlp, SKILL_DB, PhraseMatcher)
    return skill_extractor

def skill_identifier(text_desc, skill_extractor):
    """
    Identifies the skills from the text description
    """
    annotations = skill_extractor.annotate(text_desc)
    results = annotations["results"]
    skills_list = []
    for val in results["ngram_scored"]:
        # Extracts the specific skills found from the result json
        if val["doc_node_value"] not in skills_list:
            skills_list.append(val["doc_node_value"])
    return ' '.join(skills_list)

def match_skills(job_desc, candidates):
    """
    Finds the match percentage between the job description and the candidate profiles 
    and returns the final candidates dictionary of these results
    """
    final_candidates = {}
    # Loads the skill extractor model
    skill_extractor = load_skill_extractor()
    # Identifies the skills from the job description
    job_skills = skill_identifier(job_desc, skill_extractor)
    for name, profile in candidates.items():
        # Identifies the skills from the candidate profile
        candidate_skills = skill_identifier(profile, skill_extractor)
        # Create a list of lists of the job description and candidate profile
        Match_Test=[job_skills, candidate_skills]
        # Create a count vectorizer object
        count_vect = CountVectorizer()
        # Fit the count vectorizer object to the list of lists
        count_vect.fit(Match_Test)
        # Transform the list of lists into a matrix
        distance = count_vect.transform(Match_Test)
        # Calculate the cosine similarity of the matrix output a percentage similarity
        MatchPercentage=round(cosine_similarity(distance)[0][1]*100, 2)
        # Add the candidate name and match percentage to the final candidates dictionary
        final_candidates[name] = MatchPercentage
    return final_candidates