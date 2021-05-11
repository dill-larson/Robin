context('API CALLS for projects', () =>{
    
    
    it('GET ',function(){

        cy.request({
            method : 'GET',
            url : 'http://127.0.0.1:5000/resume/build?description=Participate in Design, develop the requrieemnts and test high throughput back-end settlement systems Develop efficient, elegant, clean code with no unnecessary complication or abstraction Lead code review sessions Passionate about low latency systems Ability to deal with high volume data Continuously look for opportunities for performance tuning Collaborate with other engineers, architects and DBAs Collaborate with Product Managers You love solving problems and building solutions. You’re self-motivated and have a demonstrated track record of self-learning andgoing above and beyond You’re excited to create high traffic backend distributed services for customers You want to hit the ground running on Day 1; you take ownership of yourwork and can work independently. You’ve designed and clearly understand concepts like WebServices, SOA, REST APIs, SPRING Framework. You know the fundamentals of Object-Oriented Programming using Java, C++;familiarity with additional development tools such as JUnit, Maven %26 Jenkins is aplus. You have experience working with javascript, nodeJS etc. to showcase your creativity. You love Git and are at home with source control concepts such as merge, rebaseand pull. You’ve used SQL %26 NoSQL solutions and understand the pros and cons of relationaland free form databases. Good hands on experience in Oracle database. You’ve comfortable using application server frameworks, for example Tomcator JBOSS. You believe in Agile development and putting the customer first in anything youdesign; experience with SCRUM is a plus. You’re a strong advocate of good coding standards and like the use of coding toolsthat will push you to improve the code you deliver like Sonar. You know how to identify performance bottlenecks and use good codingpatterns to avoid them in the first place. 3+ years of experience in software development. Experience in object-oriented programming and concepts Experienced in Distributed System development using Java/J2EE/Web Technologies/C++. Proven track record in delivering highly available, scalable systems on time Conversant in design patterns Good understanding of web services and related standards like REST/JSON Experience in caching software Experience in Spring framework and other open source frameworks Experience developing data-driven applications using an industry standard RDBMS (Oracle, DB2, SQL Server, MySQL, Informatica, etc.) Experience in Unix based development environment Experience in both development and quality assurance activities Experience in QA methodologies, test automation and automation frameworks Experience in driving Integration testing, UAT with external vendors Experience in JUnit, Selenium is a plus Experience working in payments or financial services industry is a plus Exposure to Agile Methodologies Seniority levelNot Applicable Employment typeFull-time Job functionEngineeringInformation Technology IndustriesComputer SoftwareFinancial ServicesInternet',
           
        }).then(function(response){
            expect(response.body).have.property('projects')
        

            var j = response.body
            
            var firstProject = j['projects'][0]['description']
           
            expect(firstProject).to.contain('Web application for summarizing a video/document into a smaller video or document of 20% of its original length with additional notes on important keywords. Implemented microservices architecture for sign')


            var secondProject = j['projects'][1]['description']

            expect(secondProject).to.contain('Social media app for people interested in space and are looking to express thoughts Supports sign-up/sign-in, user post history, joining/creating groups, and posting features Deployed on cloud using AWS EC2') 
        })
    

    })

    it('GET ',function(){

        cy.request({
            method : 'GET',
            url : 'http://127.0.0.1:5000/resume/build?description=Develop and maintain new and existing mobile and/or web applications using Angular 8 and 9 and working across the entire MEAN stack and using frameworks like IONI work in a fast-paced, agile environment consisting of a cross-functional team designing and implementing systems from the user interface front-end through the back-end create detailed technical designs, code, and unit tests for custom applications and data flow in the context of projects, releases, and production support provide technical estimates for user stories, articulating any technical risks and assumptions contribute to application and database performance tuning and defect resolution perform code reviews of other developers collaboratively work with functional and technical teams to integrate applications into a cloud environment establish productive working relationships and maintain effective communications with teammates, clients, and end-user Bachelor’s Degree in Computer Science or related discipline. A technical Graduate degree or certification is a plus. Experience with software development life cycle models and agile programming methodologies minimum 5+ years developing web applications, with at least 2 years in full-stack development (MongoDB, Express, Angular, and Node.js); MongoDB experience is required; experience with Angular 8/9 preferred excellent JavaScript skills and programming experience in several front technologies including HTML5, CSS3, Ajax, jQuery, Bootstrap, and Angular Material experience with MVC design patterns, Material Design, and responsive design deep knowledge of Angular practices and commonly used modules based on extensive work experience understanding of fundamental design principles behind a scalable application creating self-contained, reusable, and testable modules and component great UI skills and experience with cross-browser application excellent debugging and troubleshooting skill understanding of unit testing and mocking techniques, automated testing platforms, and unit tests for CI/C proficient understanding of code versioning tools, such as Subversion professional, precise communication skill sExperience working in a small collaborative team Mobile development experience web application development using other programming languages/stacks (Microsoft stack, C%23, Python) Experience with TS-ED and Type OR M Experience with full-stack development using Typescript at both the front end and back end Employment typeFull-time'
        }).then(function(response){
            expect(response.body).have.property('projects')
        

            var j = response.body
            
            var firstProject = j['projects'][0]['description']
            expect(firstProject).to.contain('Social media app for people interested in space and are looking to express thoughts Supports sign-up/sign-in, user post history, joining/creating groups, and posting features Deployed on cloud using AWS EC2') 
           
            
            var secondProject = j['projects'][1]['description']
            expect(secondProject).to.contain('Web application for summarizing a video/document into a smaller video or document of 20% of its original length with additional notes on important keywords. Implemented microservices architecture for sign')



            
        })
    

    })
    })
