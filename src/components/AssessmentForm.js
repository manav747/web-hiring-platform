import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAssessment } from "../redux/slices/assessmentSlice";

const AssessmentForm = ({ jobId }) => {
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", ""], correctAnswerIndex: null },
  ]);

  // Handle changes to question text
  const handleQuestionChange = (index, newQuestionText) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = newQuestionText;
    setQuestions(updatedQuestions);
  };

  // Handle changes to options
  const handleOptionChange = (questionIndex, optionIndex, newOption) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = newOption;
    setQuestions(updatedQuestions);
  };

  // Handle adding a new option to a question
  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  // Handle marking the correct answer
  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswerIndex = optionIndex;
    setQuestions(updatedQuestions);
  };

  // Handle adding a new question
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", ""], correctAnswerIndex: null },
    ]);
  };

  // Handle submitting the assessment
  const handleSubmit = () => {
    const assessment = {
      jobId,
      questions: questions.filter(
        (q) =>
          q.questionText &&
          q.options.length >= 2 &&
          q.correctAnswerIndex !== null
      ),
    };
    dispatch(addAssessment(assessment));
    setQuestions([
      { questionText: "", options: ["", ""], correctAnswerIndex: null },
    ]);
  };

  return (
    <div>
      <h2>Create Assessment</h2>
      {questions.map((q, qIndex) => (
        <div key={qIndex} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder={`Question ${qIndex + 1}`}
            value={q.questionText}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
          />
          <div>
            {q.options.map((opt, optIndex) => (
              <div key={optIndex}>
                <input
                  type="text"
                  placeholder={`Option ${optIndex + 1}`}
                  value={opt}
                  onChange={(e) =>
                    handleOptionChange(qIndex, optIndex, e.target.value)
                  }
                />
                <input
                  type="radio"
                  name={`correctAnswer-${qIndex}`}
                  checked={q.correctAnswerIndex === optIndex}
                  onChange={() => handleCorrectAnswerChange(qIndex, optIndex)}
                />
                <label>Correct Answer</label>
              </div>
            ))}
            <button onClick={() => handleAddOption(qIndex)}>Add Option</button>
          </div>
        </div>
      ))}
      <button onClick={handleAddQuestion}>Add Another Question</button>
      <button onClick={handleSubmit}>Save Assessment</button>
    </div>
  );
};

export default AssessmentForm;
