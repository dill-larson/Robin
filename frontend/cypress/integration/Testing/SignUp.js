
context('JobScraping', () =>{
    
    
    it('Sign up ',() => {
        cy.visit('http://localhost:3000/')
      
        cy.get('#root > div > ul > a:nth-child(3)').click()
        cy.contains('Cofirm Password') 
        cy.get(' #root > div > div > div:nth-child(2) > form > div.row > button').click()
        cy.contains('Required')
        cy.wait(2000)
        cy.get('#name').clear().type('Mike Johnson')
        cy.get('#email').clear().type('mike')
        cy.contains('Invalid email')
        cy.wait(2000)
        cy.get('#email').clear().type('ypetyppe-8320@yopmail.com')
        cy.get('#password').clear().type('Sand')
        cy.contains('Password must be 6 or more characters')
        cy.wait(2000)
        cy.get('#password').clear().type('Sandeep123@')
        cy.get('#confirm_password').clear().type('Johnny')
        cy.contains('Passwords must match')
        cy.wait(2000)
        cy.get('#confirm_password').clear().type('Sandeep123@')
        cy.get('#root > div > div > div:nth-child(2) > form > div.row > p > a').click()
        cy.contains('have an account yet ')
        cy.wait(2000)




       
        
    })


    it('Login ',() => {
        cy.visit('http://localhost:3000/')
      
        cy.get('#root > div > ul > a:nth-child(2)').click()
        cy.contains('have an account yet ')

        cy.get('#root > div > div > div > div:nth-child(2) > div > form > div.row > button').click()
        cy.contains('Required')
        cy.wait(2000)
    
        cy.get('#email').clear().type('mike')
        cy.contains('Invalid email')
        cy.wait(2000)

        cy.get('#email').clear().type('ypetyppe-8320@yopmail.com')
        cy.get('#password').clear().type('Sand')

        cy.contains('Password must be 6 or more characters')
        cy.wait(2000)

        cy.get('#password').clear().type('Sandeep123')
        cy.get('#root > div > div > div > div:nth-child(2) > div > form > div.row > button').click()
        cy.wait(2000)

        cy.get('#password').clear().type('Sandeep123@')
        cy.get('#root > div > div > div > div:nth-child(2) > div > form > div.row > button').click()
        cy.wait(1000)
        
    
        
    })


    it('Sign up with existing email ',() => {
        cy.visit('http://localhost:3000/')
      
        cy.get('#root > div > ul > a:nth-child(3)').click()
        cy.contains('Cofirm Password') 
    
        cy.get('#name').clear().type('Mike Johnson')
        cy.get('#email').clear().type('ypetyppe-8320@yopmail.com')
    
        cy.get('#password').clear().type('Sandeep123@')
        cy.get('#confirm_password').clear().type('Sandeep123@')

        cy.get(' #root > div > div > div:nth-child(2) > form > div.row > button').click()
        cy.wait(2000)

        

        
    })

    it('Sign up without meeting the pasword requirements ',() => {
        cy.visit('http://localhost:3000/')
      
        cy.get('#root > div > ul > a:nth-child(3)').click()
        cy.contains('Cofirm Password') 
    
        cy.get('#name').clear().type('Mike Johnson')
        cy.get('#email').clear().type('ananiketto-6838@yopmail.com')
    
        cy.get('#password').clear().type('Seerat')
        cy.get('#confirm_password').clear().type('Seerat')

        cy.get(' #root > div > div > div:nth-child(2) > form > div.row > button').click()

        
       
    



       
        
    })

    


})