import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

const LearnerAssignmentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState({
    number: '',
    githubUrl: '',
    branch: '',
    status: 'Pending Submission'
  });

  useEffect(() => {
    if (id !== 'new') {
      const fetchAssignment = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:8080/api/assignments/${id}`, {
            headers: { Authorization: token }
          });
          setAssignment(response.data.assignment);
        } catch (error) {
          console.error('Failed to fetch assignment:', error);
        }
      };
      fetchAssignment();
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (id === 'new') {
        await axios.post('http://localhost:8080/api/assignments', assignment, {
          headers: { Authorization: token }
        });
      } else {
        await axios.put(`http://localhost:8080/api/assignments/${id}`, assignment, {
          headers: { Authorization: token }
        });
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to save assignment:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {id === 'new' ? 'Create New Assignment' : `ASSIGNMENT #${assignment.number}`}
        </Typography>

        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="GitHub URL"
            value={assignment.githubUrl}
            onChange={(e) => setAssignment({...assignment, githubUrl: e.target.value})}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Branch"
            value={assignment.branch}
            onChange={(e) => setAssignment({...assignment, branch: e.target.value})}
          />
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/dashboard')}
            >
              BACK TO DASHBOARD
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
            >
              {id === 'new' ? 'SUBMIT' : 'UPDATE'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LearnerAssignmentView;