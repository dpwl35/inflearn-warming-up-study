import { data } from './data.js';

// 카테고리
const categories = ['poke', 'bowl', 'wrap', 'side'];

// 메뉴 초기화 함수
function initializeMenu() {
  categories.forEach((category) => {
    const menuContainer = document.getElementById(category);

    const fragment = document.createDocumentFragment();

    data[category].forEach((item) => {
      const menuItem = document.createElement('li');
      menuItem.classList.add('menu');

      const menuImage = document.createElement('div');
      menuImage.classList.add('menu-img');
      const imgElement = document.createElement('img');
      imgElement.src = item.img;
      imgElement.alt = item.name;
      menuImage.appendChild(imgElement);

      const menuName = document.createElement('p');
      menuName.classList.add('menu-name');
      menuName.textContent = item.name;

      const menuEnglish = document.createElement('p');
      menuEnglish.classList.add('menu-english');
      menuEnglish.textContent = item.englishName;

      const menuMainIngredient = document.createElement('p');
      menuMainIngredient.classList.add('menu-mainIngredient');
      menuMainIngredient.textContent = item.mainIngredient;

      const menuDescription = document.createElement('p');
      menuDescription.classList.add('menu-description');
      menuDescription.textContent = item.description;

      menuItem.append(
        menuImage,
        menuName,
        menuEnglish,
        menuMainIngredient,
        menuDescription
      );

      fragment.appendChild(menuItem);
    });

    menuContainer.appendChild(fragment);
  });
}

// 탭 클릭 이벤트
function handleTabClick() {
  const tabItems = document.querySelectorAll('.tab-item');
  const tabContents = document.querySelectorAll('.tab-content');

  tabItems.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // 탭 활성화
      tabItems.forEach((item) => item.classList.remove('active'));
      tab.classList.add('active');

      // 콘텐츠 활성화
      tabContents.forEach((content) => content.classList.remove('active'));
      const selectedCategory = categories[index];
      document.getElementById(selectedCategory).classList.add('active');
    });
  });
}

// 초기화 함수
initializeMenu();
handleTabClick();
