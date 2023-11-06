export function scorecard() {
    
}

document.addEventListener('DOMContentLoaded', scoreListeners);

const scoreCalculators = {
    // Check *Top Section Scores* in the README for greater details
    // the dice arrow function represents an array of integers representing the number value
    // and filters the specific numbers the uses the reduce method to create a new array and adds
    // the new array up for total dice total
    'ones': dice => dice.filter(val => val === 1).reduce((a, b) => a + b, 0),
    'twos': dice => dice.filter(val => val === 2).reduce((a, b) => a + b, 0),
    'threes': dice => dice.filter(val => val === 3).reduce((a, b) => a + b, 0),
    'fours': dice => dice.filter(val => val === 4).reduce((a, b) => a + b, 0),
    'fives': dice => dice.filter(val => val === 5).reduce((a, b) => a + b, 0),
    'sixes': dice => dice.filter(val => val === 6).reduce((a, b) => a + b, 0),
        //   **END TOP SECTION**

    // Check *Full House* in the README for greater details
    // The functioniterates through the dice to check dice values for a full house
    // condition. If the conditions are met, it will return a 25 point value; if not 
    // it will return 0
    'fullHouse': dice => {
        const counts = {};
        dice.forEach(val => counts[val] = (counts[val] || 0) + 1);
        const keys = Object.keys(counts);
        if (keys.length === 2 && (counts[keys[0]] === 2 || counts[keys[0]] === 3)) {
            return 25;
        }
        return 0;
    }, 

    // Check *Small Straight* in the README file for greater details
    // Sorts the dice and interates through the sorted dice checking for a sequence of four
    // then checks for the sequence of dice. if the sequence is present, it will return 30 points
    // and if not, returns 0 points
    'smallStraight': dice => {
        const sortStraightDice = Array.from(new Set(dice)).sort();
        for (let i = 0; i < sortStraightDice.length - 3; i++) {
            if (sortStraightDice.slice(i, 1 + 4).every((val, idx, arr) => idx === 0 || val === arr[idx - 1] + 1)) {
                return 30;
            }
        }
        return 0;
    },

    // The Large Straight is similar to the Small with the exception that it must have the values of all five
    // dice nstead of four
    'largeStraight': dice => {
        const sortDice = Array.from(new Set(dice)).sort((a, b) => a - b);
        if(sortDice.length === 5 &&
            sortDice[4] - sortDice[0] === 4 &&
            sortDice.every((val, idx, arr) => idx === 0 || val === arr[idx - 1] + 1)) {
                return 40;
            }
        return 0;
    },

    // 3 and 4 of a kind functions count the occurences of each die value and if any value
    // occurs 3 or 4 times, it will sum the total of all dice values
    'threeOfAKind': dice => {
        const count = {};
        dice.forEach(val => (count[val] = count[val] || 0) + 1);
        for (const counts of Object.values(count)) {
            if (counts >= 3) {
                return dice.reduce((a, b) => a + b, 0);
            }
        }
        return 0;
    },

    'fourOfAKind': dice => {
        const count = {};
        dice.forEach(val => (count[val] = count[val] || 0) + 1);
        for (const counts of Object.values(count)) {
            if (counts >= 4) {
                return dice.reduce((a, b) => a + b, 0);
            }
        }
        return 0;
    },

    // Sums all dice for the Chance block
    'chance': dice => {
        return dice.reduce((a, b) => a + b, 0);
    },

    // YAHTZEE checks if all dice are the same and then returns 50 points
    'yatzee': dice => {
        const allSameDice = dice.every(val => val === dice[0]);
        return allSameDice ? 50 : 0;
    },
};

// Detailed explanation can be found in the README under *Score Listener*
// The function is set up to initialize event listeners for displaying scores
function scoreListeners() {
    const scoreElements = document.querySelectorAll('.score');

    scoreElements.forEach(el => {
        el.addEventListener('click', function() {
            if (!this.classList.contains('score-set')) {
                const scoreType = this.getAttribute('id').replace('-score', '');
                calculateAndUpdateScore(scoreType, this);
            }
        });
    });
}

function calculateAndUpdateScore(scoreId) {
    let diceValues = Array.from(document.querySelectorAll('.dice')).map(dice => parseInt(dice.getAttribute('data-value')));
    let score = 0;
    
    if (scoreCalculators.hasOwnProperty(scoreId)) {
        score = scoreCalculators[scoreId](diceValues);
    }

    document.querySelector(`#${scoreId} .score-value`).innerText = score;
}
