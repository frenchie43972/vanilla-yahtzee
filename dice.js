document.querySelector('.rollDice').addEventListener('click', function() {
    let diceImage = document.querySelectorAll('.dice');
    let diceShuffle = [];

    diceImage.forEach((dice, index) => {
        diceShuffle[index] = setInterval(() => {
            let randomNum = (Math.floor(Math.random() * 6) + 1);
            dice.src = `./images/dice_${randomNum}.png`
        }, 100);
    });    

    setTimeout(() => {
        diceImage.forEach((dice, index) => {
            clearInterval(diceShuffle[index]);
            let finalNum = Math.floor(Math.random() * 6) + 1;
            dice.src = `./images/dice_${finalNum}.png`
        });
    }, 1000);
});

let diceElements = document.querySelectorAll('.dice');

diceElements.forEach(dice => {
    dice.addEventListener('click', function() {
        let span = dice.previousElementSibling;  
        span.classList.toggle('hidden');    
    });
});