from nltk.corpus import wordnet
import sys
import math

user_words = sys.argv[1].split()

company_words = sys.argv[2].split()

baseline = ['unconventional', 'mellow', 'eclectic', 'creative', 'relaxed', 'procrastinate',
'artistic', 'intellectual', 'analytical', 'ideas', 'solver', 'thinker', 'deliberate',
'introvert', 'exacting', 'planner', 'efficient', 'follower', 'rule bound',
'routine', 'excellence', 'mainstream', 'lighthearted', 'social', 'friendly',
'balanced', 'practical', 'fun', 'simple', 'leader', 'energetic', 'party',
'animated', 'magnetic', 'extrovert', 'dramatic', 'nocturnal', 'energetic',
'spontaneous', 'physical', 'extreme', 'doer', 'action', 'daring', 'impulsive',
'compassionate', 'aware', 'introspective', 'intentional', 'helper', 'sensitive',
'relational', 'thoughtful', 'adventurous', 'charismatic', 'reliable', 'rational']

results = []
company_filtered = []

for word in company_words:
    for word2 in baseline:
        try:
            wordFromCompany = wordnet.synsets(word)
            wordFromBaseline = wordnet.synsets(word2)
        except:
            continue
        if wordFromCompany and wordFromBaseline:
            s = wordFromCompany[0].wup_similarity(wordFromBaseline[0])
            if s > 0.4:
                company_filtered.append(word)

company_filtered = set(company_filtered)

for word in user_words:
    for word2 in company_filtered:
        try:
            wordFromUser = wordnet.synsets(word)
            wordFromCompany = wordnet.synsets(word2)
        except:
            continue
        if wordFromUser and wordFromCompany:
            s = wordFromUser[0].wup_similarity(wordFromCompany[0])
            results.append(s)

total = 0
numVals = 0;
for num in results:
    if num is not None:
        total = total + num
        numVals += 1

if numVals == 0:
    print 0

avg = total / numVals
curved = 100*((avg-.22)/(.26-.22))

print(curved)
