// src/components/CandidateCard.js
import React from "react";
import { useDispatch } from "react-redux";
import { updateCandidateStatus } from "../redux/slices/candidateSlice";

const CandidateCard = ({ candidate }) => {
  const dispatch = useDispatch();

  const handleStatusChange = (e) => {
    dispatch(
      updateCandidateStatus({ id: candidate.id, newStatus: e.target.value })
    );
  };

  return (
    <div className="candidate-card">
      <h3>{candidate.name}</h3>
      <p>Application Date: {candidate.applicationDate}</p>
      <a href={candidate.resumeLink} target="_blank" rel="noopener noreferrer">
        View Resume
      </a>
      <label>
        Status:
        <select value={candidate.status} onChange={handleStatusChange}>
          <option value="Under Review">Under Review</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Hired">Hired</option>
        </select>
      </label>
    </div>
  );
};

export default CandidateCard;
