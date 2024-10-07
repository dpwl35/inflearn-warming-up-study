import React, { useState } from 'react';

export default function ExpenseLists({
  expenseData,
  setExpenseData,
  showMessageWithColor,
  setTotalAmount,
  calculateTotalAmount,
}) {
  // 각 항목의 편집 상태를 관리하는 상태
  const [isEditing, setIsEditing] = useState(
    Array(expenseData.length).fill(false)
  );

  // 편집 상태
  const handleEditClick = (index) => {
    const newIsEditing = [...isEditing];
    newIsEditing[index] = true;
    setIsEditing(newIsEditing);
  };

  // 항목 변경 업데이트
  const handleChange = (e, index, field) => {
    const newExpenseData = [...expenseData];
    newExpenseData[index][field] =
      field === 'amount' ? Number(e.target.value) : e.target.value;
    setExpenseData(newExpenseData);
  };

  // 편집 완료
  const handleSaveClick = (index) => {
    const newIsEditing = [...isEditing];
    newIsEditing[index] = false;
    setIsEditing(newIsEditing);

    // 총지출 금액 업데이트
    setTotalAmount(calculateTotalAmount(expenseData));

    showMessageWithColor('edit');
  };

  //아이템 삭제
  const handleDeleteClick = (index) => {
    const newExpenseData = expenseData.filter((_, i) => i !== index);
    setExpenseData(newExpenseData);
    showMessageWithColor('delete');

    // 총지출 금액 업데이트
    setTotalAmount(calculateTotalAmount(newExpenseData));
  };

  return (
    <ul>
      {expenseData.map((item, index) => (
        <li key={index} className='flex font-normal w-full items-center gap-2'>
          <div className='w-[15%] text-[#71717a] text-sm'>{item.expense}</div>
          <input
            type='text'
            className={`w-[30%] ${
              !isEditing[index]
                ? 'border-none focus:outline-none focus:ring-0 px-1 py-1'
                : 'border-none bg-gray-100 px-1 py-1'
            }`}
            value={item.details}
            readOnly={!isEditing[index]}
            onChange={(e) => handleChange(e, index, 'details')}
          />
          <input
            type='number'
            className={`w-[30%] ${
              !isEditing[index]
                ? 'border-none focus:outline-none focus:ring-0 text-right px-1 py-1'
                : 'border-none bg-gray-100 text-right px-1 py-1'
            }`}
            value={item.amount}
            readOnly={!isEditing[index]}
            onChange={(e) => handleChange(e, index, 'amount')}
          />
          <div className='w-[25%] flex justify-end'>
            {!isEditing[index] ? (
              //편집 버튼
              <button
                type='button'
                className='mr-2'
                onClick={() => handleEditClick(index)}
              >
                ✏
              </button>
            ) : (
              // 저장 버튼
              <button
                type='button'
                className='mr-2'
                onClick={() => handleSaveClick(index)}
              >
                💾
              </button>
            )}
            <button type='button' onClick={() => handleDeleteClick(index)}>
              🗑
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
