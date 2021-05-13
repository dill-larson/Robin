
context('API CALLS for experience', () =>{

    
    it('GET ',function(){

        cy.request({
            method : 'GET',
            url : 'http://127.0.0.1:5000/resume/build?description=Participate in Design, develop the requrieemnts and test high throughput back-end settlement systems Develop efficient, elegant, clean code with no unnecessary complication or abstraction Lead code review sessions Passionate about low latency systems Ability to deal with high volume data Continuously look for opportunities for performance tuning Collaborate with other engineers, architects and DBAs Collaborate with Product Managers You love solving problems and building solutions. You’re self-motivated and have a demonstrated track record of self-learning andgoing above and beyond You’re excited to create high traffic backend distributed services for customers You want to hit the ground running on Day 1; you take ownership of yourwork and can work independently. You’ve designed and clearly understand concepts like WebServices, SOA, REST APIs, SPRING Framework. You know the fundamentals of Object-Oriented Programming using Java, C++;familiarity with additional development tools such as JUnit, Maven %26 Jenkins is aplus. You have experience working with javascript, nodeJS etc. to showcase your creativity. You love Git and are at home with source control concepts such as merge, rebaseand pull. You’ve used SQL %26 NoSQL solutions and understand the pros and cons of relationaland free form databases. Good hands on experience in Oracle database. You’ve comfortable using application server frameworks, for example Tomcator JBOSS. You believe in Agile development and putting the customer first in anything youdesign; experience with SCRUM is a plus. You’re a strong advocate of good coding standards and like the use of coding toolsthat will push you to improve the code you deliver like Sonar. You know how to identify performance bottlenecks and use good codingpatterns to avoid them in the first place. 3+ years of experience in software development. Experience in object-oriented programming and concepts Experienced in Distributed System development using Java/J2EE/Web Technologies/C++. Proven track record in delivering highly available, scalable systems on time Conversant in design patterns Good understanding of web services and related standards like REST/JSON Experience in caching software Experience in Spring framework and other open source frameworks Experience developing data-driven applications using an industry standard RDBMS (Oracle, DB2, SQL Server, MySQL, Informatica, etc.) Experience in Unix based development environment Experience in both development and quality assurance activities Experience in QA methodologies, test automation and automation frameworks Experience in driving Integration testing, UAT with external vendors Experience in JUnit, Selenium is a plus Experience working in payments or financial services industry is a plus Exposure to Agile Methodologies Seniority levelNot Applicable Employment typeFull-time Job functionEngineeringInformation Technology IndustriesComputer SoftwareFinancial ServicesInternet',
           
        }).then(function(response){
            expect(response.body).have.property('experience')
        
           // cy.log(JSON.stringify(response.body.experience,["score"]))

            var j = response.body
            //cy.log(j['experience'][0]['score'])

            var firstAchievement = j['experience'][0]['achievements']
           
            expect(firstAchievement).to.contain('Built S3 buckets and managed policies for S3 buckets and used S3 bucket and Glacier for storage and backup on  AWS')


            var secondAchievement = j['experience'][1]['achievements']

            expect(secondAchievement).to.contain('Leading development and operations processes inside team Developing CI/CD roadmap and implementing to the project') 
        })
    

    })



    it('GET ',function(){

        cy.request({
            method : 'GET',
            url : 'http://127.0.0.1:5000/resume/build?description=Should have experience in leading development and operations for atleast 2 years. Should be familiar with Developing CI/CD roadmap. KNowledge of  AWS services administration: IAM, VPC, Route 53, EC2, S3, CodeBuild, CodeDeploy, Redshift, RDS, CloudWatch, CloudFormation Developis is a big plus.'
           
        }).then(function(response){
            expect(response.body).have.property('experience')
        
           // cy.log(JSON.stringify(response.body.experience,["score"]))

            var j = response.body
            //cy.log(j['experience'][0]['score'])

            var firstAchievement = j['experience'][0]['achievements']
            expect(firstAchievement).to.contain('Leading development and operations processes inside team Developing CI/CD roadmap and implementing to the project') 
           
            

            var secondAchievement = j['experience'][1]['achievements']
            expect(secondAchievement).to.contain('Built S3 buckets and managed policies for S3 buckets and used S3 bucket and Glacier for storage and backup on  AWS')


            
        })
    

    })
    })


