from parserFnc import Parser

class Comparer:

    def __init__(self, parser, minFreq=0):
        self.parser = parser
        self.minFreq = minFreq
        self.resume = None
        self.jobDesc = None
        self.jobKeywordsFreq = None
        self.resumeKeywordsFreq = None

    def addResume(self, resumeStr):
        self.resume = resumeStr

    def addJobDesc(self, jobStr):
        self.jobDesc = jobStr

    def addResumeJobDesc(self, resumeStr, jobStr):
        self.resume = resumeStr
        self.jobDesc = jobStr

    def compareResumeToJob(self):
        self.jobKeywordsFreq = self.parser.findKeywords(self.jobDesc, self.minFreq)
        self.resumeKeywordsFreq = self.parser.findKeywords(self.resume, self.minFreq)
        
        total = len(self.jobKeywordsFreq.keys())
        if total == 0:
            return 0
        matches = 0
        for kwd in self.resumeKeywordsFreq.keys():
            if kwd in self.jobKeywordsFreq:
                matches += 1
        return matches/total


# c = Comparer()
# jobDesc = """
# Practical experience in web front-end development for at least 5 years
# Expertise in at least one of the technologies listed below (Vue.js is prefered) :
#     Vue.js
#     Angular
#     ReactJS node.js ReactJs
#     devops
# """
# resume1 = "I have vuejs, angular and devops and development nodejs experience!"
# resume2 = "I love devops, kubernetes and docker! I did a little of reactjs"
# c.addJobDesc(jobDesc)
# c.addResume(resume1)
# print(c.compareResumeToJob())
# c.addResume(resume2)
# print(c.compareResumeToJob())