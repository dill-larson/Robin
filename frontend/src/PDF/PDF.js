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
    pts_per_mm = 2.835,
    line_height = 1.15,
    one_line_height = (font_size * line_height) / pts_per_mm;

export default function createResume() {
    // a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    
    let current_y = margin;

    let phone = "8053909628";
    // formatting of US phone numbers `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6,10)}`

    // name
    doc.setFont(font, "bold"); // bold font
    doc.setFontSize(heading_font_size);
    doc.text("Your Name", center, current_y, {align: "center"});
    current_y = update_y(current_y);
    
    // contact information
    doc.setFont(font, "normal"); // unbold font
    doc.setFontSize(font_size);
    doc.text(["your_email@gmail.com | (555) 555-5555", "Github: github.com/username | LinkedIn: linkedin.com/in/username"], center, margin + one_line_height, {align: "center"});
    current_y = update_y(current_y, 3); // 2 lines for [email/phone, github/linkedin]
                                        // 1 line = blank line

    // education
    doc.text("Education:", margin, current_y);
    current_y = update_y(current_y); 
    // create loop for all educations
    current_y = printEducation(doc, current_y);

    // projects
    doc.text("Projects:", margin, current_y);
    current_y = update_y(current_y);
    // create loop for all projects
    current_y = printProject(doc, current_y);
    
    // work experience
    doc.text("Experience:", margin, current_y);
    current_y = update_y(current_y);
    // create loop for all projects
    printExperiece(doc, current_y);

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

function printEducation(doc, current_y) {
    // degree, gpa, graduation date -- on the same line
    doc.setFont(font, "bold"); // bold font
    doc.text("Type of Degree in Major, GPA: 4.00", margin + indent, current_y);
    doc.text("Graduation Date", doc_width - margin, current_y, {align: "right"});
    doc.setFont(font, "normal"); // unbold font
    current_y = update_y(current_y);

    // school, city, state -- on the same line
    doc.setFont(font, "italic"); // italics font
    doc.text("University Name", margin + indent, current_y);
    doc.text("City, State", doc_width - margin, current_y, {align: "right"});
    doc.setFont(font, "normal"); // unitalics font
    current_y = update_y(current_y);

    return current_y;
}

function printProject(doc, current_y) {
    // project name, begin & end date -- on the same line
    doc.setFont(font, "bold"); // bold font
    doc.text("Project Name", margin + indent, current_y);
    doc.text("Begin Date to End Date", doc_width - margin, current_y, {align: "right"});
    doc.setFont(font, "normal"); // unbold font
    current_y = update_y(current_y);

    // project description -- supports multiple lines for long descriptions
    let long_description = doc.splitTextToSize("Descrition of the project...", max_line_width - indent);
    doc.text(long_description, margin + indent, current_y);
    current_y = update_y(current_y, long_description.length);

    return current_y;
}

function printExperiece(doc, current_y) {
    // job title, start & end date -- on the same line
    doc.setFont(font, "bold"); // bold font
    doc.text("Job Title", margin + indent, current_y);
    doc.text("Start Date to End Date", doc_width - margin, current_y, {align: "right"});
    doc.setFont(font, "normal"); // unbold font
    current_y = update_y(current_y);

    // company name -- on the same line
    doc.setFont(font, "italic"); // italic font
    doc.text("Company Name", margin + indent, current_y);
    doc.text("City, State", doc_width - margin, current_y, {align: "right"});
    doc.setFont(font, "normal"); // unitalic font
    current_y = update_y(current_y);

    // relevant achievements -- supports multiple lines for long descriptions
    let long_description = doc.splitTextToSize("Relevant achievements go here!", max_line_width - indent);
    doc.text(long_description, margin + indent, current_y);
    current_y = update_y(current_y, long_description.length);

    return current_y;
}