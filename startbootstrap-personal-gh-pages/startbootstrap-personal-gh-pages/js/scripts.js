/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

// Typing effect for rotating headline words
document.addEventListener('DOMContentLoaded', () => {
  const words = ['palabras', 'amor', 'empatía', 'ética', 'abrazos'];
  const el = document.getElementById('rotating-word');
  if (!el) return;

  let wordIndex = 0;
  let charIndex = el.textContent.length;
  let isDeleting = true;
  const hold = 2000; // time to hold each word

  function type() {
    const current = words[wordIndex];
    if (isDeleting) {
      charIndex--;
      el.textContent = current.substring(0, charIndex);
      if (charIndex <= 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 200);
      } else {
        setTimeout(type, 100);
      }
    } else {
      const word = words[wordIndex];
      charIndex++;
      el.textContent = word.substring(0, charIndex);
      if (charIndex >= word.length) {
        isDeleting = true;
        setTimeout(type, hold);
      } else {
        setTimeout(type, 150);
      }
    }
  }

  setTimeout(type, hold);
});
