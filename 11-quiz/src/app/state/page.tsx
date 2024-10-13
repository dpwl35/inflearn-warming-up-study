'use client';
import React, { useState } from 'react';

export default function StatePage() {
  const [selectedSubject, setSelectedSubject] = useState<string>(''); // 상태 관리

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(event.target.value);
  };

  return (
    <div className='state'>
      <select onChange={handleSelectChange}>
        <option value=''>과목을 선택하세요</option>
        <option value='math'>수학</option>
        <option value='korean'>국어</option>
      </select>

      {/* 선택된 값에 따른 문제 표시 */}
      {selectedSubject === '' && <div>문제를 선택하세요</div>}
      {selectedSubject === 'math' && <Math />}
      {selectedSubject === 'korean' && <Korean />}
    </div>
  );
}

function Math() {
  return <div>수학 문제</div>;
}

function Korean() {
  return <div>국어 문제</div>;
}
