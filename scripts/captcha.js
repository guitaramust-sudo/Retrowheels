class Captcha {
    selectors = {
        captchaLetter: '.captcha__letter',
        capthaField: '.field__captcha',
        errorText: '[data-js-error]',
        submitButton: '.feedback-form__submit-button'
    }

    correctCaptcha = ''
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    constructor() {
        this.captchaLetterElements = document.querySelectorAll(this.selectors.captchaLetter)
        this.capthaField = document.querySelector(this.selectors.capthaField)

        if(!this.capthaField) {
            return
        }

        this.fillCaptcha()
        this.Bindevents()
    }

    fillCaptcha() {
        this.captchaLetterElements.forEach((captchaLetterElement) => {
            let randomIndex = Math.floor(Math.random() * this.characters.length);
            this.correctCaptcha += this.characters[randomIndex]
            captchaLetterElement.textContent = this.characters[randomIndex]
        })
    }

    onChange(event) {
        const { target } = event
        this.validateField(target)
    }

    validateField(target) {
        if (target.value != this.correctCaptcha) {
            document.querySelector(this.selectors.errorText).textContent = "Каптча введена неверно"
            document.querySelector(this.selectors.submitButton).disabled = true

        }
        else {
            document.querySelector(this.selectors.errorText).textContent = ""
            document.querySelector(this.selectors.submitButton).disabled = false
        }
    }

    Bindevents(){
        this.capthaField.addEventListener('change', (event) => this.onChange(event))
    }
    
}

export default Captcha