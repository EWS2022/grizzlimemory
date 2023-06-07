let menuStartButtons = document.querySelectorAll('.menu_open');
let firstCard = null;
let secondCard = null;
let allCards = document.querySelectorAll('.box__cards');
let wrapper = document.querySelector('.wrapper');
let startButton = document.querySelector('.menu_start');
let menu = document.querySelector('.menu');
let time = 60;
let span = document.querySelector('.time__span');
let select = document.querySelector('select');
span.innerText = time + 's';
let lostBlock = document.querySelector('#lost');
let winBlock = document.querySelector('#win');
let cardsOpen = 0;
let grizzli = document.querySelector('.grizzli');
let win = document.querySelector('.win');
let lost = document.querySelector('.lost');
console.log(cardsOpen)
randomCardsPlace();
for (let i = 0; i < allCards.length; i++) {
    allCards[i].onclick = function () {
        if (secondCard == null && !allCards[i].classList.contains('_flip')) {
            allCards[i].classList.add('_flip');
            if (firstCard == null) {
                firstCard = allCards[i];
            } else {
                secondCard = allCards[i];
                cardsCompare();
            }
        }
    }
}

startButton.onclick = function () {
    wrapper.classList.add('_hidden');
    menu.classList.add('_hidden');
    time = select.value;
    span.innerText = time + 's';
    startButton.classList.add('_startButtonNoActive');
    menu.classList.remove('_show');
    timerStart();
}

function randomCardsPlace() {
    for (let i = 0; i < allCards.length; i++) {
        let randomNumber = Math.floor(Math.random() * 16);
        allCards[i].style.order = randomNumber;
    }
}

function timerStart() {
    console.log('start');
    let timerInterval = setInterval(() => {
        console.log('ok');
        time = time - 1;
        span.innerText = time + 's';
        if (time == 0) {
            clearInterval(timerInterval);
            wrapper.classList.remove('_hidden');
            lostBlock.classList.add('_show');
            lost.play();
        }
        if (cardsOpen == 8) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

function cardsCompare() {
    let firstSrc = firstCard.querySelector('img').src;
    let secondSrc = secondCard.querySelector('img').src;
    console.log(firstSrc, secondSrc, 'ok');
    if (firstSrc == secondSrc) {
        firstCard = null;
        secondCard = null;
        cardsOpen = cardsOpen + 1;
        grizzli.play();
        if (cardsOpen == 8) {
            wrapper.classList.remove('_hidden');
            winBlock.classList.add('_show');
            win.play();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('_flip');
            secondCard.classList.remove('_flip');
            firstCard = null;
            secondCard = null;
        }, 1000);

    }
}

function newGame() {
    for (let i = 0; i < allCards.length; i++) {
        allCards[i].classList.remove('_flip');
    }
    randomCardsPlace();
    winBlock.classList.remove('_show');
    lostBlock.classList.remove('_show');
    menu.classList.add('_show');
    cardsOpen = 0;
    time = 60;
    startButton.classList.remove('_startButtonNoActive');

}

for (let i = 0; i < menuStartButtons.length; i++) {
    menuStartButtons[i].onclick = function () {
        newGame();
    }
}