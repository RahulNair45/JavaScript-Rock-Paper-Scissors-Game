const score = JSON.parse(localStorage.getItem('RockPaperScissorScore')) || {
    wins: 0,
    losses: 0,
    ties: 0
  }

  function resetScore(){
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    updateScore();
    document.querySelector('.js-result')
    .innerHTML = ``;
    document.querySelector('.js-moves')
    .innerHTML = ``;
  }

  function updateScore(){
document.querySelector('.js-score')
.innerHTML = `Wins = ${score.wins} Losses = ${score.losses} Ties = ${score.ties}`;
  }

  updateScore();

  function pickComputerMove(){
    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1/3){
      return 'rock';
    }
    else if (randomNumber >= 1/3 && randomNumber < 2/3){
      return 'paper';
    }
    else{
      return 'scissors';
    }
  }

  document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
  })

  document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
  })

  document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
  })

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r'){
      playGame('rock');
    }
    else if (event.key === 'p'){
      playGame('paper');
    }
    else if (event.key === 's'){
      playGame('scissors')
    }
  });

  function playGame(playerMove){
    const computerMove = pickComputerMove();

    let outcome;

    if (playerMove === 'rock'){
      if (computerMove === 'rock'){
        outcome = 'Tie';
      }
      else if (computerMove === 'paper'){
        outcome = 'You Lose'
      }
      else{
        outcome = 'You Win'
      }
    }
    else if (playerMove === 'paper'){
      if (computerMove === 'rock'){
        outcome = 'You Win';
      }
      else if (computerMove === 'paper'){
        outcome = 'Tie'
      }
      else{
        outcome = 'You Lose'
      }
    }
    else{
      if (computerMove === 'rock'){
        outcome = 'You Lose';
      }
      else if (computerMove === 'paper'){
        outcome = 'You Win'
      }
      else{
        outcome = 'Tie'
      }
    }

    if (outcome === 'You Win'){
      score.wins++;
    }
    else if (outcome === 'You Lose'){
      score.losses++;
    }
    else if (outcome === 'Tie'){
      score.ties++;
    }



    updateScore();

    document.querySelector('.js-result')
    .innerHTML = `${outcome}`;
    document.querySelector('.js-moves')
    .innerHTML = `Player: <img src="images/${playerMove}-emoji.png" class="chosen-icon"> | Computer: <img src="images/${computerMove}-emoji.png" class="chosen-icon">`//`Player: ${playerMove} | Computer: ${computerMove}`;

    localStorage.setItem('RockPaperScissorScore', JSON.stringify(score));

    
  }

  let isAutoPlaying = false;
  let intervalId;

  function autoplay() {
    if (!isAutoPlaying){
        intervalId = setInterval(() => {
        const randomPlayerMove = pickComputerMove();
        playGame(randomPlayerMove);
      }, 1500);
      isAutoPlaying = true;
    }
    else{
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
  }