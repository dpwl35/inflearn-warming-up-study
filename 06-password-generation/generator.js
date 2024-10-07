// 문자 범위 정의
const charSets = {
  numbers: '0123456789',
  small: 'abcdefghijklmnopqrstuvwxyz',
  capital: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  symbols: '@!#$&%',
};

// 비밀번호 생성기 Generator 함수
function* passwordGenerator(options) {
  const selectedSets = [];

  if (options.numbers) selectedSets.push(charSets.numbers);
  if (options.small) selectedSets.push(charSets.small);
  if (options.capital) selectedSets.push(charSets.capital);
  if (options.symbols) selectedSets.push(charSets.symbols);

  while (true) {
    const randomSet =
      selectedSets[Math.floor(Math.random() * selectedSets.length)];
    yield randomSet.charAt(Math.floor(Math.random() * randomSet.length));
  }
}

// 비밀번호 생성 함수
function generatePassword(length, options) {
  const generator = passwordGenerator(options);
  let password = '';

  // 각 선택된 문자 집합에서 최소 하나의 문자를 추가
  const selectedSets = [];
  if (options.numbers) selectedSets.push(charSets.numbers);
  if (options.small) selectedSets.push(charSets.small);
  if (options.capital) selectedSets.push(charSets.capital);
  if (options.symbols) selectedSets.push(charSets.symbols);

  // 먼저 각 문자 집합에서 하나씩 선택하여 추가
  selectedSets.forEach((set) => {
    password += set.charAt(Math.floor(Math.random() * set.length));
  });

  // 나머지 자리에 대해 랜덤 문자 추가
  for (let i = password.length; i < length; i++) {
    password += generator.next().value;
  }

  // 비밀번호를 섞어서 반환
  return shufflePassword(password);
}

// 비밀번호 셔플 함수
function shufflePassword(password) {
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

// 길이와 체크박스 설정을 가져오는 함수
function getOptions() {
  return {
    numbers: document.getElementById('numbers').checked,
    small: document.getElementById('small').checked,
    capital: document.getElementById('capital').checked,
    symbols: document.getElementById('symbols').checked,
  };
}

// 비밀번호 복사 함수
function copyToClipboard(text) {
  const tempInput = document.createElement('input');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  alert('비밀번호가 복사되었습니다!');
}

// DOM 요소들
const passwordElement = document.querySelector('.password');
const copyButton = document.querySelector('.copy');
const createButton = document.querySelector('.create-button');
const inputLength = document.querySelector('.create-input input');

// 생성 버튼 클릭 이벤트
createButton.addEventListener('click', () => {
  const length = parseInt(inputLength.value, 10);
  const options = getOptions();

  // 길이가 최소 5 이상, 최대 70 이하인지 확인
  if (isNaN(length) || length < 5 || length > 70) {
    alert('비밀번호 길이는 5 이상 70 이하로 설정해주세요.');
    return;
  }

  // 선택된 옵션이 하나도 없을 경우 경고
  if (
    !options.numbers &&
    !options.small &&
    !options.capital &&
    !options.symbols
  ) {
    alert('최소 하나의 문자를 선택해야 합니다.');
    return;
  }

  // 비밀번호 생성
  const generatedPassword = generatePassword(length, options);
  passwordElement.textContent = generatedPassword;
});

// 복사 버튼 클릭 이벤트
copyButton.addEventListener('click', () => {
  const password = passwordElement.textContent;
  if (password && password !== '생성된 비밀번호') {
    copyToClipboard(password);
  } else {
    alert('복사할 비밀번호가 없습니다. 비밀번호를 먼저 생성해주세요.');
  }
});
