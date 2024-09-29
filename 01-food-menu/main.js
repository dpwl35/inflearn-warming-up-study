import { data } from './data.js';
// 메뉴
function initializeMenu() {
  const categories = ['poke', 'bowl', 'wrap', 'side'];

  categories.forEach((category) => {
    const menuContainer = document.getElementById(category);

    data[category].forEach((item) => {
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

      menuContainer.appendChild(menuItem);
    });
  });
}

// 탭 클릭 이벤트에서 active 클래스 추가 및 제거 처리
function handleTabClick() {
  const tabItems = document.querySelectorAll('.tab-item');

  tabItems.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tabItems.forEach((item) => item.classList.remove('active'));

      tab.classList.add('active');

      const tabContents = document.querySelectorAll('.tab-content');
      tabContents.forEach((content) => content.classList.remove('active'));

      const categories = ['poke', 'bowl', 'wrap', 'side'];
      const selectedCategory = categories[index]; // 클릭된 카테고리

      document.getElementById(selectedCategory).classList.add('active'); // 해당 카테고리 내용 활성화
    });
  });
}

// 초기화 함수 실행
initializeMenu();
handleTabClick();
