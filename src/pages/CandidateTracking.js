import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Box,
  Divider,
} from "@mui/material";

// Memoized selector for filtering candidates by job ID
const selectCandidatesByJob = createSelector(
  (state) => state.candidates.candidates,
  (_, jobId) => jobId,
  (candidates, jobId) =>
    candidates.filter((candidate) => candidate.jobId === jobId)
);

const CandidateTracking = () => {
  const { jobId } = useParams();
  const candidates = useSelector((state) =>
    selectCandidatesByJob(state, jobId)
  );

  if (!candidates.length) {
    return (
      <Typography variant="h6" color="textSecondary" align="center" sx={{ mt: 5 }}>
        No candidates found for this job.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Candidates for Job ID: {jobId}
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {candidates.map((candidate) => (
          <Grid item xs={12} sm={6} md={4} key={candidate.id}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" color="primary">
                  {candidate.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Email: {candidate.email}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Application Date: {new Date(candidate.applicationDate).toLocaleDateString()}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" fontWeight="bold">
                  Status: <span style={{ color: candidate.status === "Interview Scheduled" ? "green" : "gray" }}>{candidate.status}</span>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  component={Link}
                  to={`/jobs/${jobId}/candidates/${candidate.id}`}
                  sx={{ py: 1 }}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CandidateTracking;
