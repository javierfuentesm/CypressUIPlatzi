describe('Aserciones', () => {
	it('Navega a sitio', () => {
		cy.visit('/automation-practice-form')
	})
	it('Aserciones', () => {
		cy.url().should('include', 'demoqa.com')

		cy.get('#firstName')
			.should('be.visible')
			.should('have.attr', 'placeholder', 'First Name')

		cy.get('#firstName')
			.should('be.visible')
			.and('have.attr', 'placeholder', 'First Name')
	})

	it('Aserciones 2', () => {
		cy.visit('/automation-practice-form')
		cy.get('#firstName').then((element) => {
			expect(element).to.be.visible
			expect(element).to.have.attr('placeholder', 'First Name')
		})
	})
	it('Aserciones 3', () => {
		cy.visit('/automation-practice-form')
		cy.get('#firstName').then((element) => {
			assert.equal(element.attr('placeholder'), 'First Name')
		})
	})
})
