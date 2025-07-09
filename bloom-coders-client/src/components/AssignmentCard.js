import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AssignmentCard = ({ assignment }) => {
  const navigate = useNavigate();

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">Assignment #{assignment.number}</Typography>
        <Typography variant="body2">Status: {assignment.status}</Typography>
        <Button
          size="small"
          onClick={() => navigate(`/assignment/${assignment.id}`)}
          sx={{ mt: 1 }}
        >
          View/Edit
        </Button>
      </CardContent>
    </Card>
  );
};

export default AssignmentCard;