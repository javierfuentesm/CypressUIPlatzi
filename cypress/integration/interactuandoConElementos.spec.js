describe('Interactuando con los elementos', () => {
	// para el ejemplo de extraer el texto de un elemento
	let texto

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

	it('Inputs type text', () => {
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

	it('Checkboxes y radio botnones ', () => {
		cy.visit('/automation-practice-form')
		// a veces fallara porque lo cubre otro elemento
		// cy.get('#gender-radio-1').click()
		// se puede hacer asi pero no es recomendado porque no esta cumpliendo el comportamiento que tuviera el usuario
		// cy.get('#gender-radio-1').click({ force: true })
		// Acercamiento recomendado
		cy.get("label[for='gender-radio-1']").click()

		// Checkbox , lo mismo si usamos el input directo
		// cy.get('#hobbies-checkbox-1').click()
		// cy.get('#hobbies-checkbox-1').click({ force: true })
		// Acercamiento recomendado
		cy.get("label[for='hobbies-checkbox-1']").click()
	})
	//Es importante tener el function y no solo un arrow function ay que las arrow function carecen de contexto y por ende del this
	it('Extrayendo informacion', function () {
		cy.visit('/automation-practice-form')
		// a veces fallara porque lo cubre otro elemento

		cy.get('#firstName').as('nombre')
		cy.get('@nombre').type('Javier')
		// Primera manera de hacerlo
		cy.get('@nombre').then(($nombre) => {
			texto = $nombre.val()
			expect(texto).to.equal('Javier')
		})

		// Segunda manera de hacerlo, invoke solo invoca una funcion que en este caso el elemento que nos regresa el get , como jquery tiene
		cy.get('@nombre').invoke('val').should('equal', 'Javier')
		cy.get('@nombre').invoke('val').as('nombreGlobal')
	})

	//Es importante tener el function y no solo un arrow function ya que las arrow function carecen de contexto y por ende del this
	it('pasando informacion entre its', function () {
		// Con la variable global
		cy.get('#lastName').type(texto)

		//CCon el alias
		cy.get('#lastName').type(this.nombreGlobal)
	})
})
