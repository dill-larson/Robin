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
        doc.text(`${dateToText(edu.end_date, "MM-YYYY")}`, doc_width - margin, current_y, {align: "right"});        
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
    lines_to_print = 1;  // 1 lines for title/start/end_date and company/location
    if(lines_printed + lines_to_print <= max_printed_lines) {
        // job title, start & end date -- on the same line
        doc.setFont(font, "bold"); // bold font
        doc.text(`${job.title} @ ${job.company}, San Francisco, CA`, margin, current_y);
        doc.text(`${dateToText(job.start_date, "MM-DD-YYYY")} - ${dateToText(job.end_date, "MM-DD-YYYY")}`, doc_width - margin, current_y, {align: "right"});
        doc.setFont(font, "normal"); // unbold font
        update_y();

        // achievements
        printBulletedList(job.achievements, indent/2);
    }
}

function printProject(prj) {
    lines_to_print = 1; // 1 line for name/start/end_date
    
    if(lines_printed + lines_to_print <= max_printed_lines) {
        // project name, begin & end date -- on the same line
        doc.setFont(font, "bold"); // bold font
        doc.text(prj.title, margin, current_y);
        doc.text(`${dateToText(prj.start_date, "MM-DD-YYYY")} - ${dateToText(prj.end_date, "MM-DD-YYYY")}`, doc_width - margin, current_y, {align: "right"});
        doc.setFont(font, "normal"); // unbold font
        update_y();

        // project description
        printBulletedList(prj.description, indent/2);
    }
}

function printBulletedList(list, indent_size, delimiter = ". ") {
    // split list by sentences
    let sentences = list.split(delimiter);
    let num_of_lines = 0;

    // resize sentences to fit length of page
    let long_sentences = [];
    sentences.map(sent => {
        let temp_arr = doc.splitTextToSize(sent, max_line_width - indent_size - calcTitleLength('\u2022 ', false));
        long_sentences.push(temp_arr);
        num_of_lines += temp_arr.length;
    });

    lines_to_print = num_of_lines;
    if(lines_printed + lines_to_print <= max_printed_lines) {
        // achievements
        long_sentences.map(sent => {
            // print bullet
            doc.text('\u2022 ', margin + indent_size, current_y);
            // print sentences with hanging indent
            doc.text(sent, margin + indent_size + calcTitleLength('\u2022 ', false), current_y);
            update_y(sent.length);
        });
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
                formatted_date = `${month} ${date.substring(6)}`;
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