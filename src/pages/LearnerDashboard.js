import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { getAssignments } from '../services/api';

export default function LearnerDashboard() {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAssignments();
        setAssignments(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const groupByStatus = (status) => {
    return assignments.filter(a => a.status === status);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        LEARNER DASHBOARD
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => navigate('/assignment/new')}
      >
        Submit New Assignment
      </Button>

      <Typography variant="h6" sx={{ mt: 4 }}>Needs Submission</Typography>
      <Grid container spacing={2}>
        {groupByStatus('Pending Submission').map(assignment => (
          <Grid item xs={12} sm={6} md={4} key={assignment.id}>
            <AssignmentCard assignment={assignment} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ mt: 4 }}>In Review</Typography>
      <Grid container spacing={2}>
        {groupByStatus('In Review').map(assignment => (
          <Grid item xs={12} sm={6} md={4} key={assignment.id}>
            <AssignmentCard assignment={assignment} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

function AssignmentCard({ assignment }) {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardContent>
        <Typography>Assignment #{assignment.number}</Typography>
        <Typography>{assignment.status}</Typography>
        <Button onClick={() => navigate(`/assignment/${assignment.id}`)}>
          View
        </Button>
      </CardContent>
    </Card>
  );
}