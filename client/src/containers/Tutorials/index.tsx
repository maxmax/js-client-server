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

interface TutorialProps {
  id: number;
  createdAt: string;
  title: string;
  description: string;
}

interface TutorialsStoreProps {
  state: string;
  tutorialsData: TutorialProps[];
  getTutorials: Function;
  deleteTutorial: Function;
  createTutorial: Function;
  notifications: string;
}

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

  useEffect(() => {
    !tutorialsData[0] && getTutorials();
  }, [tutorialsData, getTutorials]);

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
          {!tutorialsData[0] && state === "pending" && ( <CircularProgress /> )}
          {tutorialsData[0] && state === "done" && tutorialsData?.map((item, i) => (
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
