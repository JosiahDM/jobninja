from nltk.corpus import wordnet
import sys

list1 = sys.argv[1].split()
list2 = sys.argv[2].split()

results = []

for word1 in list1:
    for word2 in list2:
        wordFromList1 = wordnet.synsets(word1)
        wordFromList2 = wordnet.synsets(word2)
        if wordFromList1 and wordFromList2:
            s = wordFromList1[0].wup_similarity(wordFromList2[0])
            results.append(s)

results = sorted(results, reverse=True)[:5]
total = 0
numVals = 0;
for num in results:
    if num is not None:
        total = total + num
        numVals += 1

avg = total / numVals
normalized = avg / .5
if normalized > 1:
    normalized = 1

print(normalized)
