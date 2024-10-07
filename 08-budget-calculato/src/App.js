import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

export default function App() {
  // 항목 데이터
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

  // 항목, 내역, 지출
  const [expense, setExpense] = useState('교통비');
  const [details, setDetails] = useState('');
  const [amount, setAmount] = useState('');

  // 총 지출 금액
  const [totalAmount, setTotalAmount] = useState(0);

  // 메시지 상태 추가
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('#f0faf6');

  useEffect(() => {
    const total = expenseData.reduce((acc, item) => acc + item.amount, 0);
    setTotalAmount(total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 총지출 금액 계산 함수 정의
  const calculateTotalAmount = (data) => {
    return data.reduce((acc, item) => acc + item.amount, 0);
  };

  // 항목 추가
  const handleSubmit = (e) => {
    e.preventDefault();

    let newExpenseData = {
      expense,
      details,
      amount: Number(amount),
    };

    setExpenseData((prev) => {
      const updatedData = [...prev, newExpenseData];
      // 총 지출 금액 업데이트
      setTotalAmount(calculateTotalAmount(updatedData));
      return updatedData;
    });

    showMessageWithColor('add');

    setDetails('');
    setAmount('');
  };

  // 메시지 표시 함수
  const showMessageWithColor = (status) => {
    let color;
    let message;

    if (status === 'add') {
      message = '아이템이 생성되었습니다.';
      color = '#f0faf6';
    } else if (status === 'edit') {
      message = '아이템이 수정되었습니다.';
      color = '#f0faf6';
    } else if (status === 'delete') {
      message = '아이템이 삭제되었습니다.';
      color = '#fee';
    }

    setMessage(message);
    setMessageColor(color);
    setShowMessage(true);

    // 1초 후에 메시지 숨기기
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  };

  return (
    <div className='flex w-screen h-screen bg-gray-100 justify-center items-start'>
      <div className='w-full p-6 m-4 bg-white rounded shadow max-w-[600px]'>
        <div className='flex justify-between mb-4'>
          <h1 className='text-2xl font-bold'>여행 경비</h1>
        </div>

        {/* 상태메세지 */}
        {showMessage && (
          <div
            className='w-full px-2 py-2 text-sm rounded-lg'
            style={{ backgroundColor: messageColor }}
          >
            {message}
          </div>
        )}

        <div className='mt-4 bg-[#15c47e] rounded-lg py-3 px-3'>
          <p className='text-white text-sm font-bold'>총 지출</p>
          <p className='mt-1 text-right text-4xl text-white font-bold'>
            {totalAmount.toLocaleString()}원
          </p>
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

        <ExpenseList
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
