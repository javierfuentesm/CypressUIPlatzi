describe('Esperando por elementos', () => {
	beforeEach(() => {
		cy.visit('https://platzi.com')
	})
	it('Espera por un tiempo definido', () => {
		//Mala practica casi nunca debera de usarse
		cy.wait(5000)
	})

	it('Espera por un elemento', () => {
		//el tiempo por default es de 4 segundos
		cy.get('.ButtonLogin-cta')
	})

	it('Espera por un elemento', () => {
		//a pesar de que el tiempo es el mismo , es un timeout silo encuentra antes seguirá avanzando no esperara los 6 segundos siempre
		cy.get('.ButtonLogin-cta', { timeout: 6000 })
	})

	it('Espera por un elemento y hacer una asercion', () => {
		//a pesar de que el tiempo es el mismo , es un timeout silo encuentra antes seguirá avanzando no esperara lso 5 segundos siempre
		// esto  modifica el timeout the todas los comandos  incluyendo el should
		cy.get('.ButtonLogin-cta', { timeout: 5000 }).should('be.visible')
		// esto  no sirve  ,recuerda que hay que reintentar el comando con las sersiones no solo las aserciones
		cy.get('.ButtonLogin-cta').should('be.visible', { timeout: 5000 })
		// https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Applying-Timeouts
	})
})

describe('Esperando por elementos', () => {
	beforeEach(() => {
		cy.visit('https://demoqa.com')
	})

	it('Deshabilitando el retry', () => {
		// lo deshabilitamos
		cy.get('.banner-image444', { timeout: 5000 })
		cy.get('.banner-image444', { timeout: 0 })
	})
})
