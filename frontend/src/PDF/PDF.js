import { jsPDF } from "jspdf";

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
    one_line_height = (font_size * line_height) / pts_per_mm;

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

    let current_y = margin;

    // formatting of US phone numbers -- (000) 000-0000
    let formatted_phone = phone.length > 10 ? phone : `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6,10)}`;

    // name
    doc.setFont(font, "bold"); // bold font
    doc.setFontSize(heading_font_size);
    doc.text(`${name}`, center, current_y, {align: "center"});
    current_y = update_y(current_y);
    
    // contact information
    doc.setFont(font, "normal"); // unbold font
    doc.setFontSize(font_size);
    doc.text([`${email} | ${formatted_phone}`, `Github: github.com/${githubUsername} | LinkedIn: linkedin.com/in/${linkedInUsername}`], center, margin + one_line_height, {align: "center"});
    current_y = update_y(current_y, 3); // 2 lines for [email/phone, github/linkedin]
                                        // 1 line = blank line

    order.map(content => {
        switch (content){
            case "education":
                doc.text("Education:", margin, current_y);
                current_y = update_y(current_y); 
                // print all educations
                current_y = educations.map(edu => {
                    return current_y = printEducation(doc, current_y, edu);
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

function printEducation(doc, current_y, edu) {
    // degree, gpa, graduation date -- on the same line
    doc.setFont(font, "bold"); // bold font
    doc.text(`${edu.degree} in ${edu.major}, GPA: ${edu.gpa}`, margin + indent, current_y);
    doc.text(edu.graduation_date, doc_width - margin, current_y, {align: "right"});
    doc.setFont(font, "normal"); // unbold font
    current_y = update_y(current_y);

    // school, city, state -- on the same line
    doc.setFont(font, "italic"); // italics font
    doc.text(edu.school, margin + indent, current_y);
    doc.text(edu.school_location, doc_width - margin, current_y, {align: "right"});
    doc.setFont(font, "normal"); // unitalics font
    current_y = update_y(current_y);

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