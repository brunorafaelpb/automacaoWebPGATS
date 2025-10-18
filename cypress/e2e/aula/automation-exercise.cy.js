/// <reference types="cypress" />
const util = require('./utils/utils')

import userData from '../../fixtures/example.json'



describe('Testes de Cadastro de Usuário', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com');
        cy.get('a[href="/login"]').click();
    });

    it('Realizar um cadastro válido', () => {
        // Account Information
        const nomeUnico = util.gerarNomeUnico("brTest");
        cy.get('[data-qa="signup-name"]').type(nomeUnico);
        cy.get('[data-qa="signup-email"]').type(`${nomeUnico}@gmail.com`);
        cy.get('[data-qa="signup-button"]').click();
        cy.get('#id_gender1').check();
        cy.get('[data-qa="password"]').type('123', {log: false})
        cy.get('[data-qa="days"]').select('13')
        cy.get('[data-qa="months"]').select('July')
        cy.get('[data-qa="years"]').select('2000')
        cy.get('[name="newsletter"]').click()
        cy.get('[name="optin"]').click()

        // Address Information
        cy.get('[data-qa="first_name"]').type(nomeUnico)
        cy.get('[data-qa="last_name"]').type('lastName')
        cy.get('input#company').type('Empresa A')
        cy.get('[data-qa="address"]').type('Rua')
        cy.get('input#address2').type('Avenida')
        cy.get('[data-qa="country"]').select('Canada')
        cy.get('[data-qa="state"]').type('SP')
        cy.get('[data-qa="city"]').type("Rio")
        cy.get('[data-qa="zipcode"]').type('0123456-90')
        cy.get('[data-qa="mobile_number"]').type('88999999999')
        cy.get('[data-qa="create-account"]').click()

        // Validação
        cy.url().should('includes', '/account_created')
        cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!')
    });

    it('Realizar login válido', () => {
        cy.get('[data-qa="login-email"]').type("brtest1234@gmail.com")
        cy.get('[data-qa="login-password"]').type("1234")
        cy.get('[data-qa="login-button"]').click()

        cy.get('i.fa-user').parent().should('contain', 'brtest')
        cy.get('a[href="/logout"]').should('be.visible')
    });

    it('Realizar login inválido', () => {
        cy.get('[data-qa="login-email"]').type("invalid987654321@gmail.com")
        cy.get('[data-qa="login-password"]').type("987654")
        cy.get('[data-qa="login-button"]').click()

        cy.get('.login-form > form > p').parent().should('contain', 'Your email or password is incorrect!')
    });

    it('Realizar logout', () => {
        cy.get('[data-qa="login-email"]').type("brtest1234@gmail.com")
        cy.get('[data-qa="login-password"]').type("1234")
        cy.get('[data-qa="login-button"]').click()
        cy.get('a[href="/logout"]').should('be.visible').click()

        cy.url().should('contain', 'login')
        cy.contains('Login to your account')
    });

    it('Cadastrar usuário com email existente', () => {
        // Account Information
        const nomeUnico = util.gerarNomeUnico("brTest");
        cy.get('[data-qa="signup-name"]').type(nomeUnico);
        cy.get('[data-qa="signup-email"]').type(`${nomeUnico}@gmail.com`);
        cy.get('[data-qa="signup-button"]').click();
        cy.get('#id_gender1').check();
        cy.get('[data-qa="password"]').type('123', {log: false})
        cy.get('[data-qa="days"]').select('13')
        cy.get('[data-qa="months"]').select('July')
        cy.get('[data-qa="years"]').select('2000')
        cy.get('[name="newsletter"]').click()
        cy.get('[name="optin"]').click()

        // Address Information
        cy.get('[data-qa="first_name"]').type(nomeUnico)
        cy.get('[data-qa="last_name"]').type('lastName')
        cy.get('input#company').type('Empresa A')
        cy.get('[data-qa="address"]').type('Rua')
        cy.get('input#address2').type('Avenida')
        cy.get('[data-qa="country"]').select('Canada')
        cy.get('[data-qa="state"]').type('SP')
        cy.get('[data-qa="city"]').type("Rio")
        cy.get('[data-qa="zipcode"]').type('0123456-90')
        cy.get('[data-qa="mobile_number"]').type('88999999999')
        cy.get('[data-qa="create-account"]').click()
        cy.get('[data-qa="continue-button"]').click()
        cy.get('a[href="/logout"]').click()
        
        // O beforeEach já te deixou na página de login,
        // então podemos seguir com a tentativa de novo cadastro.
        cy.get('[data-qa="signup-name"]').type(nomeUnico)
        cy.get('[data-qa="signup-email"]').type(`${nomeUnico}@gmail.com`)
        cy.get('[data-qa="signup-button"]').click()

        cy.get('.signup-form > form > p').parent().should('contain', 'Email Address already exist!')
    });
})