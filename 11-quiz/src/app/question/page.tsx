'use client';
import React, { useEffect, useState, ChangeEvent } from 'react';

interface Question {
  id: number;
  question: string;
  choices: string[];
  answer: number;
}

export default function QuestionPage() {
  const [mathQuestion, setMathQuestion] = useState<Question | null>(null);
  const [koreanQuestion, setKoreanQuestion] = useState<Question | null>(null);
  const [selectedMath, setSelectedMath] = useState<string>(''); // 수학 선택 상태
  const [selectedKorean, setSelectedKorean] = useState<string>(''); // 국어 선택 상태

  const [isMathButtonActive, setIsMathButtonActive] = useState<boolean>(false); // 수학 버튼 활성화 상태
  const [isKoreanButtonActive, setIsKoreanButtonActive] =
    useState<boolean>(false); // 국어 버튼 활성화 상태

  useEffect(() => {
    // JSON 파일에서 데이터 불러오기
    fetch('/data/questions.json')
      .then((res) => res.json())
      .then((data) => {
        const randomMath =
          data.math[Math.floor(Math.random() * data.math.length)];
        const randomKorean =
          data.korean[Math.floor(Math.random() * data.korean.length)];

        setMathQuestion(randomMath);
        setKoreanQuestion(randomKorean);
      });
  }, []);

  // 수학 문제 라디오 버튼 선택 핸들러
  const handleMathChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedMath(event.target.value);
    setIsMathButtonActive(true); // 수학 문제 선택 시 수학 버튼 활성화
  };

  // 국어 문제 라디오 버튼 선택 핸들러
  const handleKoreanChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedKorean(event.target.value);
    setIsKoreanButtonActive(true); // 국어 문제 선택 시 국어 버튼 활성화
  };

  if (!mathQuestion || !koreanQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className='question'>
      <div className='question-area'>
        <p>{mathQuestion.question}</p>
        <ul className='question-item'>
          {mathQuestion.choices.map((choice, index) => (
            <li key={index}>
              <input
                type='radio'
                id={`math-choice-${index}`}
                name='math'
                value={choice}
                checked={selectedMath === choice}
                onChange={handleMathChange}
              />
              <label htmlFor={`math-choice-${index}`}>{choice}</label>
            </li>
          ))}
        </ul>
        <button
          className={`result ${isMathButtonActive ? 'active' : ''}`}
          type='button'
        >
          답변을 확인하세요.
        </button>
      </div>

      <div className='question-area'>
        <p>{koreanQuestion.question}</p>
        <ul className='question-item'>
          {koreanQuestion.choices.map((choice, index) => (
            <li key={index}>
              <input
                type='radio'
                id={`korean-choice-${index}`}
                name='korean'
                value={choice}
                checked={selectedKorean === choice}
                onChange={handleKoreanChange}
              />
              <label htmlFor={`korean-choice-${index}`}>{choice}</label>
            </li>
          ))}
        </ul>
        <button
          className={`result ${isKoreanButtonActive ? 'active' : ''}`}
          type='button'
        >
          답변을 확인하세요.
        </button>
      </div>
    </div>
  );
}
