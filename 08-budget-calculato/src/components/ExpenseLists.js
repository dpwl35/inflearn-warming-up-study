import React from 'react';

export default function ExpenseLists({ expenseData }) {
  return (
    <ul>
      {expenseData.map((item, index) => (
        <li key={index} className='flex font-normal w-full items-center'>
          <div className='w-[15%] text-[#71717a] text-sm'>{item.expense}</div>
          <div className='w-[30%]'>{item.details}</div>
          <div className='w-[30%] text-right'>{item.amount}</div>
          <div className='w-[25%] flex justify-end'>
            <button type='button' className='mr-2'>
              ✏
            </button>
            <button type='button'>🗑</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
