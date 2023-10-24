import * as diceModule from './scripts/modules/dice.js';
import * as scoreModule from './scripts/modules/scorecard.js'

function initializeGame() {
    diceModule.setupDice();
    scoreModule.scorecard();
}

document.querySelector('#newGame').addEventListener('click', () => {
    initializeGame();
});

window.onload = initializeGame;