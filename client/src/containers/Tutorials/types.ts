export type TutorialProps = {
  id: number;
  createdAt: string;
  title: string;
  description: string;
};

export type TutorialsStoreProps = {
  state: string;
  tutorialsData: TutorialProps[];
  getTutorials: Function;
  deleteTutorial: Function;
  createTutorial: Function;
  updateTutorial: Function;
  notifications: string;
};
