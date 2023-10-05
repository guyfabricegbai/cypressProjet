describe('Controle Authentification', () => {
    it('Echec de connexion', () => {        
        cy.visit('/')
        cy.intercept('POST', '**/login*').as('authUser')
    
        
        //cy.get('#login23',{timeout:10000}).click()
        cy.get('#login2').click()
        cy.wait(2000)
        cy.get('#loginusername').type('guyfabriceArmelgbai').debug()
        cy.get('#loginpassword').type('F225abrice').debug()
        cy.get('.btn.btn-primary').eq(2).click()
        
        cy.wait('@authUser').should((response) => {
            //expect(response).property('statusCode').to.equal(200)
            //expect(response).to.have.property('errorMessage')
            expect(response).property('response').property('body').property('errorMessage').to.contain('User does not exist.')
          })
    });

    it('Accéder au Home', () => {     
        cy.intercept('POST', '**/bycat*').as('postProduct')
        cy.visit('https://www.demoblaze.com/')
        
        
        cy.contains('Phones').as('menuPhones')
        cy.get('@menuPhones').click()
        cy.wait('@postProduct').its('response.statusCode').should('eq',200)

        /*
        cy.contains('Laptops').as('menuLaptops')
        cy.get('@menuLaptops').click()
        cy.wait(2000)
        cy.contains('Monitors').as('menuMonitors')
        cy.get('@menuMonitors').click()
        cy.wait(2000)
        */
    });

    it('Créer un login utilisateur', () => {        
        cy.visit('https://www.demoblaze.com/')
        
        //cy.get('#login23',{timeout:10000}).click()
        cy.get('#signin2').click()
        cy.wait(2000)
        cy.get('#sign-username').type('guyfabricegbai')
        cy.get('#sign-password').type('F225abrice')
        cy.get('.btn.btn-primary').eq(1).click()
    });

    it('Contrôle liste menu', () => {        
        cy.visit('/')
        //cy.contains('Phones').should('be.visible') 
        //cy.contains('Laptops').should('be.visible') 
        //cy.contains('Monitors').should('be.visible') 
        
        cy.get('.list-group').within(() => {
            //cy.contains('Phones').should('be.visible') 
            cy.get('.list-group-item').eq(1).should('contain', 'Phones')
            cy.get('.list-group-item').eq(2).should('contain', 'Laptops')
            cy.get('.list-group-item').eq(3).should('contain', 'Monitors')
            //cy.get('#itemc:last').should('contains', 'Monitors')
          })
    });

    it.only('Test de plan de navigation', () => {
        cy.visit('https://www.browserstack.com/')
        cy.get('body').trigger('keydown', { keyCode: 27});
        cy.wait(500);
        //cy.get('#animated-container').realPress('Escape')
        //cy.wait(2000)
        cy.get('#developers-dd-toggle').click()
        cy.wait(2000)
        
    });
});