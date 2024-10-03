const bookTitle = document.querySelector('.book-title');
const bookAuthor = document.querySelector('.book-author');
const submitButton = document.querySelector('button.submit');
const tableTbody = document.querySelector('.table .tbody');

const toastsArea = document.querySelector('.toasts');

// 제출 & 삭제 메시지 출력
function showToast(actionType) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('toasts-message');

  if (actionType === 'add') {
    messageDiv.classList.add('add');
    messageDiv.textContent = '책이 추가되었습니다.';
  } else if (actionType === 'delete') {
    messageDiv.classList.add('delete');
    messageDiv.textContent = '책이 삭제되었습니다.';
  }

  toastsArea.appendChild(messageDiv);

  setTimeout(() => {
    toastsArea.removeChild(messageDiv);
  }, 1000);
}

//책 삭제 이벤트
function handleDelete(button, rowElement) {
  button.addEventListener('click', function () {
    tableTbody.removeChild(rowElement);

    showToast('delete'); // 삭제 메시지 출력
  });
}

// 항목(tr)을 생성하는 함수
function createTableRow(title, author) {
  //tr 추가
  const newTr = document.createElement('div');
  newTr.classList.add('tr');

  //td 추가 이름 + 저자
  const titleTd = document.createElement('div');
  titleTd.classList.add('td');
  titleTd.textContent = title;
  const authorTd = document.createElement('div');
  authorTd.classList.add('td');
  authorTd.textContent = author;

  //삭제 버튼 추가
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.classList.add('delete');
  deleteButton.textContent = 'X';

  // 삭제 버튼 분리
  handleDelete(deleteButton, newTr);

  newTr.appendChild(titleTd);
  newTr.appendChild(authorTd);
  newTr.appendChild(deleteButton);

  tableTbody.appendChild(newTr);
}

// 책 추가 이벤트
submitButton.addEventListener('click', function () {
  const titleValue = bookTitle.value;
  const authorValue = bookAuthor.value;

  if (titleValue && authorValue) {
    createTableRow(titleValue, authorValue);
    showToast('add'); // 추가 메시지 출력

    bookTitle.value = '';
    bookAuthor.value = '';
  } else {
    alert('책 이름과 저자 모두 입력해야 합니다.');
  }
});
