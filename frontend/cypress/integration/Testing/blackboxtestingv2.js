
// This test is if the user logs in  after signing up and completing the onboarding pages (i.e. login for not the first time)
context('Sign up and Log in', () =>{
    
    // Sign up test
    it('Sign up ',() => {

        cy.visit('http://localhost:3000/')
      
        cy.get('#root > div > div > div:nth-child(1) > div > div > div.signup-nav.ml-auto > div > div > a:nth-child(1)').click() // Sign up button
        cy.contains('Confirm Password') 

        cy.get('#submit').click() // Next button
        cy.contains('Required')
        cy.wait(2000)

        // Trying to sign up with invalid email
        cy.get('#name').clear().type('Mike Johnson') 
        cy.get('#email').clear().type('mike')
        cy.contains('Invalid email')
        cy.wait(2000)

        // Trying to sign up with invalid password format
        cy.get('#email').clear().type('notayiy679@troikos.com')
        cy.get('#password').clear().type('Sand')
        cy.contains('Your password must contain 8 characters, at least one: uppercase, lowercase, number and special case character')
        cy.wait(2000)

        // Trying to sign up with not matching passwords
        cy.get('#password').clear().type('Sandeep123@')
        cy.get('#confirm_password').clear().type('Johnny')
        cy.contains('Passwords must match')
        cy.wait(2000)

        // Signed up with valid credentials
        cy.get('#confirm_password').clear().type('Sandeep123@')
        cy.get('#submit').click() // Next button
        cy.contains('The username you entered is already being used')
        cy.wait(1000)

       
  
        
    })

     // Login test
    it('Login ',() => {
      
        cy.get('#root > div > div > div:nth-child(2) > div:nth-child(2) > form > div.form-footer > span > a').click() // Login button
        cy.contains('have an account yet ')
        cy.wait(1000)

        // Login without inputting login credentials
        cy.get('#submit').click() // Next Button
        cy.contains('Required')
        cy.wait(2000)
    
        // Login with invalid email format
        cy.get('#email').clear().type('mike')
        cy.contains('Invalid email')
        cy.wait(2000)


        // Login with invalid email (email is not signed up)
        cy.get('#email').clear().type('invalid@yopmail.com')
        cy.get('#password').clear().type('Gurseerat@')
        cy.get('#submit').click()   // Next button
        cy.contains('The username and password you entered did not match our records. Double-check and try again.')
        cy.wait(2000)


        // Successfull login 
        cy.get('#email').clear().type('notayiy679@troikos.com')
        cy.get('#password').clear().type('Sandeep123@')
        cy.get('#submit').click()
        
    })


})



context('Job Search', () =>{

    it('scrape',() => {

    cy.get('#url').type('https://www.linkedin.com/jobs/view/2465440819/?alternateChannel=search&refId=L5KAGKkvYrRwjfm69309aw%3D%3D&trackingId=0AsTH2VGeKjXzc37H72GmQ%3D%3D')
    cy.get('#root > div > div.search-card > form > div.form-footer > button').click()

    cy.wait(7000)

    cy.get('#root > div > div.results-container > div:nth-child(2) > div > div.col-md-6 > div > div > div.card-header.card-header > button').click()
    cy.wait(1000)


    cy.get('#root > div > div.results-container > div:nth-child(3) > div > div.col-md-6 > div > div > div.card-header.card-header > button').click()
    cy.wait(1000)

    cy.get('#root > div > div.results-container > div:nth-child(2) > div > div.card-btns.col > button').click()
    cy.wait(6000)

    cy.readFile('cypress/downloads/resume.pdf')

    })



})