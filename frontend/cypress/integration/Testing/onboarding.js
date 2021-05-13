
context('Onboarding', () =>{
    
    // Login test
    it('Login ',() => {


        cy.visit('http://localhost:3000/')
        cy.get('#root > div > div:nth-child(1) > div > a:nth-child(3)').click()
        //cy.get('#root > div > ul > a:nth-child(2)').click() // Login up button
       
        cy.wait(3000)

        // Successfull login 
        cy.get('#email').clear().type('ypetyppe-8320@yopmail.com')
        cy.get('#password').clear().type('Sandeep123@')
        cy.get('#root > div > div > div > div:nth-child(2) > div > form > div.row > button').click()
        cy.wait(3000)
        cy.contains('General Information')
        cy.wait(1000)
       
        
    })


    // onboarding for general contact info
    it('General Contact ',() => {

        cy.get('#root > div > div > div.mt-5.col > div > form > div.row > button').click() // Next button
        cy.contains('Required')
        cy.wait(1000)

       // Enter name and phone
       cy.get('#name').clear().type('Mike Thomson')
       cy.get('#phone').clear().type('5108976576')

       // Enter invalid email
       cy.get('#email').clear().type('Mikethomson')
       cy.contains('Invalid email')

       // Enter valid email
       cy.get('#email').clear().type('Mikethomson@sjsu.com')
       
       // Enter invalid personal website
       cy.get('#website').clear().type('Mike.com')
       cy.contains('Invalid url')

       // Enter valid personal website
       cy.get('#website').clear().type('http://www.Mike.com')

       // Enter linkedin username
       cy.get('#linkedin').clear().type('Mike8787')

        // Enter github username
       cy.get('#github').clear().type('Mike8787')
       cy.get('#root > div > div > div.mt-5.col > div > form > div.row > button').click() // Next

       cy.contains('Degrees')




       
        
    })



    // onboarding for Education
    it('Education ',() => {


        cy.get('#root > div > div > div.mt-5.col > div > div.onboarding-card-display.row > div:nth-child(2) > div > a').click() // Add button
        cy.wait(1000)

        cy.get('#root > div > div > div.mt-5.col > div > form > div:nth-child(5) > button.onboarding-form-btn.ml-2.btn.btn-light-accent.text-white').click() // Add button
        cy.contains('Required')
        cy.wait(1000)


        cy.get('#school').clear().type('San Jose State University')
        cy.get('#degree').clear().type('Bachelors')
        cy.get('#field_of_study').clear().type('Music')

        cy.get('#start_date').clear().type('2020-01-01')
        cy.get('#graduation_date').clear().type('2019-01-01')
        cy.wait(1000)
        cy.contains('End data cannot be before start data')
        

        
    })

   // onboarding for Education (Valid dates)
    it('Education ',() => {

        cy.visit('http://localhost:3000/onboarding/general')


        // Enter name and phone
       cy.get('#name').clear().type('Mike Thomson')
       cy.get('#phone').clear().type('5108976576')

       // Enter valid email
       cy.get('#email').clear().type('Mikethomson@sjsu.com')
       
       // Enter valid personal website
       cy.get('#website').clear().type('http://www.Mike.com')

       // Enter linkedin username
       cy.get('#linkedin').clear().type('Mike8787')

        // Enter github username
       cy.get('#github').clear().type('Mike8787')
       cy.get('#root > div > div > div.mt-5.col > div > form > div.row > button').click() // Next

       cy.contains('Degrees')


        cy.get('#root > div > div > div.mt-5.col > div > div.onboarding-card-display.row > div:nth-child(2) > div > a').click() // Add button
        cy.wait(1000)

        cy.get('#root > div > div > div.mt-5.col > div > form > div:nth-child(5) > button.onboarding-form-btn.ml-2.btn.btn-light-accent.text-white').click() // Add button
        cy.contains('Required')
        cy.wait(1000)

        cy.get('#school').clear().type('San Jose State University')
        cy.get('#degree').clear().type('Bachelors')
        cy.get('#field_of_study').clear().type('Music')

        cy.get('#start_date').clear().type('2020-01-01')
        cy.get('#graduation_date').clear().type('2021-01-01')


        cy.get('#gpa').clear().type('-3.4')
        cy.contains('GPA must be higher to equal to 1.0')
        cy.wait(1000)

        cy.get('#gpa').clear().type('5.4')
        cy.contains('GPA must be lower or equal to 5.0')
        cy.wait(1000)


        cy.get('#gpa').clear().type('ab')
        cy.contains('gpa must be a ')
        cy.wait(1000)


        cy.get('#gpa').clear().type('3.4')

        cy.get('#root > div > div > div.mt-5.col > div > form > div:nth-child(5) > button.onboarding-form-btn.ml-2.btn.btn-light-accent.text-white').click() // save
        cy.contains('Music')
        
    })

    it('Experience',() => {

        cy.visit('http://localhost:3000/onboarding/general')


        // Enter name and phone
       cy.get('#name').clear().type('Mike Thomson')
       cy.get('#phone').clear().type('5108976576')

       // Enter valid email
       cy.get('#email').clear().type('Mikethomson@sjsu.com')
       
       // Enter valid personal website
       cy.get('#website').clear().type('http://www.Mike.com')

       // Enter linkedin username
       cy.get('#linkedin').clear().type('Mike8787')

        // Enter github username
       cy.get('#github').clear().type('Mike8787')
       cy.get('#root > div > div > div.mt-5.col > div > form > div.row > button').click() // Next

       cy.contains('Degrees')


       cy.get('#root > div > div > div.mt-5.col > div > div:nth-child(3) > button').click()

        cy.get('#root > div > div > div.mt-5.col > div > div.onboarding-card-display.row > div:nth-child(2) > div > a').click() // Add 

        cy.get('#root > div > div > div.mt-5.col > div > form > div.row > button.onboarding-form-btn.ml-2.btn.btn-light-accent.text-white').click()
        cy.contains('Required')

        cy.get('#company').clear().type('PayPal')
        cy.get('#position').clear().type('Manager')
        cy.get('#city').clear().type('Tracy')

        cy.get('#start_date').clear().type('2020-01-01')
        cy.get('#end_date').clear().type('2019-01-01')

        cy.get('#root > div > div > div.mt-5.col > div > form > div.row > button.onboarding-form-btn.ml-2.btn.btn-light-accent.text-white').click()
        cy.contains('Professional History')
        cy.get('#root > div > div > div.mt-5.col > div > div:nth-child(3) > button').click()

        

    })


    it('Skills',() => {

       cy.contains('Separated by commas ')
       cy.get('#skills_input').clear().type('Java, React, Cypress')
       cy.get('#root > div > div > div.mt-5.col > div > form > div.row > button').click()
        

    })

    it('Projects',() => {

        cy.get('#root > div > div > div.mt-5.col > div > div.onboarding-card-display.row > div:nth-child(2) > div > a').click() // Add prokjects
        cy.get('#name').clear().type('Tic Tac Toe')
        cy.get('#start_date').clear().type('2020-01-01')
        cy.get('#end_date').clear().type('2019-01-01')

        cy.get('#about').clear().type('AI')

        cy.get('#root > div > div > div.mt-5.col > div > form > div.row > button.onboarding-form-btn.ml-2.btn.btn-light-accent.text-white').click()
        cy.get('#root > div > div > div.mt-5.col > div > div:nth-child(3) > button').click()

        cy.contains('Search for a job')

         
 
     })


    

    

    


})