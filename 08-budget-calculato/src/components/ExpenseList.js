import React from 'react';
import ExpenseLists from './ExpenseLists';

export default function ExpenseList({ expenseData }) {
  return (
    <div className='mt-8'>
      <div>
        <div className='border-b border-gray-300 pb-2 mb-2 text-sm flex justify-between'>
          <div className='w-[15%] text-[#71717a] text-sm'>항목</div>
          <div className='w-[30%] text-[#71717a]'>내역</div>
          <div className='w-[30%] text-[#71717a] text-right'>지출</div>
          <button type='button' className='w-[25%] text-[#71717a] text-right'>
            전체 지우기
          </button>
        </div>
        <ExpenseLists expenseData={expenseData} />
      </div>
    </div>
  );
}
