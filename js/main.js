const hangmanImage = document.querySelector(".hangman-box img")
const keyboardDiv = document.querySelector('.keyboard')
const wordDisplay = document.querySelector('.word-display') 
const guessesText = document.querySelector('.guesses-text b')
const modal = document.querySelector('.modal')
const retryBtn = document.querySelector('.retry')

let currentWord, correctLetters = [], wrongGuessCount = 0;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = []
    wrongGuessCount = 0    
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
    guessesText.innerText =`${wrongGuessCount} / ${maxGuesses}`
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false)
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("")
    modal.classList.remove("show")
}

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]
    currentWord = word
    document.querySelector('.hint-text').innerText = hint
    resetGame()
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `Ты победил! Ответ: ` : `Верный ответ: `
        modal.querySelector('img').src = `images/${isVictory ? 'victory' : 'lost'}.gif`
        modal.querySelector('h4').innerText = `${isVictory ? 'Поздравляем!' : 'Игра окончена!'}`
        modal.querySelector('p').innerHTML = `${modalText} <b>${currentWord}</b>`
        modal.classList.add("show")
    }, 300);
}

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter)
                wordDisplay.querySelectorAll('li')[index].innerText = letter;
                wordDisplay.querySelectorAll('li')[index].classList.add('guessed')
            }
        })
    } else {
        wrongGuessCount++
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
    }
    button.disabled = true
    guessesText.innerText =`${wrongGuessCount} / ${maxGuesses}`

    if (wrongGuessCount === maxGuesses) return gameOver(false)
    if (correctLetters.length === currentWord.length) return gameOver(true)
}

for (let i = 1072; i < 1104; i++) {
    const button = document.createElement("button")
    button.innerText = String.fromCharCode(i)
    keyboardDiv.appendChild(button)
    button.addEventListener('click', e => initGame(e.target, String.fromCharCode(i)))
}

getRandomWord()

retryBtn.addEventListener("click", getRandomWord)