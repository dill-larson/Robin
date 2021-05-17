/ This test is if the user logs in for the first time
// Note : This test requires to have a account already signed up and verified and then try to log in with that account
// Change lines 27 and 79 with that email account 
context('Sign up and Log in', () =>{
    
    // Sign up test
    it('Sign up ',() => {

        cy.visit('http://localhost:3000/')
      
        cy.get('#root > div > div > div:nth-child(1) > div > div > div.signup-nav.ml-auto > div > div > a:nth-child(1)').click() // Sign up button
        cy.contains('Confirm Password') 

        cy.get('#submit').click() // Next button
        cy.contains('Required')
        cy.wait(2000)

        // Trying to sign up with invalid email
        cy.get('#name').clear().type('Mike Johnson') 
        cy.get('#email').clear().type('mike')
        cy.contains('Invalid email')
        cy.wait(2000)

        // Trying to sign up with invalid password format

        cy.get('#email').clear().type('fewegoh995@labebx.com')
        

        cy.get('#password').clear().type('Sand')
        cy.contains('Your password must contain 8 characters, at least one: uppercase, lowercase, number and special case character')
        cy.wait(2000)

        // Trying to sign up with not matching passwords
        cy.get('#password').clear().type('Sandeep123@')
        cy.get('#confirm_password').clear().type('Johnny')
        cy.contains('Passwords must match')
        cy.wait(2000)

        // Signed up with valid credentials
        cy.get('#confirm_password').clear().type('Sandeep123@')
        cy.get('#submit').click() // Next button
        cy.contains('The username you entered is already being used')
        cy.wait(1050)

       
  
        
    })

     // Login test
    it('Login ',() => {
      
        cy.get('#root > div > div > div:nth-child(2) > div:nth-child(2) > form > div.form-footer > span > a').click() // Login button
        cy.contains('have an account yet ')
        cy.wait(1000)

        // Login without inputting login credentials
        cy.get('#submit').click() // Next Button
        cy.contains('Required')
        cy.wait(2000)
    
        // Login with invalid email format
        cy.get('#email').clear().type('mike')
        cy.contains('Invalid email')
        cy.wait(2000)


        // Login with invalid email (email is not signed up)
        cy.get('#email').clear().type('invalid@yopmail.com')
        cy.get('#password').clear().type('Gurseerat@')
        cy.get('#submit').click()   // Next button
        cy.contains('The username and password you entered did not match our records. Double-check and try again.')
        cy.wait(2000)


        // Successfull login 

        cy.get('#email').clear().type('fewegoh995@labebx.com')
        

        cy.get('#password').clear().type('Sandeep123@')
        cy.get('#submit').click()
        
    })


})


context('Onboarding', () =>{
    
    
    it('Contact ',() => {


        
        cy.get('#root > div > div > div:nth-child(2) > div.onboarding-form-wrapper.col > form > div.form-footer > button').click() // Next button
        cy.contains('Required')
        cy.wait(1000)

       // Enter name and phone
       cy.get('#name').clear().type('Mike Thomson')
       cy.get('#phone').clear().type('5108976576')

       // Enter invalid email
       cy.get('#email').clear().type('Mikethomson')
       cy.contains('Invalid email')

       // Enter valid email

       cy.get('#email').clear().type('fewegoh995@labebx.com')
     
     
       
       // Enter invalid personal website
       cy.get('#website').clear().type('Mike.com')
       cy.contains('Invalid url')

       // Enter valid personal website
       cy.get('#website').clear().type('http://www.Mike.com')

       // Enter linkedin username
       cy.get('#linkedin').clear().type('Mike8787')

        // Enter github username
       cy.get('#github').clear().type('Mike8787')
       cy.get('#root > div > div > div:nth-child(2) > div.onboarding-form-wrapper.col > form > div.form-footer > button').click() // Next

        
        
    })

    it('Education ',() => {


        cy.get('#root > div > div > div:nth-child(2) > div.onboarding-form-wrapper.col > div > div.onboarding-card-display.row > div > div > a').click() // Add button
        cy.wait(1000)

        cy.get('#root > div > div > div:nth-child(2) > div.onboarding-form-wrapper.col > form > div.form-footer > button').click() // Add button
        cy.contains('Required')
        cy.wait(1000)


        cy.get('#school').clear().type('San Jose State University')
        cy.get('#degree').clear().type('Bachelors')
        cy.get('#field_of_study').clear().type('Music')


        cy.get('#city').type('San Jose')

        cy.get('#start_date').clear().type('2020-01-01')
        cy.get('#graduation_date').clear().type('2019-01-01')
        cy.wait(3000)
        cy.contains('Date must be later than start date')

        cy.get('#start_date').clear().type('2020-01-01')
        cy.get('#graduation_date').clear().type('2021-01-01')


        cy.get('#gpa').clear().type('-3.4')
        cy.contains('GPA must be higher to equal to 1.0')
        cy.wait(1000)

        cy.get('#gpa').clear().type('5.4')
        cy.contains('GPA must be lower or equal to 5.0')
        cy.wait(1000)


        cy.get('#gpa').clear().type('ab')
        cy.contains('gpa must be a ')
        cy.wait(1000)

        cy.get('#gpa').clear().type('3.4')
        cy.get('#root > div > div > div:nth-child(2) > div.onboarding-form-wrapper.col > form > div.accordion > div > div.card-header > button').click() // extras
       
        cy.get('#honors').clear().type('President Scholar Award')
        cy.get('#rel_course_work').clear().type('Data Structures and Algorithsms')
        cy.get('#activities').clear().type('Hackathon Google')
        cy.get('#root > div > div > div:nth-child(2) > div.onboarding-form-wrapper.col > form > div.form-footer > button').click()
        cy.get('#root > div > div > div:nth-child(2) > div.onboarding-form-wrapper.col > div > div:nth-child(3) > button').click()

        

        
    })

    
    it('Experience',() => {
        cy.get('#root > div > div > div:nth-child(2) > div.onboarding-form-wrapper.col > div > div.onboarding-card-display.row > div > div > a').click()
        cy.get('#root > div > div > div:nth-child(2) > div.onboarding-form-wrapper.col > form > div.form-footer > button').click() // save
        

        cy.contains('Required')

        cy.get('#company').clear().type('PayPal')
        cy.get('#position').clear().type('Manager')
        cy.get('#city').clear().type('Tracy')

        cy.get('#start_date').clear().type('2019-01-01')
        cy.get('#end_date').clear().type('2020-01-01')

        cy.get('#rel_achievements').clear().type('Experience in JavaScript frameworks, ReactJS. HTML, CSS, JavaScript')

        cy.get('#root > div > div > div:nth-child(2) > div.onboarding-form-wrapper.col > form > div.form-footer > button').click() //save
        cy.get('#root > div > div > div:nth-child(2) > div.onboarding-form-wrapper.col > div > div:nth-child(3) > button').click()


    })

    it('Skills',() => {
        cy.get('#skills_input').clear().type('Java')
        cy.get('#root > div > div > div:nth-child(2) > div.onboarding-form-wrapper.col > div > form > div.form-footer > button.text-white.btn.btn-dark-accent').click()
         
        cy.get('#skills_input').clear().type('C')
        cy.get('#root > div > div > div:nth-child(2) > div.onboarding-form-wrapper.col > div > form > div.form-footer > button.text-white.btn.btn-dark-accent').click()
         

        // cy.get('#skills_input').clear().type('React')
        // cy.get('#root > div > div > div:nth-child(2) > div.onboarding-form-wrapper.col > div > form > div.form-footer > button.text-white.btn.btn-dark-accent').click()
         
       
        cy.get('#root > div > div > div:nth-child(2) > div.onboarding-form-wrapper.col > div > form > div.form-footer > button.text-white.ml-auto.btn.btn-light-accent').click()
 
     })


     it('Projects',() => {

        cy.get(' #root > div > div > div:nth-child(2) > div.onboarding-form-wrapper.col > div > div.onboarding-card-display.row > div > div > a').click() // Add prokjects
        cy.get('#name').clear().type('The SJSU Market')
        cy.get('#start_date').clear().type('2018-01-01')
        cy.get('#end_date').clear().type('2019-01-01')

        cy.get('#about').clear().type('Used React, NodeJs, HTML, CSS,MERN, to build an ecommerce website')

        cy.get('#root > div > div > div:nth-child(2) > div.onboarding-form-wrapper.col > form > div.form-footer > button').click()
        cy.get('#root > div > div > div:nth-child(2) > div.onboarding-form-wrapper.col > div > div:nth-child(3) > button').click()

        

         
 
     })

     

  
    



})


context('Job Search', () =>{

    it('scrape',() => {

    cy.get('#url').type('https://www.linkedin.com/jobs/view/2481183382/')
    cy.get('#root > div > div.search-card > form > div.form-footer > button').click()

    cy.wait(12000)

    cy.get('#root > div > div.results-container > div:nth-child(2) > div > div.col-md-6 > div > div > div.card-header.card-header > button').click()
    cy.wait(2000)


    cy.get('#root > div > div.results-container > div:nth-child(3) > div > div.col-md-6 > div > div > div.card-header.card-header > button').click()
    cy.wait(2000)

    cy.get('#root > div > div.results-container > div:nth-child(2) > div > div.card-btns.col > button').click()
    cy.wait(8000)

    cy.readFile('cypress/downloads/resume.pdf')

    })



})