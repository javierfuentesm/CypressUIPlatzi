describe('Probando configuracion', () => {
    it('Obteniendo por un tag', () => {
        cy.visit('/automation-practice-form');
        cy.get('input')
    });

    it('Obteniendo por un atributo', () => {
        cy.get('[placeholder="First Name"]')
    });

    it('Obteniendo por un atributo y tag', () => {
        cy.get('input[placeholder="First Name"]')
    });

    it('Obteniendo por un id', () => {
        cy.get('#firstName')
    });

    it('Obteniendo por un class', () => {
        cy.get('.mr-sm-2.form-control')
    });
});