import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CandidateTracking from "./pages/CandidateTracking";
import CandidateDetails from "./pages/CandidateDetails";
import AssessmentCreation from "./pages/AssessmentCreation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/candidates/:jobId" element={<CandidateTracking />} />
        <Route path="/candidate/:candidateId" element={<CandidateDetails />} />
        <Route path="/assessment/:jobId" element={<AssessmentCreation />} />
        <Route path="/candidate/:candidateId" element={<CandidateDetails />} />
        <Route path="/jobs/:jobId/candidates" element={<CandidateTracking />} />
        <Route
          path="/jobs/:jobId/candidates/:candidateId"
          element={<CandidateDetails />}
        />
      </Routes>
    </Router>
  );
}

export default App;
