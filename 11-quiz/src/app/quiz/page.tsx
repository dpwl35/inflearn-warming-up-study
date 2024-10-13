'use client';
import React, { useState } from 'react';

export default function QuizPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(event.target.value);
  };

  return (
    <div className='test'>
      <p>시험</p>
      <div className='test-area'>
        <p>상태선택</p>
        <select onChange={handleSelectChange}>
          <option value=''>시험문제를 선택하세요.</option>
          <option value='math'>수학</option>
          <option value='korean'>국어</option>
        </select>
        <button type='button'>연습 테스트 시작</button>
      </div>
    </div>
  );
}
