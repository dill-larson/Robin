from typing import Tuple
from flask import *
from flask_cors import CORS
import requests
import random
import json
from bs4 import BeautifulSoup


MAX_ENTRIES = 200
UNWANTED_KEYWORDS = ['jobs']
UNWANTED_STRING_IN_COMPANY_NAME = '><'
MAX_COMPANY_NAME_LENGTH = 30

COMPANY_NAME_START_MARKER = 'subtitle-click">'
COMPANY_NAME_END_MARKER = '</a></h4>'
POSITION_START_MARKER = '"screen-reader-text">'
POSITION_END_MARKER = '</span></a>'

LOCATION_START_MARKER = 'location">'
LOCATION_END_MARKER = ', US</span>'
LINK_START_MARKER = 'href="'
LINK_END_MARKER = '"><span'

TIME_START_MARKER = 'datetime="'
TIME_END_MARKER = '</time>'
TIME_START_OFFSET = len(TIME_START_MARKER) + 12

LOCATION_END_MARKER_OFFSET = 4

# processes the li tag to extract information
def process_li_tag(li_tag):
	job_data = {}
	li_tag_str = str(li_tag)

	start_ndx = li_tag_str.find(COMPANY_NAME_START_MARKER) + len(COMPANY_NAME_START_MARKER)
	end_ndx = li_tag_str.find(COMPANY_NAME_END_MARKER)
	job_data["Company"] = li_tag_str[start_ndx: end_ndx]

	start_ndx = li_tag_str.find(POSITION_START_MARKER) + len(POSITION_START_MARKER)
	end_ndx = li_tag_str.find(POSITION_END_MARKER)
	job_data["Position"] = li_tag_str[start_ndx: end_ndx]

	start_ndx = li_tag_str.find(LOCATION_START_MARKER) + len(LOCATION_START_MARKER)
	end_ndx = li_tag_str.find(LOCATION_END_MARKER) + LOCATION_END_MARKER_OFFSET
	job_data["Location"] = li_tag_str[start_ndx: end_ndx]

	start_ndx = li_tag_str.find(LINK_START_MARKER) + len(LINK_START_MARKER)
	end_ndx = li_tag_str.find(LINK_END_MARKER)
	job_data["Link"] = li_tag_str[start_ndx: end_ndx]

	start_ndx = li_tag_str.find(TIME_START_MARKER) + TIME_START_OFFSET
	end_ndx = li_tag_str.rfind(TIME_END_MARKER)
	job_data["Time"] = li_tag_str[start_ndx: end_ndx]

	return job_data

def crawl(url, keywords, job_list):
	if len(job_list) >= MAX_ENTRIES:
		return

	else:
		result = requests.get(url)
		src = result.content
		soup = BeautifulSoup(src, 'lxml')
		li_tags = soup.find_all("li")

		for li_tag in li_tags:
			li_tag_text = li_tag.text
			if any(keyword in li_tag_text for keyword in keywords):
				if not(any(unwanted_keyword in li_tag_text for unwanted_keyword in UNWANTED_KEYWORDS)):
					job_data = process_li_tag(li_tag)
					if job_data not in job_list:
						if UNWANTED_STRING_IN_COMPANY_NAME not in job_data["Company"]:
							if len(job_data["Company"]) < MAX_COMPANY_NAME_LENGTH:
								job_list.append(job_data)

		print(len(job_list))
		print("Scraping")
		random_offset = random.randint(1, 2)
		print(job_list[len(job_list) - random_offset]["Link"])
		print("\n")

		return crawl(job_list[len(job_list) - random_offset]["Link"], keywords, job_list)

3
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
	print(request.args)
	user = request.get_json(silent=True)
	print(user)
	# TODO: commit to db when cloud team creates DB schema
	return 'contact successfully added'

@app.route('/onboard/education', methods=['POST'])
def onboardEducation():
	#gets single degree object as it is created, needs to be added to a list
	degree = request.get_json(silent=True)
	print(degree)
	# TODO: commit to db when cloud team creates DB schema
	return 'education successfully added'

@app.route('/onboard/experience', methods=['POST'])
def onboardExperience():
	#gets experience object as its created, needs to be added to a list
	experience = request.get_json(silent=True)
	print(experience)
	# TODO: commit to db when cloud team creates DB schema
	return 'experience successfully added'

@app.route('/onboard/skills', methods=['POST'])
def onboardSkills():
	#gets skills divided by commas
	skills = request.get_json(silent=True)
	print(skills)
	# TODO: commit to db when cloud team creates DB schema
	return 'skills added successfully'

@app.route('/onboard/project', methods=['POST'])
def onboardProject():
	#gets project object as its created, needs to be added to a list
	project = request.get_json(silent=True)
	print(project)
	# TODO: commit to db when cloud team creates DB schema
	return 'projects added successfully'


if __name__ == "__main__":
    app.run()
