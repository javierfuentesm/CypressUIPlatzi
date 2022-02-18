describe('Probando configuracion', () => {
	it('Obteniendo por un tag', () => {
		cy.visit('/automation-practice-form')
		cy.get('input')
	})

	it('Obteniendo por un atributo', () => {
		cy.get('[placeholder="First Name"]')
	})

	it('Obteniendo por un atributo y tag', () => {
		cy.get('input[placeholder="First Name"]')
	})

	it('Obteniendo por un id', () => {
		cy.get('#firstName')
	})

	it('Obteniendo por un class', () => {
		cy.get('.mr-sm-2.form-control')
	})

	it('Usando contains', () => {
		cy.contains('Reading')
		cy.contains('.header-wrapper', 'Widgets')
	})

	it('Usando parent', () => {
		// Obten el elemento Padre
		cy.get('input[placeholder="First Name"]').parent()
		//Obetner los elementos Padres en general
		cy.get('input[placeholder="First Name"]').parents()
		// Obten el elemento Padre y el elemento Hijo
		cy.get('input[placeholder="First Name"]').parents().find('label')

		// Obteniendo el elemento padre y el elemento hijo limitando el padre
		cy.get('input[placeholder="First Name"]').parents('form').find('label')

		cy.get('form').find('label')
		//uso incorrrecto de find

		cy.find('label')
	})
})
