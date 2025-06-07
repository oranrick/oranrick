const WordCycler = require('../startbootstrap-personal-gh-pages/startbootstrap-personal-gh-pages/js/word-cycle.js');

const cycler = new WordCycler(['palabras', 'empatía', 'amor', 'ética', 'abrazos']);

let word = cycler.next();
if (word !== 'empatía') {
  console.error('First cycle failed:', word);
  process.exit(1);
}

cycler.next(); // amor
cycler.next(); // ética
cycler.next(); // abrazos
word = cycler.next();
if (word !== 'palabras') {
  console.error('Cycle wrap failed:', word);
  process.exit(1);
}

console.log('Cycle test passed');
