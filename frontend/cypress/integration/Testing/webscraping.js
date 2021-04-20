context('JobScraping', () =>{
    
    it('Check URL ',() => {
        cy.request({
            url: 'http://127.0.0.1:5000/scrape?url=https://www.linkedin.com/jobs/view/2346070467/?alternateChannel=search&refId=7GYFSHaW65JkJD4QvM059w%3D%3D&trackingId=vqQohV0mcM6%2BGeGhQwDKfg%3D%3D'

        })

        .then ((resp)=> {expect(resp.status). to.eq(200)})
    })

    it('Valid URL ',() => {
        cy.visit('http://localhost:3003/')
        cy.get('#url').clear().type('https://www.linkedin.com/jobs/view/2346070467/?alternateChannel=search&refId=7GYFSHaW65JkJD4QvM059w%3D%3D&trackingId=vqQohV0mcM6%2BGeGhQwDKfg%3D%3D')
        cy.get(' #root > div > form > button').click()
        cy.contains('ago') 
        cy.wait(2000)
        
    })

    it('Invalid URL with reloading page ',() => {
        cy.visit('http://localhost:3003/')
        cy.get('#url').clear().type('https://www.hired.com')
        cy.get(' #root > div > form > button').click()
        cy.contains('ago').should('not.exist')
        cy.wait(2000)
    })
    
    it('Valid URL with reloading page ',() => {

        cy.visit('http://localhost:3003/')
        cy.get('#url').clear().type('https://www.linkedin.com/jobs/view/2425908219/?alternateChannel=smljob&refId=q0XFAh8UCQhTEUwDn%2F%2B4yQ%3D%3D&trackingId=%2BstooZrbVvbFTNA0n19DnQ%3D%3D')
        cy.get(' #root > div > form > button').click()
        cy.contains('ago') 
        cy.wait(1000)


    })

    it('Invalid URL without reloading page ',() => {
        cy.get('#url').clear().type('https://www.hired.com')
        cy.get(' #root > div > form > button').click()
        cy.contains('ago').should('not.exist')
    })


})