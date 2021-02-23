from flask import *
import requests
import random
import json
from bs4 import BeautifulSoup


MAX_ENTRIES = 20
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


app = Flask(_name_)


@app.route("/")
def home():
    print("reached")
    return '''<html> 
    <head> </head>
    <body> home </body>
     </html>'''

@app.route('/scrape')
def scrape():
    print("URL -->>>" + request.args["url"])
    print(type(request.args["url"]))
    job_list = []
    keywords = ['Software', 'data science', 'Data Science', 'Data science', 'software', 'machine learing', 'intern', 'backend', 'frontend', 'ios', 'android', 'flutter']
    crawl(request.args["url"], keywords, job_list)
    return json.dumps(job_list)

if _name_ == "_main_": 
    app.run()