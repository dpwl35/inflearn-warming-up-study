# 02 가위 바위 보 앱

![](./02-rock-paper-scissors.gif)

### 개요

- 객체 및 DOM, Event 다루기 + 삼항 연산자 사용하기

### 필요한 기능

- 플레이어가 입력한 게임 횟수를 바탕으로 게임 시작하기
- 플레이어가 가위,바위,보 중 하나를 선택하면 컴퓨터가 랜덤으로 선택
- 최종 승리자 판별
- 게임이 끝난 후 다시 시작하기

### 구현

```javascript
let win = [0, 0]; //플레이어와 컴퓨터의 승리 횟수
let remainingGames = 0; //남은 게임
const options = ["✌", "✊", "✋"]; //컴퓨터가 무작위로 선택할 배열

//게임 초기화
const resetGame = () => {
  win = [0, 0];
  remainingGames = 0;
  playerMeWin.textContent = "0";
  playerComputerWin.textContent = "0";
  playerMeSelect.textContent = "?";
  playerComputerSelect.textContent = "?";
  gameCount.textContent = "0";
  gameResult.textContent = "-";
};
```

게임 상태 관리

```javascript
const handlePlayerChoice = (playerChoice) => {
  return function () {
    const computerChoice = options[Math.floor(Math.random() * options.length)];
    playerMeSelect.textContent = playerChoice;
    playerComputerSelect.textContent = computerChoice;

    determineWinner(playerChoice, computerChoice);

    remainingGames--;
    gameCount.textContent = remainingGames;

    if (remainingGames === 0) {
      endGame();
    }
  };
};
```

플레이어가 가위, 바위, 보 중 하나를 선택하면 `handlePlayerChoice()` 함수를 호출하고 컴퓨터도 랜덤한 값을 선택하게 된다.

```javascript
function determineWinner(player, computer) {
  gameResult.textContent =
    player === computer
      ? "무승부 입니다!"
      : (player === "✌" && computer === "✋") ||
        (player === "✊" && computer === "✌") ||
        (player === "✋" && computer === "✊")
      ? "플레이어가 이겼어요!"
      : "컴퓨터가 이겼어요!";

  gameResult.textContent.includes("플레이어")
    ? (win[0]++, (playerMeWin.textContent = win[0]))
    : gameResult.textContent.includes("컴퓨터") &&
      (win[1]++, (playerComputerWin.textContent = win[1]));
}
```

`determineWinner()` 함수에서는 플레이어와 컴퓨터의 선택값을 비교해 삼항연산자로 승패를 결정하고 승리한 쪽의 승리 횟수를 증가시키고 화면에 반영한다.

모든 게임이 끝나면 `endGame();` 함수를 호출해 최종 승리 횟수를 비교하고 결과를 팝업을 통해 알려준다. 다시하기 버튼을 누르면 `resetGame()` 함수를 호출해 게임을 초기화 시키고 다시 시작할 수 있다.

<hr>

10번은 많아보여서 플레이어가 직접 게임 횟수를 정하는 기능도 추가해봤다. 컴퓨터와 플레이어 게임 횟수를 단순히 [0, 0] 이렇게 배열로 지정했는데 명확한 변수명으로 구분하는 것이 가독성 면에서는 더 좋을 것 같다.
