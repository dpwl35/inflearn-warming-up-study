import React, { useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

export default function App() {
  const [expenseData, setExpenseData] = useState([
    {
      expense: '교통비',
      details: '택시비',
      amount: 10000,
    },
    {
      expense: '식비',
      details: '점심',
      amount: 8000,
    },
  ]);

  const [expense, setExpense] = useState('교통비');
  const [details, setDetails] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let newExpenseData = {
      expense,
      details,
      amount: Number(amount),
    };

    setExpenseData((prev) => [...prev, newExpenseData]);

    setDetails('');
    setAmount('');
  };

  return (
    <div className='flex  w-screen h-screen bg-gray-100 justify-center items-start'>
      <div className='w-full  p-6 m-4 bg-white rounded shadow max-w-[600px]'>
        <div className='flex justify-between mb-3 '>
          <h1>여행 경비</h1>
        </div>
        <div className='w-full px-2 py-2 bg-[#f0faf6] text-[#028450] text-sm rounded-lg'>
          아이템이 생성되었습니다.
        </div>
        <div className='mt-4 bg-[#15c47e] rounded-lg py-3 px-3'>
          <p className='text-white text-sm font-bold'>총 지출</p>
          <p className='mt-1 text-right text-4xl text-white font-bold'>000원</p>
        </div>

        <ExpenseForm
          handleSubmit={handleSubmit}
          expense={expense}
          setExpense={setExpense}
          details={details}
          setDetails={setDetails}
          amount={amount}
          setAmount={setAmount}
        />

        <ExpenseList expenseData={expenseData} />
      </div>
    </div>
  );
}
