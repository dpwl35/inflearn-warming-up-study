const TYPINGS = [
  'he realized what was happening and told the others.',
  'And in the end it turned out that the creature was her grandfather',
];

const INITIAL_ERRORS = 0;
const INITIAL_TIME = 20;
const INITIAL_ACCURACY = 100;

const errorsElement = document.querySelector('.result .errors');
const timeElement = document.querySelector('.result .time');
const accuracyElement = document.querySelector('.result .accuracy');

const printText = document.querySelector('.print-text');
const typingInput = document.querySelector('.typing');
const startButton = document.querySelector('.start');

const resultPopup = document.querySelector('.popup');
const retryButton = document.querySelector('.retry');

const wpmPopupElement = document.querySelector('.popup .wpm');
const cpmPopupElement = document.querySelector('.popup .cpm');
const errorsPopupElement = document.querySelector('.popup .errors');
const timePopupElement = document.querySelector('.popup .time');
const accuracyPopupElement = document.querySelector('.popup .accuracy');

// 타이핑
let currentTypingText = []; // 현재 타이핑
let userInputArray = []; // 유저 타이핑
let currentSentenceIndex = 0; // 현재 타이핑해야 하는 문장의 인덱스
let totalCharacters = 0; // 전체 문자 수
let totalTypedCharacters = 0; // 입력된 문자 수

// 측정
let currentWpm = 0;
let currentCpm = 0;
let timerInterval;
let currentTime = INITIAL_TIME; // 실시간 줄어드는 시간
let currentAccuracy = INITIAL_ACCURACY; // 정확도 계산

let totalErrors = 0; // 전체 문장의 누적 오류 수
let currentSentenceErrors = 0; // 현재 문장의 오류 수

// 타이핑할 모든 문장의 총 문자
function calculateTotalCharacters() {
  totalCharacters = TYPINGS.reduce(
    (accumulator, _sentence) => accumulator + _sentence.length,
    0
  );
}

// 문장을 <span>으로 분리
function renderTextWithSpans(_text) {
  printText.innerHTML = '';
  currentTypingText = _text.split('');

  currentTypingText.forEach((letter) => {
    const span = document.createElement('span');
    // 공백 문자 처리
    if (letter === ' ') {
      span.innerHTML = '&nbsp;';
    } else {
      span.textContent = letter;
    }
    printText.appendChild(span);
  });
}

// 다음 문장으로 넘어가는 함수
function loadNextSentence() {
  // 현재 문장의 오류를 전체 오류에 누적
  totalErrors += currentSentenceErrors;
  // 새로운 문장 현재 문장 오류 초기화
  currentSentenceErrors = 0;

  currentSentenceIndex++;

  const nextSentence = TYPINGS[currentSentenceIndex];

  renderTextWithSpans(nextSentence);

  typingInput.value = '';
  userInputArray = [];
  typingInput.setAttribute('maxlength', currentTypingText.length);
}

// 정확도 계산
function calculateAccuracy(_totalErrorCount) {
  const correctCharacters = totalCharacters - _totalErrorCount;
  const accuracy = (correctCharacters / totalCharacters) * 100;

  accuracyElement.textContent = Math.floor(accuracy);
}

// 오류 수 계산
function calculateErrors() {
  // 현재 문장의 오류 수
  currentSentenceErrors = 0;

  // 현재 문장에서의 오류 수를 계산
  for (let i = 0; i < currentTypingText.length; i++) {
    if (
      userInputArray[i] !== currentTypingText[i] &&
      userInputArray[i] !== undefined
    ) {
      currentSentenceErrors++;
    }
  }

  // 전체 오류 수 업데이트 (이전 오류 수에 현재 문장 오류 추가)
  const totalErrorCount = totalErrors + currentSentenceErrors;
  errorsElement.textContent = totalErrorCount;

  // 정확도 계산
  calculateAccuracy(totalErrorCount);
}

// 타이핑을 실시간 비교
typingInput.addEventListener('input', () => {
  const spans = printText.querySelectorAll('span');
  const userInput = typingInput.value; // 사용자가 입력한 값

  userInputArray = userInput.split('');
  totalTypedCharacters = userInput.length; // 입력된 문자 수

  // 두 배열을 비교하여 클래스 추가
  for (let i = 0; i < currentTypingText.length; i++) {
    if (userInputArray[i] === currentTypingText[i]) {
      // 맞으면 'complete' 클래스 추가
      spans[i].classList.add('complete');
      spans[i].classList.remove('error');
    } else if (userInputArray[i] !== undefined) {
      // 'error' 클래스 추가
      spans[i]?.classList.remove('complete');
      spans[i].classList.add('error');
    } else {
      // 입력이 지워진 경우
      spans[i]?.classList.remove('complete');
      spans[i]?.classList.remove('error');
    }
  }

  // 오류 계산
  calculateErrors();
});

// WPM과 CPM 계산
function calculateWpmCpm() {
  const elapsedTime = INITIAL_TIME - currentTime;

  if (elapsedTime > 0) {
    //입력된 문자 수 ÷ (경과 시간 ÷ 60)
    currentCpm = Math.round((totalTypedCharacters / elapsedTime) * 60);
    //(입력된 문자 수 ÷ 5) ÷ (경과 시간 ÷ 60)
    currentWpm = Math.round(totalTypedCharacters / 5 / (elapsedTime / 60));

    wpmPopupElement.textContent = currentWpm;
    cpmPopupElement.textContent = currentCpm;
  }
}

// 결과
function showTypingResult() {
  accuracyPopupElement.textContent = accuracyElement.textContent;
  errorsPopupElement.textContent = errorsElement.textContent;
  timePopupElement.textContent = timeElement.textContent;

  // 결과 팝업 표시
  resultPopup.classList.add('active');

  calculateWpmCpm();
}

// 엔터를 눌렀을 때 다음 문장 로드
typingInput.addEventListener('keydown', (_event) => {
  if (_event.key === 'Enter') {
    // 기본 엔터 입력 방지
    _event.preventDefault();
    if (userInputArray.length === currentTypingText.length) {
      if (currentSentenceIndex < TYPINGS.length - 1) {
        // 엔터를 눌렀을 때 다음 문장 로드
        loadNextSentence();
      } else {
        // 마지막 문장일 때 결과 팝업 표시
        showTypingResult();
      }
    }
  }
});

// 초기화
function initializeTypingTest() {
  calculateTotalCharacters();

  const firstSentence = TYPINGS[0];
  renderTextWithSpans(firstSentence);

  typingInput.setAttribute('maxlength', currentTypingText.length);

  errorsElement.textContent = INITIAL_ERRORS;
  timeElement.textContent = INITIAL_TIME;
  accuracyElement.textContent = INITIAL_ACCURACY;

  typingInput.value = '';
}

initializeTypingTest();

// 타이머
function startTimer() {
  timerInterval = setInterval(() => {
    if (currentTime > 0) {
      currentTime--;
      timeElement.textContent = currentTime;
    } else {
      clearInterval(timerInterval);
      typingInput.disabled = true;
      showTypingResult();
    }
  }, 1000);
}

// 시작
startButton.addEventListener('click', () => {
  typingInput.disabled = false;
  typingInput.focus();

  startTimer();
});

// 다시 시작
retryButton.addEventListener('click', () => {
  resultPopup.classList.remove('active');
  initializeTypingTest();
});
