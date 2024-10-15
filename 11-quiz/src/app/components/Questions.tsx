import React, { ChangeEvent } from 'react';

interface QuestionProps {
  question: string;
  choices: string[];
  selectedAnswer: string;
  resultClasses: string[];
  isButtonActive: boolean;
  questionAreaClass: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCheckAnswer: () => void;
  questionIndex: number; // 문제별 인덱스 추가
}

export const Question: React.FC<QuestionProps> = ({
  question,
  choices,
  selectedAnswer,
  resultClasses,
  isButtonActive,
  questionAreaClass,
  onChange,
  onCheckAnswer,
  questionIndex, // 인덱스 추가
}) => {
  return (
    <div className={`question-area ${questionAreaClass}`}>
      <p>{question}</p>
      <ul className='question-item'>
        {choices.map((choice, choiceIndex) => (
          <li key={choiceIndex}>
            <span
              className={`icon ${
                resultClasses && resultClasses[choiceIndex]
                  ? resultClasses[choiceIndex]
                  : ''
              }`}
            ></span>
            <input
              type='radio'
              id={`choice-${questionIndex}-${choiceIndex}`} // 고유한 id 설정
              name={`question-${questionIndex}`} // 고유한 name 설정
              value={choice}
              checked={selectedAnswer === choice}
              onChange={onChange} // 선택 핸들러 호출
            />
            <label htmlFor={`choice-${questionIndex}-${choiceIndex}`}>
              {choice}
            </label>
          </li>
        ))}
      </ul>
      <button
        className={`result ${isButtonActive ? 'active' : ''}`}
        type='button'
        onClick={onCheckAnswer} // 각 문제에 대한 정답 확인 함수 호출
      >
        답변을 확인하세요.
      </button>
    </div>
  );
};
