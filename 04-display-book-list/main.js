// 책 관리 클래스
class BookManager {
  constructor() {
    this.books = [];
  }

  addBook(title, author) {
    this.books.push({ title, author });
  }

  removeBook(index) {
    this.books.splice(index, 1);
  }

  getBooks() {
    return this.books;
  }
}

// UI 관리 클래스
class BookUI {
  constructor() {
    this.bookTitle = document.querySelector('.book-title');
    this.bookAuthor = document.querySelector('.book-author');
    this.submitButton = document.querySelector('button.submit');
    this.tableTbody = document.querySelector('.table .tbody');
    this.toastsArea = document.querySelector('.toasts');

    this.bookManager = new BookManager(); // BookManager 클래스 사용

    this.init();
  }

  init() {
    this.submitButton.addEventListener('click', this.handleAddBook.bind(this));
  }

  showToast(actionType) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('toasts-message');

    if (actionType === 'add') {
      messageDiv.classList.add('add');
      messageDiv.textContent = '책이 추가되었습니다.';
    } else if (actionType === 'delete') {
      messageDiv.classList.add('delete');
      messageDiv.textContent = '책이 삭제되었습니다.';
    }

    this.toastsArea.appendChild(messageDiv);

    setTimeout(() => {
      this.toastsArea.removeChild(messageDiv);
    }, 1000);
  }

  handleDelete(button, rowElement, index) {
    button.addEventListener('click', () => {
      this.tableTbody.removeChild(rowElement);
      this.bookManager.removeBook(index);
      this.showToast('delete');
    });
  }

  createTableRow(title, author, index) {
    const newTr = document.createElement('div');
    newTr.classList.add('tr');

    const titleTd = document.createElement('div');
    titleTd.classList.add('td');
    titleTd.textContent = title;

    const authorTd = document.createElement('div');
    authorTd.classList.add('td');
    authorTd.textContent = author;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'X';

    this.handleDelete(deleteButton, newTr, index);

    newTr.appendChild(titleTd);
    newTr.appendChild(authorTd);
    newTr.appendChild(deleteButton);

    this.tableTbody.appendChild(newTr);
  }

  handleAddBook() {
    const titleValue = this.bookTitle.value;
    const authorValue = this.bookAuthor.value;

    if (titleValue && authorValue) {
      this.bookManager.addBook(titleValue, authorValue);
      this.createTableRow(
        titleValue,
        authorValue,
        this.bookManager.getBooks().length - 1
      );
      this.showToast('add');

      this.bookTitle.value = '';
      this.bookAuthor.value = '';
    } else {
      alert('책 이름과 저자 모두 입력해야 합니다.');
    }
  }
}

// UI 클래스 인스턴스 생성
const bookUI = new BookUI();
