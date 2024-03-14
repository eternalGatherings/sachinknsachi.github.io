score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

document.getElementById('js-results').innerHTML = '';
document.getElementById('js-scores').innerHTML = `Win: ${score.wins}, Lose: ${score.losses}, Tie: ${score.ties}`;
document.getElementById('js-moves').innerHTML = '';

function resetGame() {
    localStorage.setItem('score', null);
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };
    document.getElementById('js-results').innerHTML = '';
    document.getElementById('js-scores').innerHTML = `Win: ${score.wins}, Lose: ${score.losses}, Tie: ${score.ties}`;
    document.getElementById('js-moves').innerHTML = '';
}

function selectChoice(selectedChoice) {
    let result;
    let computerChoice;
    let randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerChoice = 'rock';
    }
    else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerChoice = 'paper';
    }
    else {
        computerChoice = 'scissors';
    }

    if (selectedChoice === 'rock') {
        if (computerChoice === 'rock') {
            result = 'Tie';
            score.ties++;
        }
        else if (computerChoice === 'paper') {
            result = 'You lose';
            score.losses++;
        }
        else if (computerChoice === 'scissors') {
            result = 'You won';
            score.wins++;
        }
    } else if (selectedChoice === 'paper') {
        if (computerChoice === 'rock') {
            result = 'You won';
            score.wins++;
        }
        else if (computerChoice === 'paper') {
            result = 'Tie';
            score.ties++;
        }
        else if (computerChoice === 'scissors') {
            result = 'You lose';
            score.losses++;
        }
    } else if (selectedChoice === 'scissors') {
        if (computerChoice === 'rock') {
            result = 'You lose';
            score.losses++;
        }
        else if (computerChoice === 'paper') {
            result = 'You won';
            score.wins++;
        }
        else if (computerChoice === 'scissors') {
            result = 'Tie';
            score.ties++;
        }
    }

    document.getElementById('js-results').innerHTML = result;
    document.getElementById('js-moves').innerHTML = 
        `You
            <img src="images/${selectedChoice}-emoji.png" class="move-icon">
            <img src="images/${computerChoice}-emoji.png" class="move-icon">
        Computer`;
    document.getElementById('js-scores').innerHTML = `Win: ${score.wins}, Lose: ${score.losses}, Tie: ${score.ties}`;

    localStorage.setItem('score', JSON.stringify(score));
}