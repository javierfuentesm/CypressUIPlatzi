// before(() => {
// 	//solo si se quiere correr antes de los dos bloques
// 	cy.visit('/automation-practice-form')
// })


describe('Aserciones', () => {
	// beforeEach(() => {
	// 	cy.visit('/automation-practice-form')
	// })
	before(() => {
		cy.visit('/automation-practice-form')
	})

	afterEach(() => {
		cy.reload()
	})

	after(() => {
		// si quiero continuar con otro bloque en otra url
		cy.visit('/')
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
		cy.get('#firstName').then((element) => {
			expect(element).to.be.visible
			expect(element).to.have.attr('placeholder', 'First Name')
		})
	})
	it('Aserciones 3', () => {
		cy.get('#firstName').then((element) => {
			assert.equal(element.attr('placeholder'), 'First Name')
		})
	})
})

describe('Segundo Bloque', () => {
	beforeEach(() => {
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
})
