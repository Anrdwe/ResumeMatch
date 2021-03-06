from parserFnc import Parser
from scipy.special import softmax

class ResumeAnalyzer:

    def __init__(self, parser, minFreq=0):
        self.parser = parser
        self.minFreq = minFreq
        self.resume = None

    def addResume(self, resumeStr):
        self.resume = resumeStr

    def analyzeResume(self):
        categoryKwds = self.parser.categoryKwds
        resumeKwds = self.parser.findKeywords(self.resume)

        kwds_score = {}

        for kwd in resumeKwds:
            kwds_score[kwd] = [None for i in range(len(categoryKwds.keys()))]
            categories = categoryKwds.keys()
            for idx, cat in enumerate(categories):
                if kwd in categoryKwds[cat]:
                    kwds_score[kwd][idx] = categoryKwds[cat][kwd]
                else:
                    kwds_score[kwd][idx] = 0

        for kwd in kwds_score.keys():
            kwds_score[kwd] = list(softmax(kwds_score[kwd]))
        return kwds_score

# r = ResumeAnalyzer()
# r.addResume("java")

# l = r.analyzeResume()
# for kwd in l.keys():
#     print(l[kwd])