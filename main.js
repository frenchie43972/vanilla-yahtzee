import * as diceModule from './scripts/modules/dice.js';

function initializeGame() {
    diceModule.setupDice();
}

document.querySelector('#newGame').addEventListener('click', () => {
    initializeGame();
});

window.onload = initializeGame;