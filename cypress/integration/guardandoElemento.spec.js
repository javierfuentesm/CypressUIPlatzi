describe('Guardando elementos', () => {
	it('Repeticion', () => {
		cy.visit('/automation-practice-form')
		cy.get('input[placeholder="First Name"]').parents('form').find('label')
		cy.get('input[placeholder="First Name"]').parents('form').find('input')
		cy.get('input[placeholder="First Name"]').parents('form').find('div')

		// como se haria en selenium o puppeteer
		// const form = cy.get('input[placeholder="First Name"]').parents('form')
		// form.find('input')
		// form.find('div')
		// form.find('label')
	})

	it('como se hace en cypress', () => {
		cy.visit('/automation-practice-form')
		cy.get('input[placeholder="First Name"]')
			.parents('form')
			.then((form) => {
				const inputs = form.find('input')
				const divs = form.find('div')
				const labels = form.find('label')

				//Las asersiones se explicaran a detalle en la proxima clase
				expect(inputs.length).to.eq(15)
				expect(divs.length).to.eq(70)
				expect(labels.length).to.eq(16)
				// Si queremos que este elemento de Jquery se vuelva un elemento de cypress debemos de usar wrap
				cy.wrap(inputs).should('have.length', 15)
			})

		// como se haria en selenium o puppeteer
		// const form = cy.get('input[placeholder="First Name"]').parents('form')
		// form.find('input')
		// form.find('div')
		// form.find('label')
	})
})
