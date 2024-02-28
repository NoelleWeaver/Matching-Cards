const grid = document.querySelector('grid');
const cards = [ ];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.querySelector('.score').textContent = score;

function shuffle() {
    let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}
function generateCards() {
    for (let card of cards) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-name', card.name);
        cardElement.innerHTML = `
        <div class='front'>
        <img class='front-image' src=${card.image} />
        </div>
        <div class='back'></div>
        `;
        grid.appendChild(cardElement);
        cardElement.addEventListener('click', flipCard);
    }
}
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flipped');
    if(!firstCard) {
        firstCard = this;
        return;
    }
    secondCard = this;
    score++;
    document.querySelector('.score').textContent = score;
    lockBoard = true;
}
function checkMatch() {
    let match = firstCard.dataset.name === secondCard.dataset.name;
    match ? disableCards() : unflipCards();
}
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    reset();
}
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        reset();
    }, 1000);
}
function reset() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}
function restart() {
    reset();
    shuffleCards();
    score = 0;
    document.querySelector('.score').textContent = score;
    grid.innerHTML = '';
    generateCards();
}