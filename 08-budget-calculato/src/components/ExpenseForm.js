import React from 'react';

export default function ExpenseForm({
  handleSubmit,
  expense,
  setExpense,
  details,
  setDetails,
  amount,
  setAmount,
}) {
  return (
    <form onSubmit={handleSubmit} className='mt-8 flex gap-2'>
      <select
        className='w-[17%]  border-b border-gray-500  py-1'
        value={expense}
        onChange={(e) => setExpense(e.target.value)}
      >
        <option value='교통비'>교통비</option>
        <option value='숙소비'>숙소비</option>
        <option value='식비'>식비</option>
        <option value='쇼핑'>쇼핑</option>
        <option value='기타'>기타</option>
      </select>
      <input
        className='w-[34%] border-b border-gray-500 px-2 py-1'
        type='text'
        placeholder='내역'
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <input
        className='w-[34%] border-b border-gray-500 px-2 py-1'
        type='number'
        placeholder='비용'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        type='submit'
        className='w-[15%] rounded-lg bg-black text-white px-4 py-2 font-bold'
      >
        제출
      </button>
    </form>
  );
}
