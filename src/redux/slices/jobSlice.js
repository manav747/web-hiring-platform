import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [
      {
        id: "1",
        title: "Software Engineer",
        description: "Looking for an experienced software engineer.",
        numCandidates: 4,
        location: "Bangalore",
      },
      // Additional jobs if needed
    ],
  },
  reducers: {
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    updateJob: (state, action) => {
      const { id, updates } = action.payload;
      const jobIndex = state.jobs.findIndex((job) => job.id === id);
      if (jobIndex !== -1) {
        state.jobs[jobIndex] = { ...state.jobs[jobIndex], ...updates };
      }
    },
    deleteJob: (state, action) => {
      const jobId = action.payload;
      state.jobs = state.jobs.filter((job) => job.id !== jobId);
    },
  },
});

export const { addJob, updateJob, deleteJob } = jobSlice.actions;
export default jobSlice.reducer;
