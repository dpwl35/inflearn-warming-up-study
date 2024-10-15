'use client';
import React, { useState, useEffect } from 'react';
import { useQuestionHandler } from '../hooks/useQuestionHandler';
import { Question as QuestionComponent } from '../components/Questions'; // 재사용 가능한 Question 컴포넌트 사용

interface Question {
  id: number;
  question: string;
  choices: string[];
  answer: number; // 정답의 인덱스
}

export default function StatePage() {
  const [selectedSubject, setSelectedSubject] = useState<string>(''); // 선택된 과목 상태
  const [questions, setQuestions] = useState<Question[]>([]); // 문제 상태
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태 추가

  const {
    selectedAnswers,
    isButtonActive,
    resultClasses,
    questionAreaClasses,
    handleChange,
    checkAnswer,
    resetState, // 상태 초기화 함수 가져오기
  } = useQuestionHandler(questions); // 훅 사용

  // 과목 선택 시 JSON 파일에서 해당 과목 문제를 2개 랜덤으로 선택
  useEffect(() => {
    if (selectedSubject !== '') {
      setIsLoading(true); // 문제를 불러오는 동안 로딩 상태로 설정
      resetState(); // 과목이 바뀔 때 상태 초기화

      fetch(`/data/questions.json`)
        .then((res) => res.json())
        .then((data) => {
          if (selectedSubject === 'math') {
            const randomMathQuestions = getRandomQuestions(data.math, 2); // 수학 문제 2개 선택
            setQuestions(randomMathQuestions);
          } else if (selectedSubject === 'korean') {
            const randomKoreanQuestions = getRandomQuestions(data.korean, 2); // 국어 문제 2개 선택
            setQuestions(randomKoreanQuestions);
          }
          setIsLoading(false); // 문제를 불러온 후 로딩 상태 해제
        });
    }
  }, [selectedSubject]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(event.target.value);
  };

  return (
    <div className='state'>
      <select className='select' onChange={handleSelectChange}>
        <option value=''>과목을 선택하세요</option>
        <option value='math'>수학</option>
        <option value='korean'>국어</option>
      </select>

      {/* 로딩 중일 때 로딩 메시지 표시 */}
      {isLoading && <div>문제를 불러오는 중입니다...</div>}

      {/* 선택된 과목에 따라 문제 2개 표시 */}
      {!isLoading && questions.length > 0 && (
        <div className='question'>
          {questions.map((question, index) => (
            <QuestionComponent
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
      )}
    </div>
  );
}

// 문제를 랜덤으로 선택하는 함수
function getRandomQuestions(questions: Question[], n: number) {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}
