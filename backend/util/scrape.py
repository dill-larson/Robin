import requests
import random
from bs4 import BeautifulSoup

MAX_ENTRIES = 10

def crawl(url, keywords=[], job_list=[]):
	if len(job_list) >= MAX_ENTRIES:
		return
	else:
		result = requests.get(url)
		src = result.content
		soup = BeautifulSoup(src, 'lxml')
		description_li_tags = soup.select('.description ul li')

		title_arr = soup.select('.topcard__content-left h1')
		location_arr = soup.select('.topcard__flavor--bullet')
		posted_time_arr = soup.select('.posted-time-ago__text')
		company_arr = soup.select('.sub-nav-cta__optional-url')

		if len(title_arr) < 1 or len(company_arr) < 1:
			return

		job = {}

		job['Title'] = soup.select('.topcard__content-left h1')[0].text
		job['location'] = soup.select('.topcard__flavor--bullet')[0].text
		job['posted_time'] = soup.select('.posted-time-ago__text')[0].text
		job['company'] = soup.select('.sub-nav-cta__optional-url')[0].text
		job['Description'] = ''
		job['links'] = []

		similar_job_urls = soup.select('.result-card__full-card-link')

		for i in range(len(similar_job_urls)):	
			job['links'].append(similar_job_urls[i]['href'])

		for description_li_tags in description_li_tags:
			job['Description'] += ' ' + description_li_tags.text

		job_list.append(job)
		print(len(job_list))

		if len(job['links']) < 2:
			return

		crawl(job['links'][random.randint(0, len(job['links']) - 1)], keywords, job_list)

if __name__ == '__main__':
	job_list = []
	keywords = ['Software', 'data science', 'Data Science', 'Data science', 'software', 'machine learing', 'intern', 'backend', 'frontend', 'ios', 'android', 'flutter']
	crawl('https://www.linkedin.com/jobs/view/2484356618', keywords, job_list)

	for job in job_list:
		print(job)
