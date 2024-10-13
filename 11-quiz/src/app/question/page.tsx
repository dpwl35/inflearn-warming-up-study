'use client';
import React, { ChangeEvent, useState } from 'react';

export default function QuestionPage() {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <ul className='question'>
      <li>
        <p>과일이 아닌 것은?</p>
        <ul className='question-item'>
          <li>
            <input
              type='radio'
              id='apple'
              name='fruit'
              value='apple'
              checked={selectedValue === 'apple'}
              onChange={handleChange}
            />
            <label htmlFor='apple'>사과</label>
          </li>
          <li>
            <input
              type='radio'
              id='mango'
              name='fruit'
              value='mango'
              checked={selectedValue === 'mango'}
              onChange={handleChange}
            />
            <label htmlFor='mango'>망고</label>
          </li>
          <li>
            <input
              type='radio'
              id='banana'
              name='fruit'
              value='banana'
              checked={selectedValue === 'banana'}
              onChange={handleChange}
            />
            <label htmlFor='banana'>바나나</label>
          </li>
          <li>
            <input
              type='radio'
              id='pencil'
              name='fruit'
              value='pencil'
              checked={selectedValue === 'pencil'}
              onChange={handleChange}
            />
            <label htmlFor='pencil'>연필</label>
          </li>
        </ul>
        <div className='result'>답변을 확인하세요.</div>
      </li>
      <li>
        <p>전자기기가 아닌 것은?</p>
        <ul className='question-item'>
          <li>
            <input
              type='radio'
              id='computer'
              name='device'
              value='computer'
              checked={selectedValue === 'computer'}
              onChange={handleChange}
            />
            <label htmlFor='computer'>컴퓨터</label>
          </li>
          <li>
            <input
              type='radio'
              id='laptop'
              name='device'
              value='laptop'
              checked={selectedValue === 'laptop'}
              onChange={handleChange}
            />
            <label htmlFor='laptop'>노트북</label>
          </li>
          <li>
            <input
              type='radio'
              id='phone'
              name='device'
              value='phone'
              checked={selectedValue === 'phone'}
              onChange={handleChange}
            />
            <label htmlFor='phone'>핸드폰</label>
          </li>
          <li>
            <input
              type='radio'
              id='pencil'
              name='device'
              value='pencil'
              checked={selectedValue === 'pencil'}
              onChange={handleChange}
            />
            <label htmlFor='pencil'>연필</label>
          </li>
        </ul>
      </li>
    </ul>
  );
}
