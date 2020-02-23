const gameContent = document.getElementById('gameContent');
gameContent.textContent = '';

// let name = '';
// let activeView = 'welcome';

const allLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const pharses = ['test it like it is hot', 'super duper test'];

function randomPharse() {
    const pharseIndex = Math.floor(Math.random() * pharses.length);

    return pharses[pharseIndex];
}

const gameState = {
    name: '',
    activeView: 'welcome',
    selectedLetters: [],
    secretPharse: '',
}

function stateUpdate(newGameState) {
    Object.assign(gameState, newGameState);
    render();
}

function welcomeView() {
    const header = document.createElement('h1');
    header.textContent = 'Welcome to Hangman!';

    const nameInput = document.createElement('input');
    nameInput.addEventListener('input', event => {
        stateUpdate({name: event.target.value})
    });

    const nameInputLabel = document.createElement('div');
    nameInputLabel.textContent = 'Enter your name:';

    const playButton = document.createElement('button');
    playButton.textContent = 'Play game!';
    playButton.addEventListener('click', (event) => {
        stateUpdate({ activeView: 'play', secretPhrase: randomPharse(), selectedLetters: [] });
    });

    setTimeout(() => {
        nameInput.value = gameState.name;
        nameInput.focus();
    }, 0);

    gameContent.appendChild(header);
    gameContent.appendChild(nameInputLabel);
    gameContent.appendChild(nameInput);
    gameContent.appendChild(playButton);
}

function playView() {
    const header = document.createElement('h1');
    header.textContent = 'Hi, ' + gameState.name;

    const phraseLettersContainer = document.createElement('div');
    const phraseLetters = gameState.secretPhrase.split('');
    let pharseLettersVisibleCount = 0;

    console.log(phraseLetters)

    phraseLetters.forEach(phraseLetter => {
        const phraseLetterSpan = document.createElement('span');
        const phraseLetterVisible = phraseLetter === ' ' || gameState.selectedLetters.includes(phraseLetter);

        if(phraseLetterVisible){
            pharseLettersVisibleCount++;
        }

        phraseLetterSpan.textContent = phraseLetterVisible ? phraseLetter : '*';
        phraseLettersContainer.appendChild(phraseLetterSpan);
    });

    console.log(gameState.secretPharse)
    console.log(pharseLettersVisibleCount)
    console.log(gameState.secretPharse.length)

    if(pharseLettersVisibleCount === phraseLetters.length){
        stateUpdate({ activeView: 'endGame' });
        
        return;
        
    }

    const buttonsContainer = document.createElement('div');
    for(let i = 0; i < allLetters.length; i++) {
        const letterButton = document.createElement('button');
        const letter = allLetters[i];
        letterButton.textContent = letter;
        letterButton.disabled = gameState.selectedLetters.includes(letter);

        letterButton.addEventListener('click', () => {
            console.log(['selected letter: '], gameState.selectedLetters);
            stateUpdate({
                selectedLetters: gameState.selectedLetters.concat(letter),
            })
        })

        buttonsContainer.appendChild(letterButton);
    }

    // if (pharseLettersVisibleCount === state.secretPharse.length) {
    //     stateUpdate({ activeView: 'endGame', selectedLetters: [] });
    // }

    const endGameButton = document.createElement('button');
    endGameButton.textContent = 'End game!';
    endGameButton.addEventListener('click', (event) => {
        stateUpdate({ activeView: 'endGame' });
    });

    gameContent.appendChild(header);
    gameContent.appendChild(phraseLettersContainer);
    gameContent.appendChild(buttonsContainer);
    gameContent.appendChild(endGameButton);
}

function endGameView() {
    const header = document.createElement('h1');
    header.textContent = "Game finished!";

    const playAgain = document.createElement('button');
    playAgain.textContent = 'Play again!';
    playAgain.addEventListener('click', (event) => {
        stateUpdate({ activeView: 'welcome' });
    });

    gameContent.appendChild(header);
    gameContent.appendChild(playAgain);
}

function render() {
    gameContent.textContent = '';

    if (gameState.activeView === 'welcome') {
        welcomeView();
    } else if (gameState.activeView === 'play') {
        playView();
    } else {
        endGameView();
    }
}

render();