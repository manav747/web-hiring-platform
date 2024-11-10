
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Typography } from "@mui/material";
import { useAssessment } from "../context/AssessmentContext";
import { Delete, ExpandMore } from "@mui/icons-material";



export default  function AssessmentList({jobId}) {
    const {state, deleteQuestion } = useAssessment();
    const assessment = state.questions.filter((q) => q.jobId === jobId);
   
console.log("assessment list: ", assessment, state)
 
    return (
      <>
      <Box>
      <Typography variant="h5" gutterBottom>
          Existing Questions
        </Typography>
        {assessment.length === 0 && (
          <Typography variant="body1" color="textSecondary">
            No questions added yet.
          </Typography>
        )}
      {assessment.length > 0 && assessment.map((q) => (
<>
<Accordion key={q.id} sx={{ mb: 2 }}>
<AccordionSummary expandIcon={<ExpandMore/>}>
<Typography variant="subtitle1">{q.question}</Typography>
</AccordionSummary>
<AccordionDetails>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Options: {q.options.join(", ")}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Correct Answer: {q.correctAnswer}
                  </Typography>
                  <IconButton
                    color="secondary"
                    onClick={() =>
                    {
                      deleteQuestion(q.id)
                    }
                    }
                    sx={{ mt: 2 }}
                  >
                   <Delete />
                  </IconButton>
                </Box>
              </AccordionDetails>
</Accordion>
</>          
            ))
        }  
      </Box>

      </>
       
    )
}