// src/redux/slices/candidateSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  candidates: [
    {
      id: "candidate-1",
      jobId: "1",
      name: "Alice",
      email: "alice@example.com",
      phone: "123-456-7890",
      skills: ["React", "Node.js"],
      experience: 3,
      resume: "/resume.pdf",
      applicationDate: "2024-11-01",
      status: "Under Review",
    },
    {
      id: "candidate-2",
      jobId: "1",
      name: "Bob",
      email: "bob@example.com",
      phone: "987-654-3210",
      skills: ["Java", "Spring"],
      experience: 4,
      resume: "/resume.pdf",
      applicationDate: "2024-11-02",
      status: "Interview Scheduled",
    },
    {
      id: "candidate-3",
      jobId: "2",
      name: "Charlie",
      email: "charlie@example.com",
      phone: "555-555-5555",
      skills: ["Python", "Django"],
      experience: 2,
      resume: "/resume.pdf",
      applicationDate: "2024-10-30",
      status: "Under Review",
    },
    {
      id: "candidate-4",
      jobId: "1",
      name: "David",
      email: "david@example.com",
      phone: "444-444-4444",
      skills: ["Angular", "TypeScript"],
      experience: 5,
      resume: "/resume.pdf",
      applicationDate: "2024-11-03",
      status: "Selected",
    },
  ],
};

const candidateSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    // Existing reducers...
    updateCandidateStatus: (state, action) => {
      const { candidateId, status } = action.payload;
      const candidate = state.candidates.find((c) => c.id === candidateId);
      if (candidate) {
        candidate.status = status;
      }
    },
  },
});

export const { updateCandidateStatus } = candidateSlice.actions;
export default candidateSlice.reducer;
