import { jsPDF } from 'jspdf';

// constants for font
const font = "Helvetica",
    font_size = 12,
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

export default function createResume(data, order = ["education", "experience", "projects"]) {
    // a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    
    // user data
    let name = data.name,
        email = data.email,
        phone = data.phone,
        githubUsername = data.githubUsername,
        linkedInUsername = data.linkedInUsername;
    let educations = data.educations,
        projects = data.projects,
        jobs = data.jobs;

    let current_y = margin + one_line_height, // name in twice the font
        lines_printed = 0;

    // formatting of US phone numbers -- (000) 000-0000
    let formatted_phone = phone.length > 10 ? phone : `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6,10)}`;

    // name
    doc.setFont(font, "bold"); // bold font
    doc.setFontSize(heading_font_size);
    doc.text(`${name}`, center, current_y, {align: "center"});
    current_y = update_y(current_y);
    lines_printed += 2; // name is twice the font size
    
    // contact information
    doc.setFont(font, "normal"); // unbold font
    doc.setFontSize(font_size);
    doc.text([`${email} | ${formatted_phone}`, `Github: github.com/${githubUsername} | LinkedIn: linkedin.com/in/${linkedInUsername}`], center, current_y, {align: "center"});
    current_y = update_y(current_y, 3); // 2 lines for email/phone and github/linkedin
                                        // 1 line = blank line
    lines_printed += 3;

    console.log(dateToText("11-12-2019", "MM-YYYY"))

    order.map(content => {
        switch (content){
            case "education":
                doc.text("Education:", margin, current_y);
                current_y = update_y(current_y); 
                // print all educations
                current_y = educations.map(edu => {
                    return current_y = printEducation(doc, current_y, lines_printed, edu);
                });
                current_y = current_y[current_y.length-1]; // get most recent current_y
                break;
            case "projects":
                doc.text("Projects:", margin, current_y);
                current_y = update_y(current_y);
                // print all projects
                current_y = projects.map(prj => {
                    return current_y = printProject(doc, current_y, prj);
                });
                current_y = current_y[current_y.length-1]; // get most recent current_y
                break;
            case "experience":
                doc.text("Experience:", margin, current_y);
                current_y = update_y(current_y);
                // print all work experiences
                current_y = jobs.map(job => {
                    return current_y = printExperiece(doc, current_y, job);
                });
                current_y = current_y[current_y.length-1]; // get most recent current_y
                break;
            default:
                console.error(`Invalid resume order: ${content}`);
        }
    });

    // prompt user to save pdf
    doc.save("resume.pdf"); 
}

/* Helper function to update the y position
 * adds the correct spacing acccording to
 * num_lines
 */
function update_y(current_y, num_lines = 1) {
    return current_y += one_line_height * num_lines;
}

function printEducation(doc, current_y, lines_printed, edu) {
    var lines_to_print = 3;
    if(lines_printed + lines_to_print < max_printed_lines) {
        // school, city, state -- on the same line
        doc.setFont(font, "bold"); // bold font
        doc.text(edu.school, margin + indent, current_y);
        doc.text(edu.school_location, doc_width - margin, current_y, {align: "right"});
        doc.setFont(font, "normal"); // unbold font
        current_y = update_y(current_y);
        lines_printed++;

        // degree, gpa, graduation date -- on the same line
        doc.setFont(font, "italic"); // italics font
        doc.text(`${edu.degree} in ${edu.major}, GPA: ${edu.gpa}`, margin + indent, current_y);
        doc.text(edu.graduation_date, doc_width - margin, current_y, {align: "right"});        
        doc.setFont(font, "normal"); // unitalics font
        current_y = update_y(current_y);
        lines_printed++;

        var titles = {
            "Achievements:": edu.achievements,
            "Coursework:": edu.coursework,
            "Activities:": edu.activities
        };

        // calculate the longest printed word -- uses current doc settings -- used in calculating hanging indent
        doc.setFont(font, "bold"); // bold font
        let longest_printed_word = doc.getTextWidth(Object.keys(titles).sort((a, b) => doc.getTextWidth(b) - doc.getTextWidth(a))[0]);
        doc.setFont(font, "normal"); // unbold font
        
        // print achievements, coursework, activities
        for(const [key, value] of Object.entries(titles)) {
            current_y = printTitledList(doc, current_y, longest_printed_word, key, value);
        }
    }

    return current_y;
}

/*
 * Helper function to print a "titled" list
 * prints title and
 * prints indented list (separated by commas)
 */
function printTitledList(doc, current_y, hanging_indent, title, list) {
    if (list.length > 0) {
        // title
        doc.setFont(font, "bold"); // bold font
        doc.text(title, margin + 2 * indent, current_y);
        let title_length = hanging_indent + 1;  // length of longest title in mm when printed
                                                // 1 mm for padding
        doc.setFont(font, "normal"); // unbold font
        // multilined list separated by commas
        let comma_sep_list = doc.splitTextToSize(list.join(", "), max_line_width - 2 * indent - title_length);
        doc.text(comma_sep_list, margin + 2 * indent + title_length, current_y);
        current_y = update_y(current_y, comma_sep_list.length);
        // lines_printed += comma_sep_list.length;
    }

    return current_y;
}

function printExperiece(doc, current_y, job) {
    // job title, start & end date -- on the same line
    doc.setFont(font, "bold"); // bold font
    doc.text(job.title, margin + indent, current_y);
    doc.text(`${job.start_date} to ${job.end_date}`, doc_width - margin, current_y, {align: "right"});
    doc.setFont(font, "normal"); // unbold font
    current_y = update_y(current_y);

    // company name -- on the same line
    doc.setFont(font, "italic"); // italic font
    doc.text(job.company, margin + indent, current_y);
    doc.text(job.location, doc_width - margin, current_y, {align: "right"});
    doc.setFont(font, "normal"); // unitalic font
    current_y = update_y(current_y);

    // relevant achievements -- supports multiple lines for long descriptions
    let long_description = doc.splitTextToSize(job.rel_achievements, max_line_width - indent);
    doc.text(long_description, margin + indent, current_y);
    current_y = update_y(current_y, long_description.length);

    return current_y;
}

function printProject(doc, current_y, prj) {
    // project name, begin & end date -- on the same line
    doc.setFont(font, "bold"); // bold font
    doc.text(prj.name, margin + indent, current_y);
    doc.text(`${prj.start_date} to ${prj.end_date}`, doc_width - margin, current_y, {align: "right"});
    doc.setFont(font, "normal"); // unbold font
    current_y = update_y(current_y);

    // project description -- supports multiple lines for long descriptions
    let long_description = doc.splitTextToSize(prj.description, max_line_width - indent);
    doc.text(long_description, margin + indent, current_y);
    current_y = update_y(current_y, long_description.length);

    return current_y;
}

function dateToText(date, format) {
    const months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var formatted_date = '';
    var month = null;

    switch(format) {
        case "MM-DD-YYYY":
            // check if date matches format
            if(date.match(/^(\d){1,2}-(\d){1,2}-(\d){4}$/)) {
                // check if month value is valid
                if(parseInt(date.substring(0,2)) - 1 > 0 && parseInt(date.substring(0,2)) - 1 < 12) {
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