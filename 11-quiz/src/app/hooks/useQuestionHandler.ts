import { useState, ChangeEvent, useEffect } from 'react';

interface Question {
  id: number;
  question: string;
  choices: string[];
  answer: number;
}

export function useQuestionHandler(questions: Question[]) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    new Array(questions.length).fill('')
  ); // 선택한 답변
  const [isButtonActive, setIsButtonActive] = useState<boolean[]>(
    new Array(questions.length).fill(false)
  ); // 버튼 활성화 상태
  const [resultClasses, setResultClasses] = useState<string[][]>(
    questions.map(() => [])
  );
  const [questionAreaClasses, setQuestionAreaClasses] = useState<string[]>(
    new Array(questions.length).fill('')
  ); // 각 문제 영역의 클래스

  // questions 배열이 변경될 때마다 상태 초기화
  useEffect(() => {
    resetState();
  }, [questions]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const selectedValue = event.target.value;
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = selectedValue; // 선택한 답변 저장
    setSelectedAnswers(newSelectedAnswers);

    const newIsButtonActive = [...isButtonActive];
    newIsButtonActive[index] = true; // 버튼 활성화
    setIsButtonActive(newIsButtonActive);

    // 정답 확인 후 다른 선택지를 누르면 클래스 초기화
    const resetResultClasses = new Array(questions[index].choices.length).fill(
      ''
    );
    setResultClasses((prev) => {
      const updatedResultClasses = [...prev];
      updatedResultClasses[index] = resetResultClasses;
      return updatedResultClasses;
    });

    // question-area 클래스 초기화
    setQuestionAreaClasses((prev) => {
      const updatedQuestionAreaClasses = [...prev];
      updatedQuestionAreaClasses[index] = ''; // 초기화
      return updatedQuestionAreaClasses;
    });
  };

  // 상태 초기화 함수
  const resetState = () => {
    setSelectedAnswers(new Array(questions.length).fill(''));
    setIsButtonActive(new Array(questions.length).fill(false));
    setResultClasses(questions.map(() => []));
    setQuestionAreaClasses(new Array(questions.length).fill(''));
  };

  const checkAnswer = (index: number) => {
    const selectedAnswer = selectedAnswers[index];
    const selectedQuestion = questions[index];
    const selectedAnswerIndex =
      selectedQuestion.choices.indexOf(selectedAnswer);

    const newResultClasses = selectedQuestion.choices.map((_, choiceIndex) => {
      if (choiceIndex === selectedQuestion.answer) {
        return 'correct'; // 정답일 때 클래스 설정
      } else {
        return 'wrong'; // 오답일 때 클래스 설정
      }
    });

    // 각 문제에 대한 결과 클래스를 설정
    setResultClasses((prev) => {
      const updatedResultClasses = [...prev];
      updatedResultClasses[index] = newResultClasses;
      return updatedResultClasses;
    });

    // 정답 여부에 따라 question-area 클래스 설정
    setQuestionAreaClasses((prev) => {
      const newQuestionAreaClasses = [...prev];
      newQuestionAreaClasses[index] =
        selectedAnswerIndex === selectedQuestion.answer ? 'correct' : 'wrong'; // 정답 여부에 따라 클래스 추가
      return newQuestionAreaClasses;
    });
  };

  return {
    selectedAnswers,
    isButtonActive,
    resultClasses,
    questionAreaClasses,
    handleChange,
    checkAnswer,
    resetState, // 상태를 초기화하는 함수 반환
  };
}
