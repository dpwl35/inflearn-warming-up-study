import React from 'react';
import ExpenseLists from './ExpenseLists';

export default function ExpenseList({
  expenseData,
  setExpenseData,
  showMessageWithColor,
  setTotalAmount,
  calculateTotalAmount,
}) {
  const handleRmove = () => {
    setExpenseData([]);
    setTotalAmount(0);
    showMessageWithColor('delete');
  };

  return (
    <div className='mt-8'>
      <div>
        <div className='border-b border-gray-300 pb-2 mb-2 text-sm flex justify-between gap-2'>
          <div className='w-[15%] text-[#71717a] text-sm'>항목</div>
          <div className='w-[30%] text-[#71717a]'>내역</div>
          <div className='w-[30%] text-[#71717a] text-right'>지출</div>
          <button
            type='button'
            className='w-[25%] text-[#71717a] text-right'
            onClick={handleRmove}
          >
            전체 지우기
          </button>
        </div>
        <ExpenseLists
          expenseData={expenseData}
          setExpenseData={setExpenseData}
          showMessageWithColor={showMessageWithColor}
          setTotalAmount={setTotalAmount}
          calculateTotalAmount={calculateTotalAmount}
        />
      </div>
    </div>
  );
}
