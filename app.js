const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;
let scoreboard = document.querySelector('#scoreboard ol');

const startButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');

let phrases = [
  "twinkle twinkle little star",
  "old mac donald had a farm",
  "the wheels of the bus go round and round",
  "ring a ring a rosie",
  "hickory dickory doc the mouse ran up the clock"
];

startButton.addEventListener('click', () => {
  overlay.style.display = 'none';
});

function getRandomPhraseAsArray(arr) {
  let num = Math.ceil(Math.random() * arr.length) - 1;
  let randomPhrase = arr[num];
  let phraseAsArray = randomPhrase.split('');
  return phraseAsArray;
};

let phraseArray = getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    const letter = arr[i]
    const li = document.createElement('li');
    const ul = document.querySelector('#phrase ul');
    li.textContent = letter;
    ul.appendChild(li);
    if(letter !== ' ') {
      li.className = 'letter'
    }
    else {
      li.className = 'space'
    }
  }
}

addPhraseToDisplay(phraseArray);

function checkLetter(button) {
  let letters = document.getElementsByClassName('letter');
  let matchingLetter = null;
  for (let i = 0; i < letters.length; i += 1) {
    let letter = letters[i];
    if (letter.textContent === button) {
      matchingLetter = button;
      letter.classList.add('show');
    }
  }
  return matchingLetter;
}


qwerty.addEventListener('click', (e) => {
  if(e.target.tagName == 'BUTTON') {
    e.target.classList.add('chosen');
    let button = e.target.textContent;
    let letterFound = checkLetter(button);
    if(letterFound === null) {
      missed += 1;
      heart = document.querySelector('.tries');
      scoreboard.removeChild(heart);
      e.target.disabled = true;
    }
  }
  checkWin()
})

function checkWin() {
  let totalShown = document.getElementsByClassName('show').length;
  let totalLetters = document.getElementsByClassName('letter').length;
  let title = document.querySelector('.title');
  if(totalShown === totalLetters) {
    overlay.classList.add('win');
    overlay.style.display = 'flex';
    title.innerText = 'You Won';
  } else if (missed >= 5) {
    overlay.classList.add('lose');
    overlay.style.display = 'flex';
    title.innerText = 'You Lost';
  }
}

