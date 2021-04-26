from flask import *
from flask_cors import CORS
from util.scrape import crawl
from util.sort import sort_job_list
from util.sort import sort_experiences
from util.sort import sort_projects
import requests
import mysql.connector
import os

app = Flask(__name__)
user_email = 'clouduser@gmail.com'
CORS(app)

@app.route('/scrape')
def scrape():
	'''
    job_list = [{'Title': 'Software Engineer 1', 'Company': 'Adobe', 'Description': 'Strong hands-on experience with Java Experience with MongoDB, Kafka Problem solving skills & technical troubleshooting Experience with testing frameworks, continuous integration and build tools'}, 
                {'Title': 'Software Developer', 'Company': 'Sleep Number Labs', 'Description': 'Learn how to work with Python and FLASK, Willing to work in a team atmosphere, C++, Node'},
                {'Title': 'Product Marketing Intern', 'Company': 'Ring Central', 'Description': 'Digital Marketing, Instagram Facebook, Mailchimp'},
                {'Title': 'Senior Software Engineer', 'Company': 'IBM', 'Description': 'React JS, Node JS, Frontend development experience, Database Mangement, SQL, MySQL'}]'''
	job_list = []
	keywords = ['Software', 'data science', 'Data Science', 'Data science', 'software', 'machine learing', 'intern', 'backend', 'frontend', 'ios', 'android', 'flutter']
	crawl(request.args["url"], keywords, job_list)

	user_data = {}
	skills_data = get_skills()
	experience_data = get_experience()
	projects_data = get_projects()

	user_data['skills'] = skills_data['data']['skills']
	user_data['experience'] = experience_data['data']
	user_data['projects'] = projects_data['data']

	job_list = sort_job_list(user_data, job_list)

	for job in job_list:
		del job['links']

	return json.dumps(job_list)

@app.route('/resume/build')
def build_resume():
	job_desc = request.args['description']
	user_data = {}

	contact_data = get_contact()
	skills_data = get_skills()
	experience_data = get_experience()['data']
	projects_data = get_projects()['data']
	education_data = get_education()

	experience_data = sort_experiences(experience_data, job_desc)
	projects_data = sort_projects(projects_data, job_desc)

	user_data['skills'] = skills_data['data']['skills'].split(', ')
	user_data['experience'] = experience_data
	user_data['projects'] = projects_data
	user_data['education'] = education_data['data']
	user_data['contact'] = contact_data['data']

	return user_data

@app.route('/onboard/contact', methods=['POST'])
def onboardContact():
	res = {}
	global user_email
	try:
		request_params = request.get_json()
		conn = get_connection_to_db()
		cursor = conn.cursor()

		insert_statement = 'INSERT INTO Contact_Info (FullName, Email, PhoneNum, Website, LinkedIn, Github) VALUES (%s, %s, %s, %s, %s, %s)'
		values_to_insert = (request_params['name'], request_params['email'], request_params['phone'], request_params['website'], request_params['linkedin'], request_params['github'])

		user_email = request_params['email']

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
	global user_email
	try:
		request_params = request.get_json()['degree']
		conn = get_connection_to_db()
		cursor = conn.cursor()

		print(request_params)
		print(user_email)

		insert_statement = 'INSERT INTO Education (NameofSchool, LocationSchool, Degree, FieldOfStudy, GPA, Honors, CourseWork, Achievements, EndDate, StartDate, Activities, Email) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
		values_to_insert = (request_params['school'], 'USA', request_params['degree'], request_params['field_of_study'], request_params['gpa'], '', '', '', request_params['graduation_date'], request_params['start_date'], '', user_email)

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
	global user_email
	res = {}
	print(request.get_json())
	try:
		request_params = request.get_json()['position']
		conn = get_connection_to_db()
		cursor = conn.cursor()

		insert_statement = 'INSERT INTO Experience (CompanyName, Position, Achievements, StartDate, EndDate, Email) VALUES (%s, %s, %s, %s, %s, %s)'
		values_to_insert = (request_params['company'], request_params['position'],  request_params['relevant_achievements'], request_params['start_date'], request_params['end_date'], user_email)

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
	global user_email
	res = {}
	try:
		conn = get_connection_to_db()
		cursor = conn.cursor()

		insert_statement = 'INSERT INTO Skills (Email, Skills) VALUES (%s, %s)'
		print(request.get_json()['skills'])
		values_to_insert = (user_email, request.get_json()['skills'])

		cursor.execute(insert_statement, values_to_insert)
		conn.commit()

		cursor.close()
		conn.close()

		res['status'] = flask.Response(status=200)
		res['message'] = 'Skills successfully added'

	except Exception as e:
		print(e)
		res['status'] = flask.Response(status=400)
		res['message'] = 'Could not add user education'
		res['error'] = str(e)
	
	finally:
		return res

@app.route('/onboard/project', methods=['POST'])
def onboardProject():
	global user_email
	res = {}

	request_params = request.get_json()['position']

	try:
		conn = get_connection_to_db()
		cursor = conn.cursor()

		insert_statement = 'INSERT INTO Project (ProjectName, About, StartDate, EndDate, Email) VALUES (%s, %s, %s, %s, %s)'
		print(user_email)
		values_to_insert = (request_params['name'], request_params['about'], request_params['start_date'], request_params['end_date'],  user_email)

		cursor.execute(insert_statement, values_to_insert)
		conn.commit() 		

		cursor.close()
		conn.close()

		res['status'] = flask.Response(status=200)
		res['message'] = 'Skills successfully added'

	except Exception as e:
		res['status'] = flask.Response(status=400)
		res['message'] = 'Could not add user education'
		res['error'] = str(e)
	
	finally:
		return res

@app.route('/fetch/contact')
def get_contact():
	res = {}
	global user_email
	conn = get_connection_to_db()
	try:
		cursor = conn.cursor()
		query = 'SELECT * FROM Contact_Info WHERE Email = "' + user_email + '"'
		cursor.execute(query)
		result = cursor.fetchone()
		
		data = {}
		data['name'] = result[0]
		data['phone'] = result[1]
		data['website'] = result[2]
		data['linkedIn'] = result[3]
		data['github'] = result[4]
		data['email'] = result[5]

		cursor.close()
		conn.close()

		res['data'] = data
		res['status'] = 200
	except Exception as e:
		res['error'] = str(e)
		res['status'] = 404
	finally:
		return res

@app.route('/fetch/education')
def get_education():
	res = {}
	global user_email
	conn = get_connection_to_db()
	try:
		cursor = conn.cursor()
		query = 'SELECT * FROM Education WHERE Email = "' + user_email + '"'
		cursor.execute(query)
		result = cursor.fetchall()
		all_data = []

		for i in range(len(result)):
			data = {}
			data['school'] = result[i][0]
			data['country'] = result[i][1]
			data['degree'] = result[i][2]
			data['major'] = result[i][3]
			data['gpa'] = result[i][4]
			data['honors'] = result[i][5]
			data['coursework'] = result[i][6]
			data['achievements'] = result[i][7]
			data['end_date'] = result[i][8]
			data['start_date'] = result[i][9]
			data['activities'] = result[i][10]
			data['email'] = result[i][11]
			all_data.append(data)

		cursor.close()
		conn.close()

		res['data'] = all_data
		res['status'] = 200
	except Exception as e:
		res['error'] = str(e)
		res['status'] = 404
	finally:
		return res

@app.route('/fetch/experience')
def get_experience():
	res = {}
	global user_email
	conn = get_connection_to_db()
	try:
		cursor = conn.cursor()
		query = 'SELECT * FROM Experience WHERE Email = "' + user_email + '"'
		cursor.execute(query)
		result = cursor.fetchall()
		all_data = []

		for i in range(len(result)):
			data = {}
			data['company'] = result[i][0]
			data['title'] = result[i][1]
			data['start_date'] = result[i][2]
			data['end_date'] = result[i][3]
			data['email'] = result[i][4]
			data['achievements'] = result[i][5]
			all_data.append(data)
		
		cursor.close()
		conn.close()

		res['data'] = all_data
		res['status'] = 200
	except Exception as e:
		res['error'] = str(e)
		res['status'] = 404
	finally:
		return res

@app.route('/fetch/skills')
def get_skills():
	res = {}
	global user_email
	conn = get_connection_to_db()
	try:
		cursor = conn.cursor()
		query = 'SELECT * FROM Skills WHERE Email = "' + user_email + '"'
		cursor.execute(query)
		result = cursor.fetchone()

		data = {}
		data['skills'] = result[1]
		data['email'] = result[0]
		
		cursor.close()
		conn.close()

		res['data'] = data
		res['status'] = 200
	except Exception as e:
		res['error'] = str(e)
		res['status'] = 400
	finally:
		return res

@app.route('/fetch/projects')
def get_projects():
	res = {}
	global user_email
	conn = get_connection_to_db()

	try:
		cursor = conn.cursor()
		query = 'SELECT * FROM Project WHERE Email = "' + user_email + '"'
		cursor.execute(query)
		result = cursor.fetchall()
		all_data = []

		for i in range(len(result)):
			data = {}
			data['title'] = result[i][0]
			data['description'] = result[i][4]
			data['start_date'] = result[i][1]
			data['end_date'] = result[i][2]
			data['email'] = result[i][3]
			all_data.append(data)

		cursor.close()
		conn.close()

		res['data'] = all_data
		res['status'] = 200

	except Exception as e:
		res['error'] = str(e)
		res['status'] = 400

	finally:
		return res


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
	
	'''
	job_list = [{'Title': 'Software Engineer 1', 'Company': 'Adobe', 'Description': 'Strong hands-on experience with Java Experience with MongoDB, Kafka Problem solving skills & technical troubleshooting Experience with testing frameworks, continuous integration and build tools'}, 
                {'Title': 'Product Marketing Intern', 'Company': 'Ring Central', 'Description': 'Digital Marketing, Instagram Facebook, Mailchimp'},
                {'Title': 'Zoom 2021 Software Engineer, New Grad', 'Company': 'Zoom', 'Description': 'Assist with building and maintaining Zoom product features and services. Build, deploy and upgrade our real time compute infrastructure. Design and implement features to improve our systems. Connect with customers to understand their goals and needs and translate those into solutions our team can deliver. Configure tooling for systems scalability, ensure we have capacity for future growth. Ensure our systems are continuously monitored and running efficiently with a consistent, unified experience across products, platforms, and devices. Test current algorithms and write testing documents. Collaborate with internal stakeholders across the business to drive the delivery of features, processes and happiness. Requirements At least 18 years old, currently enrolled in a four year academic institution completing an undergrad, grad, or PhD degree in Computer Science, Human-Computer Interaction, Electrical Engineering, Information Systems, Information Technology or a related STEM field . 0-3 years of coding experience preferably in C/C++, Python and/or Java Self-starter, ability to envision solutions and take initiative to see the solution to the end despite challenges. Ability to crystallize vague concepts into concise plans with clear documentation. Detail oriented, organized, ethical, responsible, and self-motivated. Team player, ability to work effectively in a matrix organization. Strong communication skills and a desire to learn something new. A passion for creating products that resonate emotionally with people. A passion for Zoom’s mission, vision, values, and culture. Nice To Have HTML/CSS/Javascript/jQuery/AJAX/Linux/SQL/MATLAB. REST and Microservice Architecture. Have experimented with Cloud infrastructure Hands-on technical knowledge in Mac OS, Windows, G-Suite, Microsoft Office products, anti-malware, network, VPN, etc'},
                {'Title': 'Software Engineer', 'Company': 'Splunk', 'Description': 'Achieve a deep knowledge of our product architecture, design and implement new features. Strong commitment to best practices in software development, including modern CI, optimizing task/build execution times, making engineering process efficient. Drive root cause analysis investigations and post mortems for defects and regressions. Work with different Engineering and Product Management groups to influence the product requirement, solve hard problems and achieve the best quality Requirements 2+ years of relevant industry experience. Proficiency in Python programming, RESTful web services. Working knowledge of web development (e.g. HTML5/CSS, Javascript, Node.js, React.js). Experience with CI/CD and project management tools (e.g., Gitlab, Github, CI/CD pipelines, Jira, Confluence etc.). Go-getter, strong analytic and problem-solving skills. Good at multi-tasking, self-directed, high agility and flexibility. Good collaborative, documentation and presentation skills. BS in Computer science, and/or related work experience. Bonus skills Knowledge of using Splunk or Splunk integration. Experience with SaaS product development (AWS/Azure/GCP). Experience with virtualization and/or clustering systems. Experience with security infrastructure equipment or software, SIEM, SOAR, etc. Experience with Docker, container technologies. Experience working on open-source or development-in-the-open projects. Familiarity with security and networking concepts.'},
                {'Title': 'Software Development Engineer II', 'Company': 'Workday', 'Description': 'We are looking for a Software Engineer to join our engineering team to continue enhancing the modeling capabilities of our application.  The ideal candidate will be a backend developer having experience building customer-facing products for a compute-and-analytics intensive application. Required Skills 3+ years of server side software development experience in an enterprise software product Experience with Java Working knowledge with SQL Experience implementing high quality code using automation and unit testing frameworks Experience with designing and implementing large scale integration solutions Able to thrive in a fast paced, high energy and fun work environment that is agile (i.e. scrum) and delivers value incrementally and frequently BS/MS in Computer Science, Engineering, or related field Bonus Skills Working knowledge of front-end development or React Knowledge of Docker and ZooKeeper'},
                {'Title': 'Software Engineer', 'Company': 'Activision', 'Description': 'Key Responsibilities Include Build scalable, high-volume, high-availability systems, with a focus on delivering player value. Participate in development of new features and defect resolution on existing applications, as well as assist with scoping and designing new product initiatives. Work with large volumes of data in both relational and NoSQL data stores. Working closely with our Data Scientist group, Game teams and other development teams. Participate in software development best practices and patterns. Player Profile Proven experience in a software engineering/development of large scale distributed systems. Proficiency in languages like Java, C#, Golang or similar. Analytical problem solving and decision-making skills. Ability to work independently, learn quickly and be proactive Self-starter who is excited about learning new technologies Experience with data pipelines such as Kafka a plus. Experience with GCP, Data Bricks a plus. Bachelor\'s Degree in Computer Science or equivalent experience'}]

	for job in job_list:
		print('processing job: ' + job['Title'] + '@' + job['Company'])
		resume_data = build_resume(job['Description'])

		for key in resume_data.keys():
			print(str(key) + ':' + str(resume_data[key]))
		print('*******************\n')
	'''
	
	