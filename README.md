# vanilla-yahtzee
Vanilla JavaScript Yahtzee Game

File stucture so far:

vanilla-yahtzee
	- assets
		-css
			styles.css
		- images
			dice_1.png
			dice_2.png
			dice_3.png
			dice_4.png
			dice_5.png
			dice_6.png
	- dist
		output.css
	- node_modules
	- scripts
		- modules
			dice.js
			scorecard.js
	.gitignore
	index.html
	main.js
	package-lock.json
	package.json
	postcss.config.js
	README.md
	tailwind.config.js

		*Top Section Scores*
I use twos as an example for this. It applies for to all the numbers
'twos': represents the property key for the function that calculates
the score for all twos rolled.

dice => is an arrow function that takes dice as its parameter. The dice parameter is 
expected to be an array of integers representing the face-up value of each die

dice.filter(val => val === 2) -  uses the filter method on the array. It creates a new
array containing only the elements that equal 2. So if your dice array was [2, 3, 4, 2, 5], 
this new array would be [2, 2].

.reduce((a, b) => a + b, 0) - The reduce method takes a function and an initial value as arguments 
so the  function ((a, b) => a + b) is applied to each element of the array. a is the accumulator 
(starts at 0), and b is the current value in the array. This function adds up all the elements in 
the array. So, for [2, 2], it would be 2 + 2 = 4

		*End To Section Scores*

		*Full House*
const counts = {} - initializes an empty object to hold the count frequnecy of the dice

dice.forEach(val => counts[val] = (counts[val] || 0) + 1) - This will keep iterating through
the dice array and update the frequency count

const keys = Object.keys(counts) - Creates an array of individual die values

if (keys.length === 2 && (counts[keys[0]] === 2 || counts[keys[0]] === 3)) - Keeps checking for
the full house conditon and will return 25 points if true and 0 if false

		*End Full House*

		*Small Straight*
const sortStraightDice = Array.from(new Set(dice)).sort() - I discovered what a Set() is in JS. It is used
to work with a collection of values to ensure uniqueness by removing any duplicates from the array. So here
dice is converted to a Set in order to store the dice values for a straight

for (let i = 0; i < sortStraightDice.length - 3; i++) - loops through the array checking for the a sequence of four

if (sortStraightDice.slice(i, i + 4).every((val, idx, arr) => idx === 0 || val === arr[idx - 1] + 1)) - Inside the
loop the if statement uses .slice to extract four dice from the sorted array if true. The .every() method checks if the 
next element in the array is exactly one greater than the previous element (val === arr[idx - 1] + 1). When tue, returns
30 points else 0
		*End Small Straight*

		*Score Listener*
scoreElements.forEach(el => { ... }) - This will iterate over each element (el) we will do something with

el.addEventListener('click', function() { ... }) - The start of the event listener

if (!this.classList.contains('score-set')) { - The statement inside the event listener uses 'this' referring to the
element clicked. It will check if the element has the class 'score-set', if not the user can set the score. This prevents double scoring the same value.

const scoreType = this.getAttribute('id').replace('-score', '') - This variable will get the is of a clicked element
and removes the -score part (i.e., ones-score becomes one) and determines what score category the user selects

calculateAndUpdateScore(scoreType, this) - Then we call the calcualte score function to update the text content with 
the score