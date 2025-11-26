class FloatingSquares {
  constructor(
    containerSelector = ".contacts",
    squareSelector = ".contacts__square"
  ) {
    this.container = document.querySelector(containerSelector);
    this.squares = document.querySelectorAll(squareSelector);
    this.init();
  }

  init() {
    if (this.squares.length > 0) {
      this.applyRandomProperties();
    }
  }

  applyRandomProperties() {
    const containerRect = this.container.getBoundingClientRect();

    this.squares.forEach((square) => {
      const squareRect = square.getBoundingClientRect();
      const maxX = containerRect.width - squareRect.width * 6;
      const maxY = containerRect.height - squareRect.height * 3;

      const positions = [];
      for (let i = 0; i < 3; i++) {
        positions.push({
          x: Math.random() * maxX,
          y: Math.random() * maxY,
        });
      }

      // Устанавливаем CSS переменные
      positions.forEach((pos, index) => {
        const i = index + 1;
        square.style.setProperty(`--pos-x${i}`, `${pos.x}px`);
        square.style.setProperty(`--pos-y${i}`, `${pos.y}px`);
        square.style.setProperty(`--rot${i}`, `${pos.rotation}deg`);
      });

      const initialX = Math.random() * maxX;
      const initialY = Math.random() * maxY;

      square.style.left = `${initialX}px`;
      square.style.top = `${initialY}px`;
    });
  }

  update() {
    this.applyRandomProperties();
  }
}

export default FloatingSquares;
