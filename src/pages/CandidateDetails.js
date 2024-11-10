import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Button,
  Grid,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Divider,
} from "@mui/material";
import { updateCandidateStatus } from "../redux/slices/candidateSlice";

const CandidateDetails = () => {
  const { jobId, candidateId } = useParams();
  const dispatch = useDispatch();

  const job = useSelector((state) =>
    state.jobs.jobs.find((job) => job.id === jobId)
  );

  const candidate = useSelector((state) =>
    state.candidates.candidates.find(
      (candidate) => candidate.id === candidateId && candidate.jobId === jobId
    )
  );

  const [status, setStatus] = useState(candidate ? candidate.status : "");

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    dispatch(updateCandidateStatus({ candidateId, status: newStatus }));
  };

  if (!job) {
    return <Typography variant="h6" align="center" color="textSecondary">Job not found</Typography>;
  }
  if (!candidate) {
    return <Typography variant="h6" align="center" color="textSecondary">Candidate not found</Typography>;
  }

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom align="center">
        Candidate Details: {candidate.name}
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 4 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Profile Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Email:</strong> {candidate.email}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Phone:</strong> {candidate.phone}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Skills:</strong> {candidate.skills.join(", ")}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Experience:</strong> {candidate.experience} years
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Application Date:</strong> {new Date(candidate.applicationDate).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" justifyContent="center" alignItems="center">
            <Button
              variant="contained"
              color="secondary"
              href={candidate.resume}
              target="_blank"
              sx={{ py: 1, px: 3 }}
            >
              View Resume
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, boxShadow: 4 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Update Candidate Status
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <FormControl fullWidth variant="outlined">
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={handleStatusChange}
            label="Status"
            sx={{ borderRadius: 1 }}
          >
            <MenuItem value="Under Review">Under Review</MenuItem>
            <MenuItem value="Interview Scheduled">Interview Scheduled</MenuItem>
            <MenuItem value="Selected">Selected</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => alert("Status updated")}
            fullWidth
            sx={{ mt: 3 }}
          >
            Update Status
          </Button>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default CandidateDetails;
