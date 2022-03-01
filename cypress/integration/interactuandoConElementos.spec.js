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
        cy.get('#enableAfter').click({timeout: 0, force: true})
    })

    it('Click por posicion', () => {
        cy.visit('/buttons')
        cy.get('button').eq(3).parent().parent().click('topRight')
        cy.get('button').eq(3).parent().parent().click('bottomLeft')
        cy.get('button').eq(3).parent().parent().click(5, 60)
    })

    it('Multiple Click', () => {
        cy.visit('/buttons')
        cy.get('.btn.btn-primary').click({multiple: true})
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
        // cy.get('#gender-radio-1').check({ force: true })
        // Acercamiento recomendado si usamos el label
        cy.get("label[for='gender-radio-1']").click()

        // Checkbox , lo mismo si usamos el input directo
        // cy.get('#hobbies-checkbox-1').check({ force: true })
        // cy.get('#hobbies-checkbox-1').uncheck({ force: true })
        // cy.get('#hobbies-checkbox-1').click({ force: true })
        // Acercamiento recomendado con label
        cy.get("label[for='hobbies-checkbox-1']").click()
        // desmarcar
        // cy.get("label[for='hobbies-checkbox-1']").click()
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

    it('Interactuando con dropdowns(select)', () => {
        // Con la variable global
        cy.visit('https://itera-qa.azurewebsites.net/home/automation')

        //Seleccionar por index
        cy.get('.custom-select').select(10)

        //Seleccionar por valor
        cy.get('.custom-select').select('3').should('have.value', '3')

        //Seleccionar por texto
        cy.get('.custom-select').select('Greece').should('have.value', '4')
    })

    it('Interactuando con dropdowns(select) dinamico', () => {
        // Con la variable global
        cy.visit('https://react-select.com/home')

        //Seleccionar por index
        cy.get('#react-select-6-input').type(' ')

        //Iterando por cada uno de los elementos
        cy.get('#react-select-6-listbox')
            .children()
            .children()
            .each(($el, index, $list) => {
                if ($el.text() === 'Red') {
                    $el.on('click')
                }
            })

        //Oh si conoces el id del elemento
        cy.get('#react-select-6-option-3').click()
    })

    it('Interactuando con tablas', () => {
        // Obteniendo los headers de la tabla
        cy.visit('https://www.w3schools.com/html/html_tables.asp')
        cy.get('#customers')
            .find('th')
            .each(($el, index, $list) => {
                cy.log($el.text())
            })

        cy.get('#customers')
            .find('th')
            .first()
            .invoke('text')
            .should('equal', 'Company')

        cy.get('#customers')
            .find('th')
            .eq(1)
            .invoke('text')
            .should('equal', 'Contact')

        cy.get('#customers')
            .find('th')
            .eq(2)
            .invoke('text')
            .should('equal', 'Country')

        // Validamos el numero de filas
        cy.get('#customers').find('tr').should('have.length', 7)

        cy.get('#customers')
            .find('tr')
            .eq(1)
            .find('td')
            .eq(1)
            .invoke('text')
            .should('equal', 'Maria Anders')

        cy.get('#customers')
            .find('tr')
            .eq(1)
            .find('td')
            .eq(1)
            .then(($el) => {
                const texto = $el.text()
                expect(texto).to.equal('Maria Anders')
                cy.wrap($el).should('contain', 'Maria Anders')
            })
    })

    it('Interactuando con data picker', () => {
        cy.visit('https://material.angular.io/components/datepicker/overview')
        cy.get('datepicker-overview-example')
            .find('input')
            .eq(0)
            .type('12/02/2005{enter}')

        cy.get('datepicker-overview-example').find('svg').click()
    })

    it('Interactuando con modals', () => {
        cy.visit('/modal-dialogs')
        cy.get('#showSmallModal').click()
        cy.get('#closeSmallModal').click()
    })

    it('Interactuando con popups', () => {
        cy.visit('/alerts')
        //Cypress automaticamente la acepta

        // Primer forma de hacerlo
        // cy.get('#confirmButton').click()
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.equal('Do you confirm action?')
        // })
        // cy.contains('You selected Ok').should('exist')

        // Segundo forma de hacerlo
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('#confirmButton').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?')
        })
        cy.contains('You selected Ok').should('exist')


        // rechazar la alerta
        // cy.get('#confirmButton').click()
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.equal('Do you confirm action?')
        //     return false
        // })
        // cy.contains('You selected Cancel').should('exist')

    })

    it('Interactuando con tooltips', () => {
        cy.visit('/tool-tips')
        cy.get('#toolTipButton').trigger('mouseover')
        cy.contains('You hovered over the Button').should('exist')
        cy.get('#toolTipButton').trigger('mouseout')
        cy.contains('You hovered over the Button').should('not.exist')

    })

    it.only('Interactuando con drag and drops', () => {
        cy.visit('/dragabble')
        cy.get('#dragBox')
            .trigger('mousedown', {which: 1, pageX: 600, pageY: 100})
            .trigger('mousemove', {which: 1, pageX: 600, pageY: 600})
            .trigger('mouseup')
    })


})
