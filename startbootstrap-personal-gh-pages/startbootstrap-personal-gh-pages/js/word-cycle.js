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

// Browser initialization
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById('changing-word');
    if (!element) return;
    const cycler = new WordCycler(['palabras', 'empatía', 'amor', 'ética', 'abrazos']);
    element.textContent = cycler.words[0];
    setInterval(() => {
      element.textContent = cycler.next();
    }, 2000);
  });
}
