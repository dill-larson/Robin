from flask import *
from flask_cors import CORS
from flask_cors.core import get_allow_headers
from util.scrape import crawl
from util.sort import sort_job_list
from util.sort import sort_experiences
from util.sort import sort_projects
from db.read import *
import requests
import mysql.connector
import os

app = Flask(__name__)
CORS(app)

@app.route('/scrape')
def scrape():
	job_list = []
	#keywords = ['Software', 'data science', 'Data Science', 'Data science', 'software', 'machine learing', 'intern', 'backend', 'frontend', 'ios', 'android', 'flutter']
	#keywords = temp[0]['skills'].split(', ')
	# print(request.get_json())
	# print(request.args)
	email = request.args['email']
 
	#print(email)

	user_data = {}
	skills_data = get_single_record(email, 'Skills')
	experience_data = get_all_records(email, 'Experience')
	projects_data = get_all_records(email, 'Project')

 
	# print(skills_data)
	# print(experience_data)
	# print(projects_data)

	user_data['skills'] = skills_data[0]['skills']
	keywords = skills_data[0]['skills'].split(',')
	print(keywords)
	user_data['experience'] = experience_data[0]['data']
	user_data['projects'] = projects_data[0]['data']

	crawl(request.args["url"], keywords, job_list)

	# print(job_list)

	job_list = sort_job_list(user_data, job_list)

	for job in job_list:
		del job['links']

	return json.dumps(job_list)


@app.route('/resume/build')
def build_resume():
	job_desc = request.args['description']
	email = request.args['email']
	user_data = {}

	contact_data = get_single_record(email, 'Contact_Info')
	skills_data = get_single_record(email, 'Skills')
	experience_data = get_all_records(email, 'Experience')
	projects_data = get_all_records(email, 'Project')
	education_data = get_all_records(email, 'Education')
	try:

		experience_data = sort_experiences(experience_data, job_desc)
		projects_data = sort_projects(projects_data, job_desc)
	except Exception as e:
		print(e)

	user_data['skills'] = skills_data[0]['skills'].split(', ')
	user_data['experience'] = experience_data
	user_data['projects'] = projects_data
	user_data['education'] = education_data[0]['data']
	user_data['contact'] = contact_data[0]

	print(user_data)
	return user_data


@app.route('/onboard/contact', methods=['POST'])
def onboardContact():
	try:
		print(request.get_json())
		print(request.args)
		request_params = request.get_json()
		conn = get_connection_to_db()
		cursor = conn.cursor()
		insert_statement = 'INSERT INTO Contact_Info (name, email, phone, website, linkedIn, github) VALUES (%s, %s, %s, %s, %s, %s)'
		values_to_insert = (request_params['name'], request_params['email'], request_params['phone'], request_params['website'], request_params['linkedin'], request_params['github'])

		cursor.execute(insert_statement, values_to_insert)
		conn.commit()
		cursor.close()
		conn.close()

		return 'Contact successfully added', 200
	except Exception as e:
		print(str(e))
		return str(e), 400


@app.route('/onboard/education', methods=['POST'])
def onboardEducation():
	try:
		request_params = request.get_json()['degree']
		conn = get_connection_to_db()
		cursor = conn.cursor()
		insert_statement = 'INSERT INTO Education (school, country, degree, major, gpa, honors, coursework, achievements, end_date, start_date, activities, email) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
		values_to_insert = (request_params['school'], request_params['city'], request_params['degree'], request_params['field_of_study'], request_params['gpa'], request_params['honors'], request_params['coursework'], '', request_params['graduation_date'], request_params['start_date'], request_params['activities'], request_params['email'])

		cursor.execute(insert_statement, values_to_insert)
		conn.commit()
		cursor.close()
		conn.close()
      
		return 'Education successfully added', 200
	except Exception as e:
         print(str(e))
         return str(e), 400


@app.route('/onboard/experience', methods=['POST'])
def onboardExperience():
	try:
		request_params = request.get_json()['position']
		conn = get_connection_to_db()
		cursor = conn.cursor()
		insert_statement = 'INSERT INTO Experience (company, title, achievements, start_date, end_date, email) VALUES (%s, %s, %s, %s, %s, %s)'
		values_to_insert = (request_params['company'], request_params['position'],  request_params['relevant_achievements'], request_params['start_date'], request_params['end_date'], request_params['email'])

		cursor.execute(insert_statement, values_to_insert)
		conn.commit()
		cursor.close()
		conn.close()

		return 'Education successfully added', 200
	except Exception as e:
		print(str(e))
		return 'Education could not be added', 400


@app.route('/onboard/skills', methods=['POST'])
def onboardSkills():
	try:
		print(request.get_json())
		conn = get_connection_to_db()
		cursor = conn.cursor()
		insert_statement = 'INSERT INTO Skills (email, skills) VALUES (%s, %s)'
		values_to_insert = (request.get_json()['data']['email'], request.get_json()['data']['skills'])

		cursor.execute(insert_statement, values_to_insert)
		conn.commit()
		cursor.close()
		conn.close()

		return 'Skills successfully added', 200
	except Exception as e:
		print(str(e))
		return 'Skills could not be added', 400


@app.route('/onboard/project', methods=['POST'])
def onboardProject():
	request_params = request.get_json()['position']
	try:
		conn = get_connection_to_db()
		cursor = conn.cursor()
		insert_statement = 'INSERT INTO Project (title, description, start_date, end_date, email) VALUES (%s, %s, %s, %s, %s)'
		values_to_insert = (request_params['name'], request_params['about'], request_params['start_date'], request_params['end_date'], request_params['email'])

		cursor.execute(insert_statement, values_to_insert)
		conn.commit() 		
		cursor.close()
		conn.close()
		return 'Project successfully added', 200
	except Exception as e:
		print(str(e))
		return 'Could not add user education', 400


@app.route('/fetch/contact')
def get_contact():
    return get_single_record(request.args['email'], 'Contact_Info')

@app.route('/fetch/education')
def get_education():
    return get_all_records(request.args['email'], 'Education')

@app.route('/fetch/experience')
def get_experience():
    return get_all_records(request.args['email'], 'Experience')

@app.route('/fetch/skills')
def get_skills():
	return get_single_record(request.args['email'], 'Skills')

@app.route('/fetch/projects')
def get_projects():
    return get_all_records(request.args['email'], 'Project')


if __name__ == "__main__":
	app.run(host ='0.0.0.0', port = 5000)
	
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
	
	