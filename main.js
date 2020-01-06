const choices = document.querySelectorAll('.choice'),
      score = document.getElementById('score'),
      result = document.getElementById('result'),
      restart = document.getElementById('restart'),
      modal = document.querySelector('.modal'),
      scoreboard = {
        player: 0,
        computer: 0,
      };

/* ----------------------------- playing a game ----------------------------- */
function play(e) {
  restart.style.display = 'inline-block';
  const playerChoice = e.target.id,
        computerChoice = getComputerChoice(),
        winner = getWinner(playerChoice, computerChoice); 
        showWinner(winner, computerChoice); 
}

function getComputerChoice() {
  const rand = Math.random();
  if (rand < 0.34) {
    return 'rock';
  } 
  if (rand <= 0.67) {
    return 'paper';
  } else {
    return 'scissors';
  }
}

/* ---------------------------- finds the winner ---------------------------- */
function getWinner(p, c) {
  if (p === c) {
    return 'draw';
  } else if (p === 'rock') {
    if (c === 'paper') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'paper') {
    if (c === 'scissors') {
      return 'computer';
    } else {
      return 'player';
    }
  } else {
    if (c === 'rock') {
      return 'computer';
    } else {
      return 'player';
    }
  }
}

/* ---------------------- shows the winner in the modal --------------------- */
function showWinner(winner, computerChoice) {
  if (winner === 'player') {
    scoreboard.player++;
    result.innerHTML = `
      <h1 class="text-win">You Win</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice[0].toUpperCase() + computerChoice.slice(1)}</strong></p>
    `;
  } else if (winner === 'computer') {
    scoreboard.computer++;
    result.innerHTML = `
      <h1 class="text-lose">You Lose</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice[0].toUpperCase() + computerChoice.slice(1)}</strong></p>
    `;
  } else {
    result.innerHTML = `
      <h1>It's a Draw</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice[0].toUpperCase() + computerChoice.slice(1)}</strong></p>
    `;
  }

/* ------------------------ updating the score object ----------------------- */
  score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>
  `;

/* -------------------- showing the modal with the winner ------------------- */
  modal.style.display = 'block';
}

/* -------------------------- restartGame function -------------------------- */
function restartGame() {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
  `;
}

/* ------------------------------- clear modal ------------------------------ */
function clearModal(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

/* --------------------- check for the icon click event --------------------- */
choices.forEach(choice => choice.addEventListener('click', play));

/* ------- modal event to close it if you press outside it ------ */
modal.addEventListener('click', clearModal);

/* --- calling the restartGame function when the restart button is pressed -- */
restart.addEventListener('click', restartGame);