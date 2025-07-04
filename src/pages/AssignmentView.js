import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  TextField, Button, Container, Typography, Box, 
  FormControl, InputLabel, Select, MenuItem 
} from '@mui/material';
import { getAssignment, updateAssignment } from '../services/api';

export default function AssignmentView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState({
    number: '',
    githubUrl: '',
    branch: '',
    status: ''
  });

  useEffect(() => {
    if (id !== 'new') {
      const fetchData = async () => {
        try {
          const data = await getAssignment(id);
          setAssignment(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id === 'new') {
        // Create new
      } else {
        await updateAssignment(id, assignment);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          ASSIGNMENT #{assignment.number}
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="GITHUB URL"
            value={assignment.githubUrl}
            onChange={(e) => setAssignment({...assignment, githubUrl: e.target.value})}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            label="BRANCH"
            value={assignment.branch}
            onChange={(e) => setAssignment({...assignment, branch: e.target.value})}
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel>STATUS</InputLabel>
            <Select
              value={assignment.status}
              label="STATUS"
              onChange={(e) => setAssignment({...assignment, status: e.target.value})}
            >
              <MenuItem value="Pending Submission">Pending Submission</MenuItem>
              <MenuItem value="Submitted">Submitted</MenuItem>
              <MenuItem value="In Review">In Review</MenuItem>
            </Select>
          </FormControl>
          
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" sx={{ mr: 2 }}>
              Submit
            </Button>
            <Button variant="outlined" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}