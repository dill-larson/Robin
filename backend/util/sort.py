import nltk
from nltk.tokenize import word_tokenize
from nltk.probability import FreqDist
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import sent_tokenize
import requests
import os


# remove stopwords tokenize, stemming
def nlp_pipeline (data):
    if data is None:
        return
    # tokenize
    data = data.lower()
    tokenized_data=word_tokenize(data)

    # remove stopwords
    # normalization - stemming
    ps = PorterStemmer()
    stop_words=set(stopwords.words("english"))
    filtered_data=[]
    for w in tokenized_data:
        if w not in stop_words:
            filtered_data.append(ps.stem(w))
            # filtered_data.append(w)
    
    # freq distribution
    fdist = FreqDist(filtered_data)
    # fdist.plot(10,cumulative=False)
    # plt.show()
    return fdist.keys()
    
def sort_experiences(experience_data, job_desc):
    # print("sort exper")
    for experience in experience_data[0]['data']:
        experience['score'] = score(nlp_pipeline(experience['achievements']), nlp_pipeline(job_desc))
    experience_data = sorted(experience_data[0]['data'], key = lambda i: i['score'], reverse=True)
    return experience_data

def sort_projects(projects_data, job_desc):
    # print("sort proj")
    for project in projects_data[0]['data']:
        project['score'] = score(nlp_pipeline(project['description']), nlp_pipeline(job_desc))
    projects_data = sorted(projects_data[0]['data'], key = lambda i: i['score'], reverse=True)
    return projects_data
 
def sort_job_list(user_data, job_list):
    # call fetch data api and lists of user sills, projects, and experiences
    # get all user keywords
    user_keywords = []
    for project in user_data['projects']:
        user_keywords += nlp_pipeline(project['description'])
    for exp in user_data['experience']:
        user_keywords += nlp_pipeline(exp['achievements'])
    user_keywords += user_data['skills'].split(', ')
    # get all job keywords
    for job in job_list:
        job['score'] = score(user_keywords, nlp_pipeline(job['Description'] + job['Title']))
    job_list = sorted(job_list, key = lambda i: i['score'],reverse=True)

    return job_list


def score(list1, list2):
    if list1 is None or list2 is None:
        return
    return len(set(list1)&set(list2))


if __name__ == '__main__':
    email = 'akshat.bansal@sjsu.edu'
    # job_desc = 'Strong hands-on experience with Java Experience with MongoDB, Kafka Problem solving skills & technical troubleshooting Experience with testing frameworks, continuous integration and build tools Demonstrated knowledge of UNIX servers, commands, environments and tools Experience With Nuxeo Will Be Preferred Offshore Strong hands-on experience with Java Problem solving skills & technical troubleshooting Experience with testing frameworks, continuous integration and build tools Demonstrated knowledge of UNIX servers, commands, environments and tools'
    job_list = [{'Title': 'Software Engineer 1', 'Company': 'Adobe', 'Description': 'Strong hands-on experience with Java Experience with MongoDB, Kafka Problem solving skills & technical troubleshooting Experience with testing frameworks, continuous integration and build tools'}, 
                {'Title': 'Software Developer', 'Company': 'Sleep Number Labs', 'Description': 'Learn how to work with Python and FLASK, Willing to work in a team atmosphere, c++, Node'},
                {'Title': 'Product Marketing Intern', 'Company': 'Ring Central', 'Description': 'Digital Marketing, Instagram Facebook, Mailchimp'},
                {'Title': 'Senior Software Engineer', 'Company': 'IBM', 'Description': 'React JS, Node JS, Frontend development experience, Database Mangement, SQL, MySQL'}]
    sort_job_list(email, job_list)