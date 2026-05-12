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

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById('changing-word');
    if (!element) return;

    const wordsEs = ['discurso', 'lenguaje', 'poder', 'engaño', 'relato', 'impacto'];
    const wordsEn = ['discourse', 'language', 'power', 'deception', 'story', 'impact'];

    const savedLang = localStorage.getItem('lang') || 'es';
    let words = savedLang === 'en' ? wordsEn : wordsEs;
    let index = 0;
    const typeSpeed = 100;
    const eraseSpeed = 50;
    const pauseTime = 1000;
    let timeoutId = null;

    function typeWord(word, charIndex = 0) {
      if (charIndex <= word.length) {
        element.textContent = word.substring(0, charIndex);
        timeoutId = setTimeout(() => typeWord(word, charIndex + 1), typeSpeed);
      } else {
        timeoutId = setTimeout(() => eraseWord(word, word.length - 1), pauseTime);
      }
    }

    function eraseWord(word, charIndex) {
      if (charIndex >= 0) {
        element.textContent = word.substring(0, charIndex);
        timeoutId = setTimeout(() => eraseWord(word, charIndex - 1), eraseSpeed);
      } else {
        index = (index + 1) % words.length;
        timeoutId = setTimeout(() => typeWord(words[index], 0), typeSpeed);
      }
    }

    document.addEventListener('langchange', (e) => {
      words = e.detail.lang === 'en' ? wordsEn : wordsEs;
      if (timeoutId) clearTimeout(timeoutId);
      index = 0;
      typeWord(words[0], 0);
    });

    typeWord(words[index]);
  });
}
