# Constructor Word Guess

### Overview

1. This is a game that's able to receive user input using the `inquirer`  npm packages.

2. The game requires three files:

* **Letter.js**: Contains a constructor, Letter. This constructor displays an underlying character or a blank placeholder, depending on whether or not the user has guessed the letter. That means the constructor  defines:

* A string value to store the underlying character for the letter

* A boolean value that stores whether that letter has been guessed yet

* A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore) if the letter has not been guessed

* A function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly

* **Word.js**: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor defines:

* An array of `new` Letter objects representing the letters of the underlying word

* A function that returns a string representing the word. This calls the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.

* A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)

* **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

* Randomly selects a word and uses the `Word` constructor to store it

* Prompts the user for each guess and keeps track of the user's remaining guesses

3. `Letter.js` *does not* `require` any other files.

4. `Word.js` *only* requires `Letter.js`


## Instructions

1. Locate game within the local directory and open 'index.js' with node in the Terminal command line.

2. After opening the user should be prompted to to guess a letter between A and Z. 

3. the game will proceed. Placing a letter on a blank line if correct or getting rid of one of the nine guesses the user has.

4. if the user guesses the word correctly it will display a message saying they win and then ask if they wouldd like to quit or play again.

5. if the user guesses the word incorrectly it will display a message saying they lost and then ask if they
would like to quit or play again.

