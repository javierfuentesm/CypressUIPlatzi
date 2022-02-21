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

				//esto no servira para cypress modo headless
				console.log('Soy la longitud', inputs.length)

				//usando debugger, es necesario abrir las devtools y debe de ir dentro del then sino probablemente no funcione como deberia
				debugger
				//cypress log
				cy.log(inputs)

				//cypress task
				cy.task('log', inputs.length)
				//Las aserciones se explicaran a detalle en la proxima clase
				expect(inputs.length).to.eq(15)
				expect(divs.length).to.eq(70)
				expect(labels.length).to.eq(16)
				// Si queremos que este elemento de Jquery se vuelva un elemento de cypress debemos de usar wrap
				cy.wrap(inputs).should('have.length', 15)
			})
		//forma mas corta si solo queremos debuggear
		cy.get('input[placeholder="First Name"]').then(console.log)

		//cypress pausa
		cy.pause()

		// Se muestra en la consola el resultado de la tarea
		cy.get('input[placeholder="First Name"]').debug()

		// como se haria en selenium o puppeteer
		// const form = cy.get('input[placeholder="First Name"]').parents('form')
		// form.find('input')
		// form.find('div')
		// form.find('label')
	})
})
