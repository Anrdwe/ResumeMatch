from flask import Flask
from flask import request
from flask_cors import CORS
from werkzeug.utils import secure_filename
from parserFnc import Parser
from comparer import Comparer
from analyzer import ResumeAnalyzer
from pdfminer import high_level
from dotenv import load_dotenv
import json
import psycopg2
import os
import sys
import signal


load_dotenv()
p = Parser()
c = Comparer(p, 20000)
a = ResumeAnalyzer(p)
app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = os.path.join('.','static','pdfs')
ALLOWED_EXTENSIONS = { 'pdf'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload', methods=['POST'])
def upload():

    if 'file' not in request.files:
        return { "error": 'no file submitted.' }
    if 'query' not in request.files:
        return { "error": "no query found." }

    file = request.files['file']
    query = json.loads(request.files['query'].read().decode('utf-8'))
    if file.filename == '':
        return {"error":"no file selected"}
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        save_location = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(save_location)
        txt = high_level.extract_text(save_location)
    else:
        return {"error":"no work"}
    try:
        c.addResume(txt)

        conn = psycopg2.connect("{}".format(os.getenv("URI"))) 
        cur = conn.cursor()


        cur.execute("SELECT * FROM jobs LIMIT 0;")
        colnames = [desc[0] for desc in cur.description]
        
        cur.execute("Select * FROM jobs;")
        results = []

        for row in cur:
            indRes = {}
            for i, colName in enumerate(colnames):
                indRes[colName] = row[i]
            c.addJobDesc(row[1])
            indRes['grade'] = (c.compareResumeToJob())
            results.append(indRes)
        conn.close()
        print(save_location)
        os.remove(save_location)
        return {"data": results}
    except Exception as e:
        print("Error occured, closing connection.")
        print(e)
        conn.close()
        return "Error occured"
    print(save_location)
    os.remove(save_location)
    return results
    

"""
Format: {"resume": "..."}
"""
@app.route('/api/testParser', methods=['POST'])
def testParser():
    try :
        conn = psycopg2.connect("{}".format(os.getenv("URI"))) 
        cur = conn.cursor()

        cur.execute("Select * FROM jobs LIMIT 0")
        colnames = [desc[0] for desc in cur.description]
        
        cur.execute("SELECT * FROM jobs;")

        reqJSON = request.json
        results = []
        c.addResume(reqJSON['resume'])
        for row in cur:
            indRes = {}
            for i, colName in enumerate(colnames):
                indRes[colName] = row[i]
            c.addJobDesc(row[1])
            indRes['grade'] = (c.compareResumeToJob())
            results.append(indRes)
        conn.close()
        return {"data": results}
    except Exception as e:
        print("Error occured, closing connection.")
        print(e)
        conn.close()
        return "Error occured"

"""
Format: {"resume": "..."}
"""
@app.route('/api/upload/analyze', methods=['POST'])
def keywordCategory():
    resJSON = request.json
    a.addResume(resJSON['resume'])
    res = a.analyzeResume()
    return res


if __name__ == "__main__":
    app.run()