var Word = require("./word.js");
var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnopqrstuvwxyz";

var spaceTerms = [
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

var randomIndex = Math.floor(Math.random() * spaceTerms.length);
var randomWord = spaceTerms[randomIndex];

var computerWord = new Word(randomWord);

var requireNewWord = false;
var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 10;

function theLogic() {
    if (requireNewWord) {
        var randomIndex = Math.floor(Math.random() * spaceTerms.length);
        var randomWord = spaceTerms[randomIndex];

        computerWord = new Word(randomWord);
        requireNewWord = false;
    }
    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);

    if (wordComplete.includes(false)) {
        inquirer
        .prompt([
            {
                type: "Input",
                message: "Select letter from A to Z",
                name: "userInput"
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
                incorrectLetters.includes(input.userInput) ||
                correctLetters.includes(input.userInput) ||
                input.userInput === ""
            ) {
                console.log("\nAlready guessed or entry blank");
                theLogic();
            } else {
                var wordCheckArray = [];
                computerWord.userGuess(input.userInput);
                computerWord.objArray.forEach(wordCheck);
                if(wordCheckArray.join("") === wordComplete.join("")) {
                    console.log("\nIncorrect\n");

                    incorrectLetters.push(input.userInput);
                    guessesLeft --;
                } else {
                    console.log("\nCorrect\n");
                    correctLetters.push(input.userInput);
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
    inquirer.prompt([
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