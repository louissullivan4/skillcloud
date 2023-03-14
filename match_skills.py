import spacy
from spacy.matcher import PhraseMatcher

from skillNer.general_params import SKILL_DB
from skillNer.skill_extractor_class import SkillExtractor

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def load_skill_extractor():
    try:
        nlp = spacy.load("en_core_web_md")
    except:
        spacy.cli.download("en_core_web_md")
        nlp = spacy.load("en_core_web_md")
    skill_extractor = SkillExtractor(nlp, SKILL_DB, PhraseMatcher)
    return skill_extractor

def skill_identifier(text_desc, skill_extractor):
    annotations = skill_extractor.annotate(text_desc)
    results = annotations["results"]
    skills_list = []
    for val in results["ngram_scored"]:
        if val["doc_node_value"] not in skills_list:
            skills_list.append(val["doc_node_value"])
    return ' '.join(skills_list)

def match_skills(job_desc, candidates):
    final_candidates = {}
    skill_extractor = load_skill_extractor()
    job_skills = skill_identifier(job_desc, skill_extractor)
    for name, profile in candidates.items():
        candidate_skills = skill_identifier(profile, skill_extractor)
        Match_Test=[job_skills, candidate_skills]
        count_vect = CountVectorizer()
        count_vect.fit(Match_Test)
        distance = count_vect.transform(Match_Test)
        MatchPercentage=round(cosine_similarity(distance)[0][1]*100, 2)
        final_candidates[name] = MatchPercentage
    return final_candidates