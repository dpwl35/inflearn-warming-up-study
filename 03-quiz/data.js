const quizQuestions = [
  {
    question: '다음 중 JavaScript의 데이터 타입이 아닌 것은 무엇일까요?',
    options: ['Number', 'String', 'Boolean', 'Character'],
    answer: 3, // Character
    explanation:
      'JavaScript의 기본 데이터 타입에는 Number, String, Boolean 등이 있지만, Character 타입은 존재하지 않습니다.',
  },
  {
    question:
      'JavaScript에서 변수에 값을 할당할 때 사용하는 키워드가 아닌 것은?',
    options: ['let', 'var', 'const', 'define'],
    answer: 3, // define
    explanation:
      'JavaScript에서 변수를 선언할 때는 let, var, const를 사용하며, define은 사용되지 않습니다.',
  },
  {
    question: '다음 중 JavaScript에서 배열을 선언하는 방법으로 옳은 것은?',
    options: ['let arr = {}', 'let arr = []', 'let arr = ()', 'let arr = <>'],
    answer: 1, // []
    explanation: 'JavaScript에서 배열을 선언할 때는 대괄호 []를 사용합니다.',
  },
  {
    question: '다음 중 JavaScript에서 함수를 선언하는 올바른 방법은?',
    options: [
      'function myFunc[] {}',
      'function myFunc() {}',
      'myFunc function() {}',
      'function[] myFunc {}',
    ],
    answer: 1, // function myFunc() {}
    explanation:
      'JavaScript에서는 function 키워드와 함수명을 사용하여 함수를 선언할 수 있으며, 올바른 형식은 function myFunc() {} 입니다.',
  },
  {
    question:
      '다음 중 JavaScript에서 문자열을 나타내는 방법으로 올바르지 않은 것은?',
    options: [
      "'Hello World'",
      '"Hello World"',
      '`Hello World`',
      '(Hello World)',
    ],
    answer: 3, // (Hello World)
    explanation:
      'JavaScript에서 문자열은 \'\', "", 또는 `` (백틱)으로 감싸지만, ()로는 문자열을 표현할 수 없습니다.',
  },
];

export default quizQuestions;
