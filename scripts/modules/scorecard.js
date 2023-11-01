export function scorecard() {
    
}

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
    // 
    'fullHouse': dice => {
        const counts = {};
        dice.forEach(val => counts[val] = (counts[val] || 0) + 1);
        const keys = Object.keys(counts);
        if (keys.length === 2 && (counts[keys[0]] === 2 || counts[keys[0]] === 3)) {
            return 25;
        }
        return 0;
    }, 
};

function calculateAndUpdateScore(scoreId) {
    let diceValues = Array.from(document.querySelectorAll('.dice')).map(dice => parseInt(dice.getAttribute('data-value')));
    let score = 0;
    
    if (scoreCalculators.hasOwnProperty(scoreId)) {
        score = scoreCalculators[scoreId](diceValues);
    }

    document.querySelector(`#${scoreId} .score-value`).innerText = score;
}
