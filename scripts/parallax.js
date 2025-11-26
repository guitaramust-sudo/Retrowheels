// Parallax effect
class ParallaxController {
  constructor() {
    this.parallaxElements = [];
    this.isScrolling = false;

    this.init();
  }

  init() {
    this.gatherElements();
    this.setupEventListeners();
    this.updateParallax();
  }

  gatherElements() {
    const elements = document.querySelectorAll("[data-js-parallax-bg]");
    this.parallaxElements = Array.from(elements).map((element) => ({
      element,
      speed: parseFloat(element.dataset.speed) || 0.5,
      position: 0,
    }));
  }

  setupEventListeners() {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => this.updateParallax(), {
      passive: true,
    });

    window.addEventListener("load", () => this.updateParallax());
  }

  updateParallax() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;

    this.parallaxElements.forEach((item) => {
      const element = item.element;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrolled = scrollY - elementTop;
        const movement = scrolled * item.speed;

        element.style.transform = `translate3d(0, ${movement}px, 0)`;
      }
    });
  }
}

export default ParallaxController;
