import { data } from './data.js'; // data.js에서 데이터 가져오기

// 메뉴
function initializeMenu() {
  const categories = ['poke', 'bowl', 'wrap', 'side'];

  categories.forEach((category) => {
    const menuContainer = document.getElementById(category);

    data[category].forEach((item) => {
      // 메뉴 항목 생성
      const menuItem = document.createElement('li');
      menuItem.classList.add('menu');

      // 메뉴 내용 생성
      menuItem.innerHTML = `
        <div class="menu-img">
          <img src="${item.img}" alt ="${item.name}"/>
        </div>
        <p class="menu-name">${item.name}</p>
        <p class="menu-english">${item.englishName}</p>
        <p class="menu-mainIngredient">${item.mainIngredient}</p>
        <p class="menu-description">${item.description}</p>
      `;

      // 컨테이너에 추가
      menuContainer.appendChild(menuItem);
    });
  });
}

// 탭 클릭 이벤트에서 active 클래스 추가 및 제거 처리
function handleTabClick() {
  const tabItems = document.querySelectorAll('.tab-item');

  tabItems.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // 모든 탭에서 active 클래스 제거
      tabItems.forEach((item) => item.classList.remove('active'));

      // 클릭된 탭에만 active 클래스 추가
      tab.classList.add('active');

      // 모든 카테고리 내용 숨기기
      const tabContents = document.querySelectorAll('.tab-content');
      tabContents.forEach((content) => content.classList.remove('active'));

      // 선택된 카테고리 내용 표시
      const categories = ['poke', 'bowl', 'wrap', 'side'];
      const selectedCategory = categories[index]; // 클릭된 카테고리

      document.getElementById(selectedCategory).classList.add('active'); // 해당 카테고리 내용 활성화
    });
  });
}

// 초기화 함수 실행
initializeMenu(); // HTML 초기 생성
handleTabClick(); // 탭 클릭 이벤트 처리
