/// <reference types="cypress" />
const util = require('./utils/utils')
require('cypress-xpath');



describe('Testes de Cadastro de Usuário - XPATH', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com');
        cy.xpath('//a[@href="/login"]').click();
    });

    it('Realizar um cadastro válido', () => {
        const nomeUnico = util.gerarNomeUnico("brTest");
        cy.xpath('//input[@data-qa="signup-name"]').type(nomeUnico);
        cy.xpath('//input[@data-qa="signup-email"]').type(`${nomeUnico}@gmail.com`);
        cy.xpath('//button[@data-qa="signup-button"]').click();
        cy.xpath('//input[@id="id_gender1"]').check();
        cy.xpath('//input[@data-qa="password"]').type('123', {log: false})
        cy.xpath('//select[@data-qa="days"]').select('13')
        cy.xpath('//select[@data-qa="months"]').select('July')
        cy.xpath('//select[@data-qa="years"]').select('2000')
        cy.xpath('//input[@name="newsletter"]').click() 
        cy.xpath('//input[@name="optin"]').click()
        cy.xpath('//input[@data-qa="first_name"]').type(nomeUnico)
        cy.xpath('//input[@data-qa="last_name"]').type('lastName')
        cy.xpath('//input[@id="company"]').type('Empresa A') 
        cy.xpath('//input[@data-qa="address"]').type('Rua')
        cy.xpath('//input[@id="address2"]').type('Avenida') 
        cy.xpath('//select[@data-qa="country"]').select('Canada')
        cy.xpath('//input[@data-qa="state"]').type('SP')
        cy.xpath('//input[@data-qa="city"]').type("Rio")
        cy.xpath('//input[@data-qa="zipcode"]').type('0123456-90')
        cy.xpath('//input[@data-qa="mobile_number"]').type('88999999999')
        cy.xpath('//button[@data-qa="create-account"]').click()

        cy.url().should('includes', '/account_created')
        cy.xpath('//b[@data-qa="account-created"]').should('have.text', 'Account Created!')
    });

    it('Realizar login válido', () => {
        cy.xpath('//input[@data-qa="login-email"]').type("brtest1234@gmail.com")
        cy.xpath('//input[@data-qa="login-password"]').type("1234")
        cy.xpath('//button[@data-qa="login-button"]').click()

        cy.xpath('//i[contains(@class, "fa-user")]').parent().should('contain', 'brtest')
        cy.xpath('//a[@href="/logout"]').should('be.visible')
    });

    it('Realizar login inválido', () => {
        cy.xpath('//input[@data-qa="login-email"]').type("invalid987654321@gmail.com")
        cy.xpath('//input[@data-qa="login-password"]').type("987654")
        cy.xpath('//button[@data-qa="login-button"]').click()

        cy.xpath('//div[contains(@class, "login-form")]//p[contains(text(), "Your email or password is incorrect!")]').should('be.visible')
    });

    it('Realizar logout', () => {
        cy.xpath('//input[@data-qa="login-email"]').type("brtest1234@gmail.com")
        cy.xpath('//input[@data-qa="login-password"]').type("1234")
        cy.xpath('//button[@data-qa="login-button"]').click()
        cy.xpath('//a[@href="/logout"]').should('be.visible').click()

        cy.url().should('contain', 'login')
        cy.contains('Login to your account')
    });

    it('Cadastrar usuário com email existente', () => {
        const nomeUnico = util.gerarNomeUnico("brTest");
        cy.xpath('//input[@data-qa="signup-name"]').type(nomeUnico);
        cy.xpath('//input[@data-qa="signup-email"]').type(`${nomeUnico}@gmail.com`);
        cy.xpath('//button[@data-qa="signup-button"]').click();
        cy.xpath('//input[@id="id_gender1"]').check();
        cy.xpath('//input[@data-qa="password"]').type('123', {log: false})
        cy.xpath('//select[@data-qa="days"]').select('13')
        cy.xpath('//select[@data-qa="months"]').select('July')
        cy.xpath('//select[@data-qa="years"]').select('2000')
        cy.xpath('//input[@name="newsletter"]').click() 
        cy.xpath('//input[@name="optin"]').click()
        cy.xpath('//input[@data-qa="first_name"]').type(nomeUnico)
        cy.xpath('//input[@data-qa="last_name"]').type('lastName')
        cy.xpath('//input[@id="company"]').type('Empresa A') 
        cy.xpath('//input[@data-qa="address"]').type('Rua')
        cy.xpath('//input[@id="address2"]').type('Avenida') 
        cy.xpath('//select[@data-qa="country"]').select('Canada')
        cy.xpath('//input[@data-qa="state"]').type('SP')
        cy.xpath('//input[@data-qa="city"]').type("Rio")
        cy.xpath('//input[@data-qa="zipcode"]').type('0123456-90')
        cy.xpath('//input[@data-qa="mobile_number"]').type('88999999999')
        cy.xpath('//button[@data-qa="create-account"]').click()
        cy.xpath('//a[@data-qa="continue-button"]').click()
        cy.xpath('//a[@href="/logout"]').should('be.visible').click()
        
        cy.xpath('//input[@data-qa="signup-name"]').type(nomeUnico);
        cy.xpath('//input[@data-qa="signup-email"]').type(`${nomeUnico}@gmail.com`);
        cy.xpath('//button[@data-qa="signup-button"]').click();

        cy.xpath('//form[@action="/signup"]/p').should('contain', 'Email Address already exist!')
    });
})