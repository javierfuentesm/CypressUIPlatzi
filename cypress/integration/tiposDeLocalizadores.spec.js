describe('Tipos de localizadores', () => {
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
		// Obtener el elemento Padre
		cy.get('input[placeholder="First Name"]').parent()
		//Obtener los elementos Padres en general
		cy.get('input[placeholder="First Name"]').parents()
		// Obtener el elemento Padre y el elemento Hijo
		cy.get('input[placeholder="First Name"]').parents().find('label')

		// Obteniendo el elemento padre y el elemento hijo limitando el padre
		cy.get('input[placeholder="First Name"]').parents('form').find('label')

		cy.get('form').find('label')
		//uso incorrecto de find

		cy.find('label')
	})
})
