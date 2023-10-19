//Sets rollCount to 0 rolls
let rollCount = 0; 

// Export function to house all dice behaviors
export function setupDice() {
    // Initilaize dice event listener
    let diceElements = document.querySelectorAll('.dice');

    diceElements.forEach(dice => {
        dice.addEventListener('click', toggleDiceHold);
    });

    // Initiates the roll dice and next round buttons event listener
    document.querySelector('#rollDice').addEventListener('click', rollAllDice);
    document.querySelector('#nextRound').addEventListener('click', resetForNextRound);
}

function rollAllDice() {
    // Increments rollCount when clicked
    rollCount++;

    // Disables the rollDice button so the roll count does not go past 3
    if (rollCount >= 3) {
        document.querySelector('#rollDice').disabled = true;
    }

    // Gets all the dice image elements from the DOM
    let diceImage = document.querySelectorAll('.dice');
    // An Array that stores the shuffle intervals for each die
    let diceShuffle = [];

    // Interates over each dice element
    diceImage.forEach((dice, index) => {
        // Checks if the hidden. If it is not hidden, the dice is considered 'held'
        let isHeld = !dice.previousElementSibling.classList.contains('hidden');

        // If the die is not 'held' the images shuffe to simulate rolling dice
        if (!isHeld) {
          diceShuffle[index] = setInterval(() => {
            // Generates a random number between 1-6 and matches the correct number with the
            // dice image. The shuffle occurs every 100 milliseconds
            let randomNum = (Math.floor(Math.random() * 6) + 1);
            dice.src = `/assets/images/dice_${randomNum}.png`
            }, 100);  
        }
    });

    // This function sets the shuffel timeout to 1 second and whatever random number it is on
    // will be the dice that is face up for the round. It will only apply to non-held die
    setTimeout(() => {
        diceImage.forEach((dice, index) => {
            let isHeld = !dice.previousElementSibling.classList.contains('hidden');

            if (!isHeld) {
                clearInterval(diceShuffle[index]);
                let finalNum = Math.floor(Math.random() * 6) + 1;
                dice.src = `/assets/images/dice_${finalNum}.png`
            }
        });
    }, 1000);
}

// Function  for toggling the hidden class for the dice elements
// Toggles the 'Hold" text for each die
function toggleDiceHold() {
    let span = this.previousElementSibling;  
    span.classList.toggle('hidden');
}

// Clear the held dice and reset the roll button for the next round
function resetForNextRound() {
    let resetHold = document.querySelectorAll('.hold');

    rollCount = 0;
    document.querySelector('#rollDice').disabled = false;

    resetHold.forEach(span => {
        span.classList.add('hidden');
    });
}
