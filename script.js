'use strict';

//shortcuts
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentEl0 = document.querySelector('#current--0');
const currentEl1 = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let playing = true;
let scores = [0, 0];
//set the score to zero
score0El.textContent = 0;
score1El.textContent = 0;
let activePlayer = 0;
let currentScore = 0;
//the dice image is hidden at the beggining
diceEl.classList.add('hidden');

//switching player
const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
};

btnHold.addEventListener('click', function() {
    if (playing) {
        if (activePlayer === 0) {
            scores[0] += currentScore;
            score0El.textContent = scores[0];
            if (scores[activePlayer] >= 100) {
                playing = false;
                document
                    .querySelector(`.player--${activePlayer}`)
                    .classList.add('player--winner');
            }
            switchPlayer();
        } else {
            scores[1] += currentScore;
            score1El.textContent = scores[1];
            if (scores[activePlayer] >= 100) {
                playing = false;
                document
                    .querySelector(`.player--${activePlayer}`)
                    .classList.add('player--winner');
            }
            switchPlayer();
        }
    }
});

//funcation rolling the dice by click
btnRoll.addEventListener('click', function() {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', function() {
    score0El.textContent = 0;
    score1El.textContent = 0;
    currentEl0.textContent = 0;
    currentEl1.textContent = 0;
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
    diceEl.classList.add('hidden');
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    activePlayer = 0;
    playing = true;
});