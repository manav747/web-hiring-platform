import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJob, updateJob, deleteJob } from "../redux/slices/jobSlice";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Box,
  Paper,
  Divider,
  Stack,
  // Dialog,
  // DialogTitle,
  // DialogContent,
  // DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";

const JobDashboard = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const candidates = useSelector((state) => state.candidates.candidates);

  const [newJob, setNewJob] = useState({
    id: "",
    title: "",
    location: "",
    description: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editJobId, setEditJobId] = useState(null);
  // const [openDialog, setOpenDialog] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  

  const handleAddOrUpdateJob = () => {
    if (newJob.title && newJob.location) {
      if (isEditMode) {
        console.log("edit job", editJobId);
        dispatch(updateJob({ id: editJobId,  updates : { ...newJob } }));
      } else {
        const jobWithId = {
          ...newJob,
          id: String(Math.round(Math.random() * 1000)),
        };
        dispatch(addJob(jobWithId));
      }
      setNewJob({ title: "", location: "", description: "" });
      setIsEditMode(false);
      setEditJobId(null);
      // setOpenDialog(false);
    }
  };

  const handleEditJob = (job) => {
    setNewJob(job);
    setEditJobId(job.id);
    setIsEditMode(true);
    // setOpenDialog(true);
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      dispatch(deleteJob(jobId));
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Web Hiring Dashboard
      </Typography>

      {/* Add/Edit Job Form */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          boxShadow: 4,
          borderRadius: 2,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography variant="h5" gutterBottom>
          {isEditMode ? "Edit Job" : "Add New Job"}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Job Title"
              name="title"
              value={newJob.title}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Location"
              name="location"
              value={newJob.location}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Description"
              name="description"
              value={newJob.description}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddOrUpdateJob}
            sx={{
              px: 5,
              py: 1.5,
              fontSize: "1rem",
              borderRadius: 1,
            }}
          >
            {isEditMode ? "Update Job" : "Add Job"}
          </Button>
        </Stack>
      </Paper>

      {/* Job Listings */}
      <Typography variant="h5" gutterBottom>
        Job Listings
      </Typography>
      <Grid container spacing={3}>
        {jobs.map((job) => {
          const applicationsCount = candidates.filter(
            (candidate) => candidate.jobId === job.id
          ).length;

          return (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  backgroundColor: "#ffffff",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "scale(1.02)",
                  },
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {job.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Location: {job.location}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {job.description}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 2,
                      fontWeight: "bold",
                      color: applicationsCount > 0 ? "green" : "gray",
                    }}
                  >
                    Applications: {applicationsCount}
                  </Typography>

                  {/* View Candidates */}
                  <Link
                    to={`/jobs/${job.id}/candidates`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      sx={{ mt: 2, py: 1 }}
                    >
                      View Candidates
                    </Button>
                  </Link>

                  {/* Create Assessment */}
                  <Link
                    to={`/assessment/${job.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      sx={{ mt: 2, py: 1 }}
                    >
                      Create Assessment
                    </Button>
                  </Link>

                  {/* Edit Job */}
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, py: 1 }}
                    onClick={() => handleEditJob(job)}
                  >
                    Edit Job
                  </Button>

                  {/* Delete Job */}
                  <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    sx={{ mt: 2, py: 1 }}
                    onClick={() => handleDeleteJob(job.id)}
                  >
                    Delete Job
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Dialog for Editing Job */}
      {/* <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{isEditMode ? "Edit Job" : "Add Job"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Job Title"
            name="title"
            value={newJob.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            autoFocus
          />
          <TextField
            label="Location"
            name="location"
            value={newJob.location}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={newJob.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddOrUpdateJob} color="primary">
            {isEditMode ? "Update Job" : "Add Job"}
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
};

export default JobDashboard;
