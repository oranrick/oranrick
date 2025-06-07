class WordCycler {
  constructor(words) {
    this.words = words;
    this.index = 0;
  }

  next() {
    this.index = (this.index + 1) % this.words.length;
    return this.words[this.index];
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = WordCycler;
}

// Browser initialization with typing effect
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById('changing-word');
    if (!element) return;

    const words = ['palabras', 'empatía', 'amor', 'ética', 'abrazos'];
    let index = 0;
    const typeSpeed = 100;   // tiempo entre letras al escribir
    const eraseSpeed = 50;   // tiempo entre letras al borrar
    const pauseTime = 2000;  // pausa antes de borrar

    function typeWord(word, charIndex = 0) {
      if (charIndex <= word.length) {
        element.textContent = word.substring(0, charIndex);
        setTimeout(() => typeWord(word, charIndex + 1), typeSpeed);
      } else {
        setTimeout(() => eraseWord(word, word.length - 1), pauseTime);
      }
    }

    function eraseWord(word, charIndex) {
      if (charIndex >= 0) {
        element.textContent = word.substring(0, charIndex);
        setTimeout(() => eraseWord(word, charIndex - 1), eraseSpeed);
      } else {
        index = (index + 1) % words.length;
        setTimeout(() => typeWord(words[index], 0), typeSpeed);
      }
    }

    typeWord(words[index]);
  });
}
