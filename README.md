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