// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice";
import candidateReducer from "./slices/candidateSlice";
import assessmentReducer from "./slices/assessmentSlice"
import { loadState, saveState } from "./localStorage";

const preloadedState = loadState()
const store = configureStore({
  reducer: {
    jobs: jobReducer,
    candidates: candidateReducer,
    assessments: assessmentReducer,
  },
  preloadedState
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
