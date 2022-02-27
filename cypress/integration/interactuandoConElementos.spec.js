describe('Interactuando con los elementos', () => {
	it('Click', () => {
		cy.visit('/buttons')
		cy.get('button').eq(3).click()
		cy.get('#dynamicClickMessage')
			.should('be.visible')
			.and('contain', 'You have done a dynamic click')
	})

	it('Double Click', () => {
		cy.visit('/buttons')
		cy.get('#doubleClickBtn').dblclick()
		cy.get('#doubleClickMessage')
			.should('be.visible')
			.and('contain', 'You have done a double click')
	})

	it('Right Click', () => {
		cy.visit('/buttons')
		cy.get('#rightClickBtn').rightclick()
		cy.get('#rightClickMessage')
			.should('be.visible')
			.and('contain', 'You have done a right click')
	})

	it('Force Click', () => {
		cy.visit('/dynamic-properties')
		// cy.get('#enableAfter').click({ timeout: 0 })
		cy.get('#enableAfter').click({ timeout: 0, force: true })
	})

	it('Click por posicion', () => {
		cy.visit('/buttons')
		cy.get('button').eq(3).parent().parent().click('topRight')
		cy.get('button').eq(3).parent().parent().click('bottomLeft')
		cy.get('button').eq(3).parent().parent().click(5, 60)
	})

	it('Multiple Click', () => {
		cy.visit('/buttons')
		cy.get('.btn.btn-primary').click({ multiple: true })
	})

	it('Click con teclas alternativas', () => {
		cy.visit('/buttons')
		cy.get('button').eq(3).click({
			shiftKey: true,
			// p optionKey
			altKey: true,
			ctrlKey: true,
			// windows o command en mac
			metaKey: true,
		})
	})

	it.only('Inputs type text', () => {
		cy.visit('/automation-practice-form')
		cy.get('#firstName').type('Javier')
		cy.get('#lastName').type('Fuentes')
		//Observa que pasa si se vuelve a mandar el type , el texto se concatena
		cy.get('#firstName').type('Javier')
		//Entonces limpiemos el input
		cy.get('#firstName').type('{selectAll}{backspace}')
		cy.get('#firstName').type('Otro nombre')
		//Otra forma de hacerlo
		cy.get('#firstName').clear()
		//Mocernos al otro input
		cy.get('#firstName').type('Otro nombre{enter}')
	})
})
