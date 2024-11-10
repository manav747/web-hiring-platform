// src/redux/slices/assessmentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const assessmentSlice = createSlice({
  name: "assessments",
  initialState: {
    assessments: [{
      jobId: "1",
      questions : [
        {
          id: "34234234234",
          options: ['New Delhi', "Kashmir", "Punjab", "Kolkata"],
          correctAnswer : "New Delhi",
          question: "What is the  capital of India"
        }
      ]
    }],
  },
  reducers: {
    addAssessment: (state, action) => {
      console.log('addAssessment(): ', action.payload)
      const ind = state.assessments.findIndex(
        (assess) => assess.jobId === action.payload.jobId
      );
      if (ind === -1) {
        console.log("we are reaching here");
        state.assessments.push({
          jobId: action.payload.jobId,
          questions: action.payload.questions ?? []
        });
      }
    },
    addQuestion: (state, action) => {
      console.log("addQuestion(): ", action.payload);
      const assessment = state.assessments.find(
        (assess) => assess.jobId === action.payload.jobId
      );

      console.log('assessment: ', assessment)
      if (assessment) {
        assessment?.questions.push(action.payload.question);
      }
    },
    removeQuestion: (state, action) => {
      const assessment = state.assessments.find(
        (assess) => assess.jobId === action.payload.jobId
      );
      if (assessment) {
        assessment.questions = assessment.questions.filter(
          (q) => q.id !== action.payload.questionId
        );
      }
    },
  },
});

export const { addAssessment, addQuestion, removeQuestion } =
  assessmentSlice.actions;
export default assessmentSlice.reducer;
