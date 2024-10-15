'use client';
import React, { useEffect, useState } from 'react';
import { useQuestionHandler } from '../hooks/useQuestionHandler';
import { Question } from '../components/Questions';

interface Question {
  id: number;
  question: string;
  choices: string[];
  answer: number; // 정답의 인덱스
}

export default function QuestionPage() {
  const [questions, setQuestions] = useState<Question[]>([]); // 문제 배열

  useEffect(() => {
    // JSON 파일에서 데이터 불러오기
    fetch('/data/questions.json')
      .then((res) => res.json())
      .then((data) => {
        // 수학 문제에서 랜덤으로 하나 선택
        const randomMath =
          data.math[Math.floor(Math.random() * data.math.length)];
        // 국어 문제에서 랜덤으로 하나 선택
        const randomKorean =
          data.korean[Math.floor(Math.random() * data.korean.length)];

        // 두 문제를 새로운 배열에 담기
        setQuestions([randomMath, randomKorean]);
      });
  }, []);

  const {
    selectedAnswers,
    isButtonActive,
    resultClasses,
    questionAreaClasses,
    handleChange,
    checkAnswer,
  } = useQuestionHandler(questions); // 훅 사용

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className='question'>
      {questions.map((question, index) => (
        <Question
          key={index}
          question={question.question}
          choices={question.choices}
          selectedAnswer={selectedAnswers[index]}
          resultClasses={resultClasses[index]}
          isButtonActive={isButtonActive[index]}
          questionAreaClass={questionAreaClasses[index]}
          onChange={(event) => handleChange(event, index)} // 선택 핸들러
          onCheckAnswer={() => checkAnswer(index)} // 정답 확인 핸들러
          questionIndex={index} // 각 문제에 고유한 인덱스 전달
        />
      ))}
    </div>
  );
}
