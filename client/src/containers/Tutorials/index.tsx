import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Button,
  ButtonGroup
} from '@mui/material';

import Footer from '../../components/Footer';
import ModalDialog from '../../components/ModalDialog';
import TutorialCard from './components/TutorialCard';
import TutorialNew from './components/TutorialNew';
import TutorialEdit from './components/TutorialEdit';

import { TutorialsStoreProps } from './types';

interface TutorialsProps {
  tutorialsStore: TutorialsStoreProps;
}

function Tutorials({ tutorialsStore }: TutorialsProps) {

  const {
    state,
    tutorialsData,
    getTutorials,
    deleteTutorial,
    createTutorial,
    updateTutorial,
    notifications
  } = tutorialsStore;

  const [tutorialEditOpen, setTutorialEditOpen] = useState(null);
  const [tutorialNewOpen, setTutorialNewOpen] = useState(false);

  // this to hook
  useEffect(() => {
    const currentState = state === "done" || state === "error";
    !currentState && getTutorials();
  }, [tutorialsData, getTutorials, state]);

  if (!!notifications) {
    console.log('notifications:', notifications)
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ m: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Tutorials
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 2 }}>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button onClick={() => getTutorials()}>All</Button>
            <Button onClick={() => setTutorialNewOpen(true)}>New</Button>
          </ButtonGroup>
        </Box>
        <Box sx={{ display: 'grid', minHeight: '70vh', alignItems: 'center', justifyContent: 'center' }}>
          {!tutorialsData?.length && state === "pending" && ( <CircularProgress /> )}
          {tutorialsData?.length && state === "done" && tutorialsData?.map((item, i) => (
            <TutorialCard
              key={`${i}-tutorialsData`}
              {...item}
              editTutorial={setTutorialEditOpen}
              deleteTutorial={deleteTutorial}
            />
          ))}
        </Box>
      </Box>
      {!!tutorialEditOpen &&
        <ModalDialog parentOpen={!!tutorialEditOpen} setParentOpen={() => setTutorialEditOpen(null)}>
          <TutorialEdit update={(newValues) => updateTutorial({id: tutorialEditOpen, ...newValues})} values={{}} />
        </ModalDialog>
      }
      {tutorialNewOpen &&
        <ModalDialog parentOpen={!!tutorialNewOpen} setParentOpen={setTutorialNewOpen}>
          <TutorialNew create={createTutorial} />
        </ModalDialog>
      }
      <Footer />
    </Container>
  );
}

export default inject("tutorialsStore")(observer(Tutorials));
