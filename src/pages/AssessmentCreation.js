import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useAssessment } from "../context/AssessmentContext";
import AssessmentList from "./AssessmentList";

const AssessmentCreation = () => {
  const { jobId } = useParams();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const { addQuestion } = useAssessment();


  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddQuestion = () => {
    if (!options.includes(correctAnswer)) {
      return;
    }
    if (!jobId) {
      return;
    }

    const newQuestion = {
      id: Date.now(), // Generate a unique id for the question
      question,
      options,
      correctAnswer,
    };

    console.log("new question: ", newQuestion, jobId);
    addQuestion(newQuestion, jobId);

    // Reset question form
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create/Edit Assessment for Job ID: {jobId}
      </Typography>

      {/* Question Input Section */}
      <Card sx={{ mb: 3, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add New Question
          </Typography>
          <TextField
            label="Question Text"
            placeholder="Enter the question here"
            fullWidth
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            margin="normal"
          />

          <Grid container spacing={2}>
            {options.map((option, index) => (
              <Grid item xs={6} key={index}>
                <TextField
                  label={`Option ${index + 1}`}
                  placeholder={`Option ${index + 1}`}
                  fullWidth
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  margin="normal"
                />
              </Grid>
            ))}
          </Grid>

          <TextField
            label="Correct Answer"
            placeholder="Enter the correct answer here"
            fullWidth
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            margin="normal"
          />

          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddQuestion}
            sx={{ mt: 2 }}
          >
            Add Question
          </Button>
        </CardContent>
      </Card>
      <AssessmentList jobId={jobId} />
    </Box>
  );
};

export default AssessmentCreation;
