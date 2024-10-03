const startSection = document.querySelector('.popup-area.start');
const restartSection = document.querySelector('.popup-area.restart');
const startButton = document.querySelector('.popup-area.start .start');
const gameCount = document.querySelector('.count span');
const gameCountInput = document.querySelector('.count-val');
const popup = document.querySelector('.popup');

const selectItems = document.querySelectorAll('.select-item');
const playerMeSelect = document.querySelector('.player-me .select');
const playerComputerSelect = document.querySelector('.player-computer .select');

const gameResult = document.querySelector('.result span');
const playerMeWin = document.querySelector('.player-me .win');
const playerComputerWin = document.querySelector('.player-computer .win');
const winnerText = document.querySelector('.popup-area.restart .win');
const restartButton = document.querySelector('.popup-area.restart .restart');

let win = [0, 0];
let remainingGames = 0;
const options = ['✌', '✊', '✋'];

// 게임 초기화 함수
function resetGame() {
  win = [0, 0];
  remainingGames = 0;
  playerMeWin.textContent = '0';
  playerComputerWin.textContent = '0';
  playerMeSelect.textContent = '?';
  playerComputerSelect.textContent = '?';
  gameCount.textContent = '0';
  gameResult.textContent = '-';
}

// 게임 시작 함수
function startGame() {
  const inputVal = parseInt(gameCountInput.value, 10);
  if (isNaN(inputVal) || inputVal <= 0) {
    alert('유효한 게임 횟수를 입력해주세요.');
    return;
  }
  remainingGames = inputVal;
  gameCount.textContent = remainingGames;
  popup.style.display = 'none';
}

// 승자
function determineWinner(player, computer) {
  if (player === computer) {
    gameResult.textContent = '무승부 입니다!';
  } else if (
    (player === '✌' && computer === '✋') ||
    (player === '✊' && computer === '✌') ||
    (player === '✋' && computer === '✊')
  ) {
    gameResult.textContent = '플레이어가 이겼어요!';
    win[0]++;
    playerMeWin.textContent = win[0];
  } else {
    gameResult.textContent = '컴퓨터가 이겼어요!';
    win[1]++;
    playerComputerWin.textContent = win[1];
  }
}

// 게임이 끝났을 때 처리
function endGame() {
  popup.style.display = 'block'; // 팝업을 다시 표시
  startSection.style.display = 'none'; // 게임 시작 팝업 숨기기
  restartSection.style.display = 'flex'; // 다시하기 팝업 표시

  if (win[0] > win[1]) {
    winnerText.textContent = '플레이어가 이겼어요!';
  } else if (win[0] < win[1]) {
    winnerText.textContent = '컴퓨터가 이겼어요!';
  } else {
    winnerText.textContent = '무승부 입니다!';
  }
}

// 플레이어가 선택했을 때 처리
function handlePlayerChoice(playerChoice) {
  const computerChoice = options[Math.floor(Math.random() * options.length)];
  playerMeSelect.textContent = playerChoice;
  playerComputerSelect.textContent = computerChoice;
  determineWinner(playerChoice, computerChoice);

  remainingGames--;
  gameCount.textContent = remainingGames;

  if (remainingGames === 0) {
    endGame();
  }
}

// 이벤트 리스너 설정
startButton.addEventListener('click', () => {
  startGame();
});

selectItems.forEach((item) => {
  item.addEventListener('click', () => {
    if (remainingGames > 0) {
      const playerChoice = item.getAttribute('data-value');
      handlePlayerChoice(playerChoice);
    }
  });
});

restartButton.addEventListener('click', () => {
  resetGame();
  popup.style.display = 'block';
  startSection.style.display = 'flex';
  restartSection.style.display = 'none';
});
