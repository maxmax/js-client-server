import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { useEffect } from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from '../../components/Footer';
import BasicCard from '../../components/BasicCard';

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
}

interface TutorialsProps {
  tutorialsStore: TutorialsStoreProps;
}

function Tutorials({ tutorialsStore }: TutorialsProps) {

  const {
    state,
    tutorialsData,
    getTutorials
  } = tutorialsStore;

  useEffect(() => {
    !tutorialsData[0] && getTutorials();
  }, [tutorialsData, getTutorials]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Tutorials
        </Typography>
        <Box sx={{ display: 'grid', minHeight: '70vh', alignItems: 'center', justifyContent: 'center' }}>
          {!tutorialsData[0] && state === "pending" && ( <CircularProgress /> )}
          {tutorialsData[0] && state === "done" && tutorialsData?.map((item, i) => (
            <BasicCard key={`${i}-tutorialsData`} {...item} />
          ))}
        </Box>
      </Box>
      <Footer />
    </Container>
  );
}

export default inject("tutorialsStore")(observer(Tutorials));
