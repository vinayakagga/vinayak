const text = "Hi! , My Name is Vinayak Aggarwal .";
const minSpeed = 20; 
const maxSpeed = 50; 
const pauseAfter = 1000;
const repeatCount = 2; 
const element = document.querySelector('.namee');

function createCaret() {
  const caret = document.createElement('span');
  caret.className = 'blinking-caret';
  caret.textContent = '|';
  return caret;
}

function typeAndDeleteNTimes(text, el, min, max, pause, times) {
  let i = 0;
  let isTyping = true;
  let caret = createCaret();
  let cycles = 0;
  let startedThirdTyping = false;
  el.textContent = '';
  el.appendChild(caret);

  function animate() {
    if (isTyping) {
      el.textContent = text.slice(0, i);
      el.appendChild(caret);
      if (i < text.length) {
        i++;
        setTimeout(animate, Math.floor(Math.random() * (max - min + 1)) + min);
      } else {
        if (!startedThirdTyping && cycles === times) {
          // Third typing cycle: stop immediately after writing full text
          startedThirdTyping = true;
          el.textContent = text;
          el.appendChild(caret);
          return;
        }
        isTyping = false;
        setTimeout(animate, pause);
      }
    } else {
      el.textContent = text.slice(0, i);
      el.appendChild(caret);
      if (i > 0) {
        i--;
        setTimeout(animate, Math.floor(Math.random() * (max - min + 1)) + min);
      } else {
        cycles++;
        if (cycles < times) {
          isTyping = true;
          setTimeout(animate, pause);
        } else if (!startedThirdTyping) {
          // Start third typing, but do not delete after
          isTyping = true;
          setTimeout(animate, pause);
        }
      }
    }
  }
  animate();
}

if (element) {
  typeAndDeleteNTimes(text, element, minSpeed, maxSpeed, pauseAfter, repeatCount);
}
