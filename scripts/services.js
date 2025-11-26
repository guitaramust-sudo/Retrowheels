class ChoosedServices {
    selectors = {
        checkbox: '[data-js-checkbox]',
        choosedServicesList: '[data-js-choosed-services-list]',
        repair: '[data-js-repair]',

        plus: '[data-js-plus]',
        minus: '[data-js-minus]',
        quantityWheels: '[data-js-quantity-wheels]',
        cost: '[data-js-cost]',

        checkboxDiagnostics :'[data-js-checkbox-diagnostics]',
        diagnostics : '[data-js-diagnostics]',

        promocode: '[data-js-promocode]',
        promocodeResult: '[data-js-promocode-result]'
    }

    allCost = 0
    multipliyer = 1

    constructor() {       
        this.checkboxElement = document.querySelector(this.selectors.checkbox)
        this.choosedServicesListElement = document.querySelector(this.selectors.choosedServicesList)
        this.repairElement = document.querySelector(this.selectors.repair)

        if(!this.choosedServicesListElement) {
            return
        }

        this.checkboxDiagnosticsElement = document.querySelector(this.selectors.checkboxDiagnostics)
        this.diagnosticsElement = document.querySelector(this.selectors.diagnostics)

        this.plusElement = document.querySelector(this.selectors.plus)
        this.minusElement = document.querySelector(this.selectors.minus)

        this.costElement = document.querySelector(this.selectors.cost)

        this.promocodeElement = document.querySelector(this.selectors.promocode)
        this.promocodeResultElement = document.querySelector(this.selectors.promocodeResult)
        

        this.BindEvents()
    }

    BindEvents() {
        this.checkboxElement.addEventListener('click', () => this.onCheckBoxElementClick())

        this.plusElement.addEventListener('click', () => this.onPlusElementClick())

        
        this.minusElement.addEventListener('click', () => this.onMinusElementClick())

        this.checkboxDiagnosticsElement.addEventListener('click', () => this.onCheckBoxDiagnosticsElementClick())

        this.promocodeElement.addEventListener('change', (event) => this.onPromocodeElementChanged(event))


    }

    onCheckBoxElementClick() {
        if(this.checkboxElement.checked) {
            const choosedServicesElement = document.createElement('li');
            const choosedServicesTitle = document.createElement('p')
            choosedServicesTitle.textContent = this.repairElement.textContent + ': 15000 BTC'
            this.allCost += 15000
            choosedServicesTitle.classList.add('choosed-services__title')
            choosedServicesElement.appendChild(choosedServicesTitle)


            choosedServicesElement.classList.add('choosed-services__item')
            choosedServicesElement.classList.add('repair')
            this.choosedServicesListElement.appendChild(choosedServicesElement)
        }

        else {
            this.choosedServicesListElement.removeChild(this.choosedServicesListElement.querySelector('.repair'))
            this.allCost -= 15000
        }

        this.costElement.textContent = this.allCost*this.multipliyer


    }

    onCheckBoxDiagnosticsElementClick() {
        if(this.checkboxDiagnosticsElement.checked) {
            const choosedServicesElement = document.createElement('li');
            const choosedServicesTitle = document.createElement('p')
            choosedServicesTitle.textContent = this.diagnosticsElement.textContent + ': 10000 BTC'
            this.allCost += 10000
            choosedServicesTitle.classList.add('choosed-services__title')
            choosedServicesElement.appendChild(choosedServicesTitle)


            choosedServicesElement.classList.add('choosed-services__item')
            choosedServicesElement.classList.add('diagnostics')
            this.choosedServicesListElement.appendChild(choosedServicesElement)
        }

        else {
            this.choosedServicesListElement.removeChild(this.choosedServicesListElement.querySelector('.diagnostics'))
            this.allCost -= 10000
        }

        this.costElement.textContent = this.allCost*this.multipliyer

    }

    onPlusElementClick() {
        const quantityElement = document.querySelector(this.selectors.quantityWheels)
        quantityElement.textContent = Number(quantityElement.textContent) + 1

        if (quantityElement.textContent >= 20) {
            this.plusElement.disabled = true;
        }


        if (quantityElement.textContent >= 1) {
            if(!document.querySelector('.buy-wheels')) {
                const choosedServicesElement = document.createElement('li');
                const choosedServicesTitle = document.createElement('p')
                choosedServicesTitle.textContent = 'Автомобильные колеса: ' + (5000*Number(quantityElement.textContent)) + ' BTC'

                choosedServicesTitle.classList.add('choosed-services__title')
                choosedServicesTitle.classList.add('choosed-services__title-wheels')
                choosedServicesElement.appendChild(choosedServicesTitle)

                choosedServicesElement.classList.add('choosed-services__item')
                choosedServicesElement.classList.add('buy-wheels')
                this.choosedServicesListElement.appendChild(choosedServicesElement)
                this.allCost += 5000

            }

            else {
                document.querySelector('.choosed-services__title-wheels').textContent = 'Автомобильные колеса: ' + (5000*Number(quantityElement.textContent)) + ' BTC'
                this.allCost += 5000
            }
        }

        this.costElement.textContent = this.allCost*this.multipliyer
    }

    onMinusElementClick() {
        const quantityElement = document.querySelector(this.selectors.quantityWheels)

        if (Number(quantityElement.textContent) > 0) {
            quantityElement.textContent = Number(quantityElement.textContent) - 1
            this.allCost -= 5000
            document.querySelector('.choosed-services__title-wheels').textContent = 'Автомобильные колеса: ' + (5000*Number(quantityElement.textContent)) + ' BTC'
        }

        if(Number(quantityElement.textContent) === 0) {
            this.choosedServicesListElement.removeChild(this.choosedServicesListElement.querySelector('.buy-wheels'))
        }

        this.costElement.textContent = this.allCost*this.multipliyer

    }

    onPromocodeElementChanged(event) {
        const { target } = event
        if (target.value == 'AvtomatBudet') {
            this.multipliyer = 0.85
            this.promocodeResultElement.textContent = 'Промокод успешно применен'
        }
        else {
            this.multipliyer = 1
            this.promocodeResultElement.textContent = 'Промокод введен неверно'
        }



        this.costElement.textContent = this.allCost*this.multipliyer
    }

}

export default ChoosedServices