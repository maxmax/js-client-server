import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from 'dayjs';
import {
  Container,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import Footer from '../../components/Footer';

import { TutorialProps } from './types';

interface TutorialsStoreProps {
  state: string;
  tutorialData: TutorialProps;
  getTutorial: Function;
}

interface TutorialsProps {
  tutorialsStore: TutorialsStoreProps;
}

function Tutorial({ tutorialsStore }: TutorialsProps) {

  // but globally need to upgrade connected-react-router
  const { id } = useParams();

  const {
    state,
    tutorialData,
    getTutorial
  } = tutorialsStore;

  useEffect(() => {
    !tutorialData && getTutorial(id);
  }, [tutorialData, getTutorial]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ m: 4, minHeight: '82vh' }}>
        {!tutorialData && state === "pending" && (
          <Box sx={{ display: 'grid', minHeight: '82vh', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
        {!!tutorialData && state === "done" &&
          <>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              {tutorialData?.title}
            </Typography>
            <Typography variant="overline" display="block" align="center" gutterBottom>
              {dayjs(tutorialData?.createdAt).format('DD-MM-YYYY')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {tutorialData?.description}
            </Typography>
          </>
        }
      </Box>
      <Footer />
    </Container>
  );
}

export default inject("tutorialsStore")(observer(Tutorial));
