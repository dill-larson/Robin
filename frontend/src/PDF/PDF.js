import { jsPDF } from 'jspdf';
import axios from 'axios';

// constants for font
const font = "Helvetica",
    font_size = 11,
    heading_font_size = font_size * 2;

// constants for printing
const doc_width = 210,
    doc_height = 297,
    center = doc_width/2,
    margin = 20,
    indent = 10,
    max_line_width = doc_width - 2 * margin,
    pts_per_mm = 2.835, // baseline to top of letter
    line_height = 1.15,
    one_line_height = (font_size * line_height) / pts_per_mm,
    max_printed_lines = (doc_height - 2 * margin) / one_line_height + 1; // +1 because name doesn't print exactly under the margin; makes the margins more equal

// shared variables
var lines_printed = 0,
    lines_to_print,
    current_y = margin + one_line_height;
const doc = new jsPDF(); // a4 paper, portrait, using millimeters for units

export default async function createResume(user_email, desc, order = ["education", "skills", "experience", "projects"]) {
    
    let data = await getUserData(user_email, desc);

    // user data
    let name = data.contact.name,
        email = data.contact.email,
        phone = data.contact.phone,
        website = data.contact.website,
        githubUsername = data.contact.github,
        linkedInUsername = data.contact.linkedIn;
    let educations = data.education,
        jobs = data.experience,
        projects = data.projects,
        skills = data.skills;

    console.log(data);

    // formatting of US phone numbers -- (000) 000-0000
    let formatted_phone = phone.length == 10 ? `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6,10)}` : phone;

    // name
    doc.setFont(font, "bold"); // bold font
    doc.setFontSize(heading_font_size);
    doc.text(`${name}`, center, current_y, {align: "center"});
    update_y();
    lines_printed += 1; // update_y incremenets lines printed by 1; 1 more is needed b/c name is twice the font size
    
    // contact information
    doc.setFont(font, "normal"); // unbold font
    doc.setFontSize(font_size);
    doc.text([`${email} | ${formatted_phone} | Website: ${website}`, `Github: github.com/${githubUsername} | LinkedIn: linkedin.com/in/${linkedInUsername}`], center, current_y, {align: "center"});
    update_y(3); // 2 lines for email/phone/website and github/linkedin
                 // 1 line = blank line

    order.map(content => {
        switch (content){
            case "education":
                if(educations.length > 0) {
                    lines_to_print = 1;
                    if(lines_printed + lines_to_print <= max_printed_lines) {
                        doc.text("Education:", margin, current_y);
                        update_y();
                    }
                    // print all educations
                    educations.map(edu => {
                        printEducation(edu);
                    });
                }
                break;
            case "skills":
                if(skills.length > 0) {
                    printSkills(skills);
                }
                break;
            case "experience":
                if(jobs.length > 0) {
                    lines_to_print = 1;
                    if(lines_printed + lines_to_print <= max_printed_lines) {
                        doc.text("Experience:", margin, current_y);
                        update_y();
                    }
                    // print all work experiences
                    jobs.map(job => {
                        printExperience(job);
                    });
                }
                break;
            case "projects":
                if(projects.length > 0) {
                    lines_to_print = 1;
                    if(lines_printed + lines_to_print <= max_printed_lines) {
                        doc.text("Projects:", margin, current_y);
                        update_y();
                    }
                    // print all projects
                    projects.map(prj => {
                        printProject(prj);
                    });
                }
                break;
            default:
                console.error(`Invalid resume order param: ${content}`);
        }
    });

    // prompt user to save pdf
    doc.save("resume.pdf"); 
}

async function getUserData(user_email, desc) {
    let data = await axios.get('http://127.0.0.1:5000/resume/build', {
            params: {
                description: desc
            }
        })
            .then(res => {
                return res.data;
            })
            .catch(error => {
                console.error(error);
            });

    // let generic_data = {
    //     contact: {
    //         name: "CloudUser",
    //         phone: "1256893939",
    //         website: "clouduser.com",
    //         github: "CloudUser",
    //         linkedIn: "CloudUser",
    //         email: "clouduser@gmail.com",
    //     },
    //     educations: [
    //         {
    //             school: "San Jose State University",
    //             location: "San Jose, CA",
    //             degree: "B.S.",
    //             major: "Computer Science",
    //             gpa: "3.70/4.00",
    //             achievements: ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "nunc", "in", "dapibus", "ante"],
    //             coursework: ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "nunc", "in", "dapibus", "ante"],
    //             activities: ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "nunc", "in", "dapibus", "ante"],
    //             start_date: "08-2017",
    //             end_date: "05-2021"
    //         },
    //         // {
    //         //     school: "San Jose State University",
    //         //     location: "San Jose, CA",
    //         //     degree: "B.S.",
    //         //     major: "Computer Science",
    //         //     gpa: "3.70/4.00",
    //         //     achievements: [],
    //         //     coursework: [],
    //         //     activities: [],
    //         //     start_date: "08-2017",
    //         //     end_date: "05-2021"
    //         // }
    //     ],
    //     experience: [
    //         {
    //             company:"Confidential",
    //             location: "San Francisco, CA",
    //             title:"AWS Cloud Engineer",
    //             start_date:"12-12-2008",
    //             end_date:"12-12-2015",
    //             achievements:"Built S3 buckets and managed policies for S3 buckets and used S3 bucket and Glacier for storage and backup on  AWS . Work with other teams to help develop the Puppet infrastructure to conform to various requirements including security and compliance of managed servers. Built a VPC , established the site-to- site VPN connection between Data Center and AWS .  Develop push-button  automation for app teams for deployments in multiple environments like Dev, QA, and Production. Help with the creation of dev standards for Puppet module development including best practices for version control ( git ). Perform troubleshooting and monitoring of the Linux server on AWS using Zabbix , Nagios and Splunk .  Management and Administration of AWS Services CLI , EC2 , VPC , S3 , ELB Glacier, Route 53 , Cloudtrail , IAM , and Trusted Advisor services. Created automated pipelines in AWS  CodePipeline  to deploy Docker containers in AWS ECS using services like CloudFormation , CodeBuild , CodeDeploy , S3 and puppet . Worked on JIRA for defect/issues logging & tracking and documented all my work using CONFLUENCE . Integrated services like GitHub , AWS  CodePipeline , Jenkins and AWS Elastic Beanstalk to create a deployment pipeline.",
    //         },
    //         // {
    //         //     company:"Cloudbeds",
    //         //     location: "San Francisco",
    //         //     title:"Lead DevOps Engineer",
    //         //     start_date:"11-07-2017",
    //         //     end_date:"24-04-2021",
    //         //     achievements:"Leading development and operations processes inside team Developing CI/CD roadmap and implementing to the project Play a significant role in establishing operational processes for a fast-growing distributed cloud platform. Help scale our platform to 10x customers. Improve deployment process within AWS (ex. cross-region automated deployment). AWS services administration: IAM, VPC, Route 53, EC2, S3, CodeBuild, CodeDeploy, Redshift, RDS, CloudWatch, CloudFormation Develop and automate standard operating procedures around common failure scenarios. Monitor, analyze, and report performance statistics for cloud hosted environments. Develop application performance management to measure and act upon performance data.",
    //         // }
    //     ],
    //     projects: [
    //         {
    //             title: "Star Social",
    //             description: "Social media app for people interested in space and are looking to express thoughts Supports sign-up/sign-in, user post history, joining/creating groups, and posting features Deployed on cloud using AWS EC2 service Backend development with Python, Django, and SQLite Designed frontend with CSS, JavaScript, jQuery, and Bootstrap",
    //             start_date: "12-17-2019",
    //             end_date: "01-30-2020",
    //         },
    //         {
    //             title: "Video Summarization web application",
    //             description: "Web application for summarizing a video/document into a smaller video or document of 20% of its original length with additional notes on important keywords. Implemented microservices architecture for sign-in/sign-up, transcript/video processing, and video editing services Built each service as a RESTful API using React, Python, and Flask Utilized API Gateway for user authentication, authorization, and request routing Encapsulated microservices using Docker for deploying in AWS EC2 Worked with other technologies such as AWS Lambda, S3, Springboot, and Jenkins",
    //             start_date: "11-17-2019",
    //             end_date: "12-20-2020",
    //         }
    //     ],
    //     skills: {
    //         skills: [
    //             "Puppet", 
    //             "Chef", 
    //             "Ansible", 
    //             "Vagrant", 
    //             "Docker", 
    //             "Splunk", 
    //             "Amazon Web Services (AWS)", 
    //             "Azure", 
    //             "OpenStack", 
    //             "Oracle", 
    //             "SQL", 
    //             "Enterprise NoSQL", 
    //             "Cassandra", 
    //             "PERL", 
    //             "Ruby", 
    //             "Python", 
    //             "Java", 
    //             "J2EE", 
    //             "C++", 
    //             "Virtualization/ContainerVagrant", 
    //             "VMware"
    //         ]
    //     }
    // };
    return data;
}

/* Helper function to update the y position
 * adds the correct spacing acccording to
 * num_lines
 */
function update_y(num_lines = 1) {
    current_y += one_line_height * num_lines;
    lines_printed += num_lines;
}

function printSkills(skills) {
    // calculate num of lines for skills -- multilined list separated by commas
    let comma_sep_list = doc.splitTextToSize(skills.join(", "), max_line_width - indent);

    lines_to_print = 1 + comma_sep_list.length; // 1 = "skills" title
                                                // length is number of lines to needed to fit skills 

    // print title and skills
    if(lines_printed + lines_to_print <= max_printed_lines) {
        doc.text("Skills:", margin, current_y);
        doc.text(comma_sep_list, margin + calcTitleLength("Skills:", false) + 1, current_y); // 1mm for padding
        update_y(comma_sep_list.length);
    }   
}

function printEducation(edu) {
    lines_to_print = 2; // 2 lines for school/city/state and degree/gpa/grad_date
    if(lines_printed + lines_to_print <= max_printed_lines) {
        // school, city, state -- on the same line
        doc.setFont(font, "bold"); // bold font
        doc.text(edu.school, margin, current_y);
        doc.text(edu.country, doc_width - margin, current_y, {align: "right"});
        doc.setFont(font, "normal"); // unbold font
        update_y();

        // degree, gpa, graduation date -- on the same line
        doc.setFont(font, "italic"); // italics font
        doc.text(`${edu.degree} in ${edu.major}, GPA: ${edu.gpa}`, margin, current_y);
        doc.text(`${dateToText(edu.start_date, "MM-YYYY")} to ${dateToText(edu.end_date, "MM-YYYY")}`, doc_width - margin, current_y, {align: "right"});        
        doc.setFont(font, "normal"); // unitalics font
        update_y();
    }

    var titles = {
        "Achievements:": edu.achievements,
        "Coursework:": edu.coursework,
        "Activities:": edu.activities
    };

    // calculate the longest printed word -- uses current doc settings -- used in calculating hanging indent
    let longest_printed_word = calcTitleLength(Object.keys(titles).sort((a, b) => calcTitleLength(b) - calcTitleLength(a))[0]);
    
    // print achievements, coursework, activities
    for(const [key, value] of Object.entries(titles)) {
        printTitledList(key, value, indent, longest_printed_word);
    }
}

/*
 * Helper function to print a "titled" list
 * prints title and
 * prints indented list (separated by commas)
 */
function printTitledList(title, list, indent_size = 0, hanging_indent = calcTitleLength(title)) {
    if (list.length > 0) {
        // calculate number of lines to print
        let title_length = hanging_indent + 1;  // length of title in mm when printed
                                                // 1 mm for padding
        // multilined list separated by commas
        let comma_sep_list = doc.splitTextToSize(list.join(", "), max_line_width - indent_size - title_length);
        
        lines_to_print = 1 + comma_sep_list.length; // 1 = title
                                                    // length is number of lines to needed to fit list
        // print title and list
        if(lines_printed + lines_to_print <= max_printed_lines) {
            // title
            doc.setFont(font, "bold"); // bold font
            doc.text(title, margin + indent_size, current_y);
            doc.setFont(font, "normal"); // unbold font

            // list
            doc.text(comma_sep_list, margin + indent_size + title_length, current_y);
            update_y(comma_sep_list.length);
        }
    }
}

function calcTitleLength(title, bolded = true) {
    if(bolded) { doc.setFont(font, "bold"); } // bold font
    let length = doc.getTextWidth(title);
    if(bolded) { doc.setFont(font, "normal"); } // unbold font 
    
    return length;
}

function printExperience(job) {
    // calc number of lines for achievements
    let long_description = doc.splitTextToSize(job.achievements, max_line_width - indent);
    long_description.map((line, index) => {
        long_description[index] = '\u2022 ' + line;
    });

    lines_to_print = 2 + long_description.length;   // 2 lines for title/start/end_date and company/location
                                                    // length is number of lines to needed to fit achievements
    if(lines_printed + lines_to_print <= max_printed_lines) {
        // job title, start & end date -- on the same line
        doc.setFont(font, "bold"); // bold font
        doc.text(`${job.title} @ ${job.company}`, margin, current_y);
        doc.text(`${dateToText(job.start_date, "MM-DD-YYYY")} to ${dateToText(job.end_date, "MM-DD-YYYY")}`, doc_width - margin, current_y, {align: "right"});
        doc.setFont(font, "normal"); // unbold font
        update_y();

        // achievements
        doc.text(long_description, margin, current_y);
        update_y(long_description.length);
    }
}

function printProject(prj) {
    // calc number of lines for description
    let long_description = doc.splitTextToSize(prj.description, max_line_width - indent);

    lines_to_print = 1 + long_description.length;   // 1 line for name/start/end_date
                                                    // length is number of lines to needed to fit achievements
    
    if(lines_printed + lines_to_print <= max_printed_lines) {
        // project name, begin & end date -- on the same line
        doc.setFont(font, "bold"); // bold font
        doc.text(prj.title, margin, current_y);
        doc.text(`${dateToText(prj.start_date, "MM-DD-YYYY")} to ${dateToText(prj.end_date, "MM-DD-YYYY")}`, doc_width - margin, current_y, {align: "right"});
        doc.setFont(font, "normal"); // unbold font
        update_y();

        // project description
        doc.text(long_description, margin, current_y);
        update_y(long_description.length);
    }
}

/* Helper function
 * converts dates in formats:
 * MM-YYYY and MM-DD-YYYY
 * to their text equivalents (ie. it spells out the month)
 */
function dateToText(date, format) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var formatted_date = '';
    var month = null;

    switch(format) {
        case "MM-DD-YYYY":
            // check if date matches format
            if(date.match(/^(\d){1,2}-(\d){1,2}-(\d){4}$/)) {
                // check if month value is valid
                if(parseInt(date.substring(0,2)) - 1 >= 0 && parseInt(date.substring(0,2)) - 1 < 12) {
                    month = months[parseInt(date.substring(0,2)) - 1];
                }
                formatted_date = `${month} ${date.substring(3,5)}, ${date.substring(6)}`;
            } else {
                formatted_date = 'Error: date did not match specified format';
            }
            break;
        case "MM-YYYY":
            // check if date matches format
            if (date.match(/^(\d){1,2}-(\d){4}$/)) {
                // check if month value is valid
                if(parseInt(date.substring(0,2)) - 1 > 0 && parseInt(date.substring(0,2)) - 1 < 12) {
                    month = months[parseInt(date.substring(0,2)) - 1];
                }
                formatted_date = `${month} ${date.substring(3)}`;
            } else {
                formatted_date = 'Error: date did not match specified format';
            }
            break;
        default:
            formatted_date = "Error: unsupported format";
    }

    return formatted_date;
}