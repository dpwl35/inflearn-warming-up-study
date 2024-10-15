'use client';
import React, { useState, useEffect } from 'react';

interface Question {
  id: number;
  question: string;
  choices: string[];
  answer: number; // 정답의 인덱스
}

export default function QuizPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>(''); // 선택한 과목 상태
  const [questions, setQuestions] = useState<Question[]>([]); // 가져온 문제 상태
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); // 현재 문제 인덱스
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // 선택한 답
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0); // 맞은 답 개수
  const [showQuiz, setShowQuiz] = useState<boolean>(false); // 퀴즈 시작 여부
  const [showResult, setShowResult] = useState<boolean>(false); // 결과 화면 표시 여부

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(event.target.value);
  };

  const startQuiz = () => {
    if (questions.length > 0) {
      setShowQuiz(true); // 문제를 가져온 후 퀴즈 시작
      setCurrentQuestionIndex(0); // 첫 번째 문제부터 시작
      setCorrectAnswersCount(0); // 맞힌 답 초기화
      setShowResult(false); // 결과 화면 숨기기
    }
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(Number(event.target.value)); // 선택한 답 저장
  };

  const handleNextQuestion = () => {
    if (
      selectedAnswer !== null &&
      selectedAnswer === questions[currentQuestionIndex].answer
    ) {
      setCorrectAnswersCount((prevCount) => prevCount + 1); // 맞힌 답 개수 증가
    }
    setSelectedAnswer(null); // 선택한 답 초기화

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // 다음 문제로 이동
    } else {
      setShowResult(true); // 마지막 문제 후 결과 화면 표시
      setShowQuiz(false); // 퀴즈 숨기기
    }
  };

  const restartQuiz = () => {
    setSelectedSubject(''); // 과목 선택 초기화
    setQuestions([]); // 문제 초기화
    setCurrentQuestionIndex(0); // 첫 번째 문제로 초기화
    setCorrectAnswersCount(0); // 맞힌 답 초기화
    setShowQuiz(false); // 퀴즈 숨기기
    setShowResult(false); // 결과 화면 숨기기
  };

  useEffect(() => {
    // 과목이 선택되면 해당 과목의 데이터를 가져옴
    if (selectedSubject !== '') {
      fetch(`/data/questions.json`)
        .then((res) => res.json())
        .then((data) => {
          if (selectedSubject === 'math') {
            setQuestions(data.math); // 수학 문제 가져오기
          } else if (selectedSubject === 'korean') {
            setQuestions(data.korean); // 국어 문제 가져오기
          }
        })
        .catch((error) => {
          console.error('문제 데이터를 가져오는 중 오류 발생:', error);
        });
    }
  }, [selectedSubject]);

  return (
    <div className='test'>
      <p>시험</p>
      <div className='test-area'>
        {!showQuiz && !showResult && (
          <div className='main'>
            <select onChange={handleSelectChange}>
              <option value=''>시험문제를 선택하세요.</option>
              <option value='math'>수학</option>
              <option value='korean'>국어</option>
            </select>
            <button type='button' onClick={startQuiz}>
              연습 테스트 시작
            </button>
          </div>
        )}

        {/* 퀴즈 시작 후 문제 출력 */}
        {showQuiz && questions.length > 0 && (
          <div>
            <div className='test-question'>
              <div className='test-question-area'>
                <p>{questions[currentQuestionIndex].question}</p>
                <ul>
                  {questions[currentQuestionIndex].choices.map(
                    (choice, index) => (
                      <li key={index}>
                        <input
                          type='radio'
                          name='choice'
                          id={`choice-${index}`}
                          value={index}
                          onChange={handleAnswerChange}
                          checked={selectedAnswer === index}
                        />
                        <label htmlFor={`choice-${index}`}>{choice}</label>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <button type='button' className='next' onClick={handleNextQuestion}>
              {currentQuestionIndex < questions.length - 1
                ? '다음'
                : '결과 보기'}
            </button>
            <div className='test-question-count'>
              문제 {currentQuestionIndex + 1} / {questions.length}
            </div>
          </div>
        )}

        {/* 결과 화면 */}
        {showResult && (
          <div className='test-result'>
            <p>결과</p>
            <p>
              {questions.length}점 중 {correctAnswersCount} 점을 획득했습니다.
            </p>
            <p>
              {correctAnswersCount >= Math.ceil(questions.length * 0.6)
                ? '시험에 합격했습니다!'
                : '시험에 합격하지 못했습니다.'}
            </p>
            <button type='button' className='restart' onClick={restartQuiz}>
              새로운 연습 테스트를 시작하세요
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
