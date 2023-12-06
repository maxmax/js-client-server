import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

interface TutorialNewProps {
  create: Function;
}

export default function TutorialNew({ create }: TutorialNewProps) {

  const [attributes, setAttributes] = useState({
    title: '',
    description: ''
  });

  const handleChangeAttributes = (e) => {
    setAttributes({
      ...attributes,
      [e.target.name]: e.target.value
    });
  };

  const updateChanges = () => {
    create(attributes);
  }

  return (
    <Box
      component="form"
      sx={{
        minWidth: 400,
        '& > :not(style)': { mb: 2 },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5" gutterBottom>
        Create Tutorial
      </Typography>
      <TextField
        fullWidth
        id="tutorial-new-title"
        label="Title"
        variant="standard"
        name={'title'}
        value={attributes['title']}
        onChange={handleChangeAttributes}
      />
      <TextField
        fullWidth
        id="tutorial-new-description"
        label="Description"
        variant="standard"
        name={'description'}
        value={attributes['description']}
        onChange={handleChangeAttributes}
      />
      <Box sx={{pt: 2}}>
        <Button onClick={() => updateChanges()} variant="contained" color="success">
          Create
        </Button>
      </Box>
    </Box>
  );
}
