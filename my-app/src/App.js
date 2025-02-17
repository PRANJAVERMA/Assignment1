import './App.css';
import React, { useState } from "react";
import Question from './Components/Question';
import Timer from './Components/Timer';

const questions = [
  {
      question: "Which of the following is NOT a JavaScript framework or library?",
      options: ["React", "Angular", "Vue", "Django"],
      correctAnswer: "Django",
  },
  {
      question: "What does JSX stand for in React?",
      options: [
          "JavaScript XML",
          "JavaScript Extension",
          "JavaScript Syntax",
          "Java XML Syntax"
      ],
      correctAnswer: "JavaScript XML",
  },
  {
      question: "Which CSS framework is commonly used with React?",
      options: ["Bootstrap", "Tailwind CSS", "Material-UI", "All of the above"],
      correctAnswer: "All of the above",
  }
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerSelect = (selectedOption) => {
      setSelectedOption(selectedOption);
      setIsAnswered(true);
  };

  const handleSubmit = () => {
      const currentQuestion = questions[currentQuestionIndex];

      // Update score if the selected answer is correct
      if (selectedOption === currentQuestion.correctAnswer) {
          setScore(score + 1);
      }

      const updatedQuestions = [...answeredQuestions];
      updatedQuestions[currentQuestionIndex] = {
          ...currentQuestion,
          userAnswer: selectedOption,
          isCorrect: selectedOption === currentQuestion.correctAnswer,
      };

      setAnsweredQuestions(updatedQuestions);

      if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedOption(null);
          setIsAnswered(false);
      } else {
          setQuizFinished(true);
      }
  };

  const handleTimeUp = () => {
      alert("Time's up! Submitting answers...");
      setQuizFinished(true);
  };

  const handleRestartQuiz = () => {
      if (window.confirm("Do you want to reload the page and start again?")) {
          window.location.reload();
      }
  };

  const handleNext = () => {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
          setCurrentQuestionIndex(nextQuestionIndex);
          setSelectedOption(null);
          setIsAnswered(false);
      } else {
          setQuizFinished(true);
      }
  };

  return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Frontend Quiz</h1>

          {!quizFinished ? (
              <>
                  <Timer initialTime={60} onTimeUp={handleTimeUp} />
                  <Question
                      questionData={questions[currentQuestionIndex]}
                      onAnswerSelect={handleAnswerSelect}
                      selectedOption={selectedOption}
                      correctAnswer={questions[currentQuestionIndex].correctAnswer}
                  />

                  <div>
                      <button
                          onClick={handleSubmit}
                          disabled={!isAnswered}
                          style={{
                              padding: "10px 20px",
                              backgroundColor: "#4CAF50",
                              color: "white",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                              fontSize: "18px",
                              marginTop: "20px",
                              transition: "background-color 0.3s ease",
                          }}
                      >
                          Submit
                      </button>

                      {currentQuestionIndex < questions.length - 1 ? (
                          <button
                              onClick={handleNext}
                              style={{
                                  padding: "10px 20px",
                                  backgroundColor: "#4CAF50",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  fontSize: "18px",
                                  marginTop: "20px",
                                  marginLeft: "10px",
                                  transition: "background-color 0.3s ease",
                              }}
                          >
                              Next
                          </button>
                      ) : null}
                  </div>
              </>
          ) : (
              <>
                  <h2>Quiz Over! Your score: {score}/{questions.length}</h2>
                  <button
                      onClick={handleRestartQuiz}
                      style={{
                          padding: "10px 20px",
                          backgroundColor: "#f44336",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontSize: "18px",
                          marginTop: "20px",
                      }}
                  >
                      Restart Quiz
                  </button>
              </>
          )}
      </div>
  );
}

export default App;
