var Word = require("./word.js");
var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnopqrstuvwxyz";

var SpaceTerms = [
    "mercury",
    "gemini",
    "apollo",
    "saturn",
    "skylab",
    "iss",
    "sputnik",
    "kepler",
    "discovery",
    "pioneer",
    "luna",
    "titan",
    "vostok",
    "soyuz",
    "surveyor",
    "curiosity",
    "voyager",
    "mariner",
    "spirit",
    "opportunity",
    "viking",
    "juno",
    "stardust",
    "genesis",
    "columbia",
    "shenzon",
    "pioneer",
    "venus",
    "mars",
    "earth",
    "pluto",
    "neptune",
    "uranus",
    "saturn",
    "jupiter",
    "europa",
    "rhea",
    "callisto",
    "hyperion",
];

var randomIndex = Math.floor(Math.random() * SpaceTerms.length);
var randomWord = SpaceTerms[randomIndex];

// Pass random word through Word constructor
var computerWord = new Word(randomWord);

var requireNewWord = false;

// Array for guessed letters
var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 10;

function theLogic() {
    // Generates new word for Word constructor if true
    if (requireNewWord) {
        var randomIndex = Math.floor(Math.random() * spaceTerms.length);
        var randomWord = spaceTerms[randomIndex];

        computerWord = new Word(randomWord);

        requireNewWord = false;
    }

     // TestS if a letter guessed is correct
    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);

    if (wordComplete.includes(false)) {
        inquirer
        .prompt([
            {
                type: "Input",
                message: "Select letter from A to Z",
                name: "userinput"
            }
        ])
        .then(function(input) {
            if (
                !letterArray.includes(input.userinput) ||
                 input.userinput.length > 1
                 ) {
                console.log("\nTry again\n");
                theLogic();
        } else {
            if(
                incorrectLetters.includes(input.userinput) ||
                correctLetters.includes(input.userinput) ||
                input.userinput === ""
            ) {
                console.log("\nAlready guessed or entry blank");
                theLogic();
            } else {
                var wordCheckArray = [];

                computerWord.userGuess(input.userinput);
                // Checks if guess is correct
                computerWord.objArray.forEach(wordCheck);
                if(wordCheckArray.join("") === wordComplete.join("")) {
                    console.log("\nIncorrect\n");

                    incorrectLetters.push(input.userinput);
                    guessesLeft --;
                } else {
                    console.log("\nCorrect\n");
                    correctLetters.push(input.userinput);
                }
                computerWord.log();
                console.log("Guesses Left: " + guessesLeft + "\n");
                console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");
                if (guessesLeft > 0) {
                    theLogic();
                } else {
                    console.log("You have lost!\n");
                    restartGame();
                }
                function wordCheck(key) {
                    wordCheckArray.push(key.guessed);
                }
            }
        }
    });
} else {
        console.log("YOU WIN! \n");

        restartGame();
    }

    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }
}
function restartGame() {
    inquirer
    .prompt([
        {
            type: "list",
            message: "would you like to:",
            choices: ["Play Again", "Exit"],
            name: "restart"
        }
    ])
    .then(function(input) {
        if (input.restart === "Play Again") {
            requireNewWord= true;
            incorrectLetters = [];
            correctLetters = [];
            guessesLeft = 10;
            theLogic();
        } else {
            return;
        }
    });
}

theLogic();