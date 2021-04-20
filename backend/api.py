from flask import *
from flask_cors import CORS
from util.scrape import crawl
import requests
import mysql.connector
import os

app = Flask(__name__)
CORS(app)

@app.route('/scrape')
def scrape():
    job_list = []
    keywords = ['Software', 'data science', 'Data Science', 'Data science', 'software', 'machine learing', 'intern', 'backend', 'frontend', 'ios', 'android', 'flutter']
    crawl(request.args["url"], keywords, job_list)
    return json.dumps(job_list)

@app.route('/onboard/contact', methods=['POST'])
def onboardContact():
	res = {}
	try:
		request_params = request.get_json()
		conn = get_connection_to_db()
		cursor = conn.cursor()

		insert_statement = 'INSERT INTO Contact_Info (FullName, Email, PhoneNum, Website, LinkedIn, Github) VALUES (%s, %s, %s, %s, %s, %s)'
		values_to_insert = (request_params['name'], request_params['email'], request_params['phone'], request_params['website'], request_params['linkedin'], request_params['github'])

		cursor.execute(insert_statement, values_to_insert)
		conn.commit()

		cursor.close()
		conn.close()

		res['status'] = flask.Response(status=200)
		res['message'] = 'Contact successfully added'

	except Exception as e:
		res['status'] = flask.Response(status=400)
		res['message'] = 'Could not add user contact'
		res['error'] = str(e)
	
	finally:
		return res

@app.route('/onboard/education', methods=['POST'])
def onboardEducation():
	res = {}
	try:
		request_params = request.get_json()['degree']
		conn = get_connection_to_db()
		cursor = conn.cursor()

		insert_statement = 'INSERT INTO Education (NameofSchool, LocationSchool, Degree, FieldOfStudy, GPA, Honors, CourseWork, Activities, Achievements, Email, EndDate, StartDate) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
		values_to_insert = (request_params['school'], 'USA', request_params['degree'], request_params['field_of_study'], request_params['gpa'], '', '', '', '', 'xyz@gmail.com', request_params['graduation_date'], request_params['start_date'])

		cursor.execute(insert_statement, values_to_insert)
		conn.commit()

		cursor.close()
		conn.close()

		res['status'] = flask.Response(status=200)
		res['message'] = 'Education successfully added'

	except Exception as e:
		res['status'] = flask.Response(status=400)
		res['message'] = 'Could not add user education'
		res['error'] = str(e)
	
	finally:
		print(res)
		return res

@app.route('/onboard/experience', methods=['POST'])
def onboardExperience():
	res = {}
	print(request.get_json())
	try:
		request_params = request.get_json()['position']
		conn = get_connection_to_db()
		cursor = conn.cursor()

		insert_statement = 'INSERT INTO Experience (CompanyName, Position, Achievements, StartDate, EndDate) VALUES (%s, %s, %s, %s, %s)'
		values_to_insert = (request_params['company'], request_params['position'],  request_params['relevant_achievements'], request_params['start_date'], request_params['end_date'])

		cursor.execute(insert_statement, values_to_insert)
		conn.commit()

		cursor.close()
		conn.close()

		res['status'] = flask.Response(status=200)
		res['message'] = 'Education successfully added'

	except Exception as e:
		res['status'] = flask.Response(status=400)
		res['message'] = 'Could not add user education'
		res['error'] = str(e)
	
	finally:
		print(res)
		return res

@app.route('/onboard/skills', methods=['POST'])
def onboardSkills():
	print(request.get_json())
	# TODO: commit to db when cloud team creates DB schema
	return 'skills added successfully'

@app.route('/onboard/project', methods=['POST'])
def onboardProject():
	print(request.get_json())
	# TODO: commit to db when cloud team creates DB schema
	return 'projects added successfully'

def get_connection_to_db():
	try:
		conn = mysql.connector.connect(
			host='cs160.cri3ntizyxvg.us-east-2.rds.amazonaws.com',
			user='admin',
			password='Appli2020',
			database='Robin'
		)
		return conn
	except Exception as e:
		print('stress in connecting to db')
		print(e)


if __name__ == "__main__":
	app.run()
