import quizQuestions from './data.js';

const quizContainer = document.querySelector('.quiz');
const quizResult = document.querySelector('.quiz-result');
const quizMessage = document.querySelector('.quiz-message');
const quizExplanation = document.querySelector('.quiz-explanation');
const numberCurrent = document.querySelector('.number-current');
const nextButton = document.querySelector('.next');

let currentQuestionIndex = 0;
let selectAnswer = null;

// 퀴즈 렌더링 (문제 1개씩 출력)
function renderQuiz(index) {
  quizContainer.innerHTML = '';

  const quiz = quizQuestions[index];

  const quizArea = document.createElement('div');
  quizArea.classList.add('quiz-area', 'active');

  // 질문
  const question = document.createElement('div');
  question.classList.add('question');
  question.textContent = quiz.question;

  // 선택지
  const answerList = document.createElement('ul');
  answerList.classList.add('answer');

  quiz.options.forEach((option, optionIndex) => {
    const answerItem = document.createElement('li');
    answerItem.classList.add('answer-item');

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = option;

    answerItem.appendChild(button);
    answerList.appendChild(answerItem);
  });

  // quizArea에 질문과 선택지 추가
  quizArea.appendChild(question);
  quizArea.appendChild(answerList);
  quizContainer.appendChild(quizArea);

  // 이전 결과 숨기기
  quizResult.classList.remove('active');
  nextButton.classList.remove('active');

  numberCurrent.textContent = currentQuestionIndex + 1;
}

// 정답 선택
quizContainer.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const answerItem = event.target.parentElement;
    const allAnswerItems = Array.from(answerItem.parentElement.children);

    const index = allAnswerItems.indexOf(answerItem);
    allAnswerItems.forEach((item) => item.classList.remove('active'));
    answerItem.classList.add('active');

    selectAnswer = index;

    // 정답 여부 확인
    const correctAnswer = quizQuestions[currentQuestionIndex].answer;
    const explanation = quizQuestions[currentQuestionIndex].explanation;

    quizResult.classList.add('active');

    if (selectAnswer == correctAnswer) {
      quizMessage.textContent = '🎉 정답입니다. 🎉';
    } else {
      quizMessage.textContent = '❌ 오답입니다. ❌';
    }

    quizExplanation.textContent = explanation;

    // Next 버튼 활성화
    nextButton.classList.add('active');
  }
});

// Next 버튼 +  다음 문제로 이동
nextButton.addEventListener('click', () => {
  if (!nextButton.classList.contains('active')) {
    alert('정답을 선택해주세요.');
  } else {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      renderQuiz(currentQuestionIndex);
    } else {
      alert('퀴즈가 끝났습니다!');
    }
  }
});

renderQuiz(currentQuestionIndex);
