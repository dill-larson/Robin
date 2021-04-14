import React from 'react';
import { Button } from 'react-bootstrap';
import Page from '../Page/Page';
import createResume from '../PDF/PDF';

export default function Test() {    
    return(
        <Page>
            <Button onClick={handleClick}>Create PDF</Button>
        </Page>
    );
}

function handleClick(e) {
    let data = {
        name: "Dillon Larson",
        phone: "8053909628",
        email: "dillonlouislarson@gmail.com",
        githubUsername: "dill-larson",
        linkedInUsername: "dillon-l-larson",
        educations: [
            {
                degree: "Bachelor of Science",
                major: "Computer Science",
                gpa: "3.86",
                graduation_date: "May 2021",
                school: "San Jose State University",
                school_location: "San Jose, CA",
            },
            {
                degree: "Associate",
                major: "Computer Science",
                gpa: "3.86",
                graduation_date: "May 2019",
                school: "Moorpark Community College",
                school_location: "Moorpark, CA",
            }
        ],
        projects: [
            {
                name: "Robin",
                start_date: "January 2021",
                end_date: "May 2021",
                description: "Users upload their education, projects, and work experiences and scrape LinkedIn for jobs that fit the users skill set. Additionally, Robin creates a resume based on each job description to best match the user's projects and work experience for the job."
            },
            {
                name: "Farm2Table",
                start_date: "August 2020",
                end_date: "December 2020",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in dapibus ante. Aenean ut nulla faucibus lorem fermentum venenatis porta id sem. Donec ornare tempus orci a euismod. Ut consequat tortor eros. Nam ornare accumsan viverra. Sed sit amet vehicula leo. Integer suscipit venenatis lobortis."
            },
            {
                name: "Random Project",
                start_date: "August 2020",
                end_date: "December 2020",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in dapibus ante. Aenean ut nulla faucibus lorem fermentum venenatis porta id sem. Donec ornare tempus orci a euismod. Ut consequat tortor eros. Nam ornare accumsan viverra. Sed sit amet vehicula leo. Integer suscipit venenatis lobortis."
            }
        ],
        jobs: [
            {
                title: "Senior Software Engineer",
                company: "Google",
                location: "San Francisco, CA",
                start_date: "January 2021",
                end_date: "May 2021",
                rel_achievements: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in dapibus ante. Aenean ut nulla faucibus lorem fermentum venenatis porta id sem. Donec ornare tempus orci a euismod. Ut consequat tortor eros. Nam ornare accumsan viverra. Sed sit amet vehicula leo. Integer suscipit venenatis lobortis."
            },
            {
                title: "Junior Software Engineer",
                company: "Google",
                location: "San Francisco, CA",
                start_date: "January 2021",
                end_date: "May 2021",
                rel_achievements: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in dapibus ante. Aenean ut nulla faucibus lorem fermentum venenatis porta id sem. Donec ornare tempus orci a euismod. Ut consequat tortor eros. Nam ornare accumsan viverra. Sed sit amet vehicula leo. Integer suscipit venenatis lobortis."
            }
        ]
    };
    let generic_data = {
        name: "Your Name",
        phone: "5555555555",
        email: "your_email@gmail.com",
        githubUsername: "<username>",
        linkedInUsername: "<username>",
        educations: [
            {
                degree: "<Degree Type>",
                major: "<Major>",
                gpa: "4.00",
                graduation_date: "<Month YYYY>",
                school: "<University Name>",
                school_location: "<City, State>"
            },
            {
                degree: "<Degree Type>",
                major: "<Major>",
                gpa: "4.00",
                graduation_date: "<Month YYYY>",
                school: "<University Name>",
                school_location: "<City, State>"
            }
        ],
        projects: [
            {
                name: "<Project Name>",
                start_date: "<Month YYYY>",
                end_date: "<Month YYYY>",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in dapibus ante. Aenean ut nulla faucibus lorem fermentum venenatis porta id sem. Donec ornare tempus orci a euismod. Ut consequat tortor eros. Nam ornare accumsan viverra. Sed sit amet vehicula leo. Integer suscipit venenatis lobortis."
            },
            {
                name: "<Project Name>",
                start_date: "<Month YYYY>",
                end_date: "<Month YYYY>",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in dapibus ante. Aenean ut nulla faucibus lorem fermentum venenatis porta id sem. Donec ornare tempus orci a euismod. Ut consequat tortor eros. Nam ornare accumsan viverra. Sed sit amet vehicula leo. Integer suscipit venenatis lobortis."
            },
            {
                name: "<Project Name>",
                start_date: "<Month YYYY>",
                end_date: "<Month YYYY>",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in dapibus ante. Aenean ut nulla faucibus lorem fermentum venenatis porta id sem. Donec ornare tempus orci a euismod. Ut consequat tortor eros. Nam ornare accumsan viverra. Sed sit amet vehicula leo. Integer suscipit venenatis lobortis."
            }
        ],
        jobs: [
            {
                title: "<Job Title>",
                company: "<Company>",
                location: "<City, State>",
                start_date: "<Month YYYY>",
                end_date: "<Month YYYY>",
                rel_achievements: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in dapibus ante. Aenean ut nulla faucibus lorem fermentum venenatis porta id sem. Donec ornare tempus orci a euismod. Ut consequat tortor eros. Nam ornare accumsan viverra. Sed sit amet vehicula leo. Integer suscipit venenatis lobortis."
            },
            {
                title: "<Job Title>",
                company: "<Company>",
                location: "<City, State>",
                start_date: "<Month YYYY>",
                end_date: "<Month YYYY>",
                rel_achievements: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in dapibus ante. Aenean ut nulla faucibus lorem fermentum venenatis porta id sem. Donec ornare tempus orci a euismod. Ut consequat tortor eros. Nam ornare accumsan viverra. Sed sit amet vehicula leo. Integer suscipit venenatis lobortis."
            }
        ]
    };
    e.preventDefault();
    createResume(generic_data, ["education", "projects", "experience"]);
}