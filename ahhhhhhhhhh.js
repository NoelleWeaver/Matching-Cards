// const cards = ['😢','😢','😒','😒','😶‍🌫️','😶‍🌫️','😖','😖','😪','😪','😭','😭','😱','😱','🥶','🥶','😡','😡','🤢','🤢','🤠','🤠','🥸','🥸','🤡','🤡','🤫','🤫','🤓','🤓','😎','😎'];

// // Fisher-Yates Shuffle Algorithm
// function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

// var shuffleCards = shuffle(cards);
// var openedCards = []; // Track open cards

// for (var i = 0; i < cards.length; i++) {
//     var box = document.createElement('div');
//     box.className = 'item';
//     box.innerHTML = shuffleCards[i];
//     document.querySelector('.game').append(box);

//     box.onclick = function() {
//         if (!this.classList.contains('boxOpen') && openedCards.length < 2) {
//             this.classList.add('boxOpen');
//             openedCards.push(this); // Add opened card to the array
//             if (openedCards.length === 2) {
//                 const card1 = openedCards[0].innerHTML;
//                 const card2 = openedCards[1].innerHTML;
//                 if (card1 === card2) {
//                     openedCards.forEach(card => card.classList.add('boxMatch'));
//                     if (document.querySelectorAll('.boxMatch').length === cards.length) {
//                         alert('You win!');
//                     }
//                     openedCards = []; // Clear the array
//                 } else {
//                     // Delay flipping cards back over
//                     setTimeout(() => {
//                         openedCards.forEach(card => card.classList.remove('boxOpen'));
//                         openedCards = []; // Clear the array
//                     }, 500);
//                 }
//             }
//         }
//     }
// }
const cards = ['😢','😢','😒','😒','😶‍🌫️','😶‍🌫️','😖','😖','😪','😪','😭','😭','😱','😱','🥶','🥶','😡','😡','🤢','🤢','🤠','🤠','🥸','🥸','🤡','🤡','🤫','🤫','🤓','🤓','😎','😎'];

// Fisher-Yates Shuffle Algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

var startTime, endTime, score, timerInterval;

//starts the game
function startGame() {
    startTime = new Date().getTime();
    score = null;
    updateTimer(); 
}

//This controls the timer
function stopGame() {
    endTime = new Date().getTime();
    const elapsedTime = (endTime - startTime) / 1000; 
    clearInterval(timerInterval); 
    updateScore(elapsedTime); 
}
//Updates the timer
function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedTime = (currentTime - startTime) / 1000;
        timerElement.textContent = elapsedTime.toFixed(2);
    }, 100); 
}

// updates the score with the time
function updateScore(elapsedTime) {
    const scoreElement = document.getElementById('score');

    score = Math.floor(10000 / elapsedTime); 
    scoreElement.textContent = score; 
}

//shuffles and tracks how many cards were flipped
var shuffleCards = shuffle(cards);
var openedCards = [];

//creates the cards
for (var i = 0; i < cards.length; i++) {
    var box = document.createElement('div');
    box.className = 'item';
    box.innerHTML = shuffleCards[i];
    document.querySelector('.game').append(box);
    //only lets 2 cards to be flipped
    box.onclick = function() {
        if (!this.classList.contains('boxOpen') && openedCards.length < 2) {
            this.classList.add('boxOpen');
            openedCards.push(this); 
            if (openedCards.length === 2) {
                const card1 = openedCards[0].innerHTML;
                const card2 = openedCards[1].innerHTML;
                if (card1 === card2) {
                    openedCards.forEach(card => card.classList.add('boxMatch'));
                    if (document.querySelectorAll('.boxMatch').length === cards.length) {
                        stopGame(); 
                        alert('You win! Score: ' + score);
                    }
                    openedCards = []; 
                } else {
                    
                    setTimeout(() => {
                        openedCards.forEach(card => {
                            card.classList.remove('boxOpen');
                        });
                        openedCards = []; 
                    }, 500);
                }
            }
        }
    }
}

startGame();
