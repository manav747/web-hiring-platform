import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteJob } from "../redux/slices/jobSlice";

const JobCard = ({ job, onEdit }) => {
  const dispatch = useDispatch();

  // Handles deleting a job
  const handleDelete = (e) => {
    e.stopPropagation(); // Prevents the click event from triggering the Link
    dispatch(deleteJob(job.id));
  };

  // Calls the parent onEdit function with the job data
  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(job);
  };

  return (
    <div className="job-card">
      {/* Links to job-specific candidates list page */}
      <Link
        to={`/jobs/${job.id}/candidates`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="job-card-content">
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p>Applications: {job.numCandidates}</p>
        </div>
      </Link>
      <div className="job-card-buttons">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default JobCard;
