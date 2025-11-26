class LikeButton {
    selectors = {
        likeButton: "[data-js-like-button]",
    }

    stateClasses = {
        isActive: 'is-active',
    }

    constructor() {
        this.likeButtonElements = document.querySelectorAll(this.selectors.likeButton);
        this.BindEvents();
    }

    BindEvents () {
        this.likeButtonElements.forEach(likeButtonElement => {likeButtonElement.addEventListener('click', () => this.onLikeButtonClick(likeButtonElement))})                   //;
    }

    onLikeButtonClick = (likeButtonElement) => {
        likeButtonElement.classList.toggle(this.stateClasses.isActive); 
    }
}

export default LikeButton;