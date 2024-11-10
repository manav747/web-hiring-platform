import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
    questions: []
  };
  

const AssessmentContext = createContext();
const ADD_QUESTION = 'ADD_QUESTION';
const DELETE_QUESTION = "DELETE_QUESTION"

const loadStateFromLocalStorage = () => {
  const storedState = localStorage.getItem("assessment");
  return storedState ? JSON.parse(storedState) : initialState;
};


function assessmentReducer(state, action) {
    switch (action.type) {
      case ADD_QUESTION:
        return {
          ...state,
          questions: [
            ...state.questions,
            { ...action.payload, jobId: action.jobId },  // Store question with jobId
          ],
        };
      case DELETE_QUESTION:
          return {
            ...state,
            questions: state.questions.filter((question) => question.id !== action.payload.id),
          };
      default:
        return state;
    }
  }
  

export const AssessmentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(assessmentReducer, loadStateFromLocalStorage());
  
    const addQuestion = (question, jobId) => {
        dispatch({
          type: ADD_QUESTION,
          payload: question,
          jobId,  // Attach jobId to question
        });
      };
    const deleteQuestion = (id) => dispatch({ type: 'DELETE_QUESTION', payload: { id } });


    useEffect(() => {
      if(localStorage) localStorage.setItem("assessment", JSON.stringify(state));
    }, [state]);
  
  
    return (
      <AssessmentContext.Provider value={{ state, addQuestion, deleteQuestion }}>
        {children}
      </AssessmentContext.Provider>
    );
  };

  export const useAssessment = () => useContext(AssessmentContext);