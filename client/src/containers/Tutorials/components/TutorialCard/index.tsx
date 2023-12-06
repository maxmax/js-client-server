import * as React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface BasicCardProps {
  id: number;
  createdAt: string;
  title: string;
  description: string;
  editTutorial: Function;
  deleteTutorial: Function;
}

export default function TutorialCard({ id, createdAt, title, description, editTutorial, deleteTutorial }: BasicCardProps) {
  return (
    <Card sx={{ minWidth: 275, m: 1 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {dayjs(createdAt).format('DD-MM-YYYY')}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={'/tutorials/' + id} size="small">Learn More</Button>
        {/* For Current user post */}
        <Button onClick={() => editTutorial(id)} size="small">Edit</Button>
        <Button onClick={() => deleteTutorial(id)} size="small" color="error">Delete</Button>
      </CardActions>
    </Card>
  );
}
