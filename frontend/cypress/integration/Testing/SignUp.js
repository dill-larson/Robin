
context('JobScraping', () =>{
    
    // Sign up test
    it('Sign up ',() => {

        cy.visit('http://localhost:3000/')
      
        cy.get('#root > div > div:nth-child(1) > div > a:nth-child(1)').click() // Sign up button
        cy.contains('Confirm Password') 

        cy.get(' #root > div > div > div:nth-child(2) > form > div.row > button').click() // Next button
        cy.contains('Required')
        cy.wait(2000)

        // Trying to sign up with invalid email
        cy.get('#name').clear().type('Mike Johnson') 
        cy.get('#email').clear().type('mike')
        cy.contains('Invalid email')
        cy.wait(2000)

        // Trying to sign up with invalid password format
        cy.get('#email').clear().type('ypetyppe-8320@yopmail.com')
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
        cy.get('#root > div > div > div:nth-child(2) > form > div.row > button').click() // Next button
        cy.contains('Email Verification')
        cy.wait(2000)
  
        
    })

    // Login test
    it('Login ',() => {
      
        cy.get('#root > div > div:nth-child(1) > div > a:nth-child(3)').click() // Login button
        cy.contains('have an account yet ')
        cy.wait(1000)

        // Login without inputting login credentials
        cy.get('#root > div > div > div > div:nth-child(2) > div > form > div.row > button').click() // Next Button
        cy.contains('Required')
        cy.wait(2000)
    
        // Login with invalid email format
        cy.get('#email').clear().type('mike')
        cy.contains('Invalid email')
        cy.wait(2000)

        //Login with invalid password format
        cy.get('#email').clear().type('ypetyppe-8320@yopmail.com')
        cy.get('#password').clear().type('Sand')
        cy.contains('Password must be 6 or more characters')
        cy.wait(2000)

        // Login with invalid email (email is not signed up)
        cy.get('#email').clear().type('invalid@yopmail.com')
        cy.get('#password').clear().type('Gurseerat@')
        cy.get('#root > div > div > div > div:nth-child(2) > div > form > div.row > button').click()   // Next button
        cy.contains('The username and password you entered did not match our records. Double-check and try again.')
        cy.wait(2000)

        // Login with invalid password (email is signed up)
        cy.get('#email').clear().type('ypetyppe-8320@yopmail.com')
        cy.get('#password').clear().type('Sandeep123')
        cy.get('#root > div > div > div > div:nth-child(2) > div > form > div.row > button').click() // Next button
        cy.contains('The username and password you entered did not match our records. Double-check and try again.')
        cy.wait(2000)

        // Successfull login 
        cy.get('#email').clear().type('ypetyppe-8320@yopmail.com')
        cy.get('#password').clear().type('Sandeep123@')
        cy.get('#root > div > div > div > div:nth-child(2) > div > form > div.row > button').click()
        cy.wait(1000)
        cy.contains('Onboarding')
        cy.wait(1000)
       
        
    })

    // Trying to Sign up with existing email
    it('Sign up with existing email ',() => {
        cy.visit('http://localhost:3000/')
      
        cy.get('#root > div > div:nth-child(1) > div > a:nth-child(1)').click() // Sign up button
        cy.contains('Confirm Password') 
    
        cy.get('#name').clear().type('Mike Johnson')
        cy.get('#email').clear().type('ypetyppe-8320@yopmail.com')
    
        cy.get('#password').clear().type('Sandeep123@')
        cy.get('#confirm_password').clear().type('Sandeep123@')

        cy.get(' #root > div > div > div:nth-child(2) > form > div.row > button').click() // Next button
        cy.contains('User already exists') 
        cy.wait(2000)
        
        // Here we found a bug on the frontend part is is not giving the error message that the user is already 
        // existing. Console shows the error.
    })









    // it('Sign up without meeting the pasword requirements ',() => {
    //     cy.visit('http://localhost:3000/')
      
    //     cy.get('#root > div > ul > a:nth-child(3)').click()
    //     cy.contains('Cofirm Password') 
    
    //     cy.get('#name').clear().type('Mike Johnson')
    //     cy.get('#email').clear().type('ananiketto-6838@yopmail.com')
    
    //     cy.get('#password').clear().type('Seerat')
    //     cy.get('#confirm_password').clear().type('Seerat')

    //     cy.get(' #root > div > div > div:nth-child(2) > form > div.row > button').click()

        // })

    


})