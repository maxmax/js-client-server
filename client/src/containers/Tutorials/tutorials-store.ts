import { observable, makeObservable, action } from 'mobx';
import { toJS } from 'mobx';

const APP_API_SOURCE = import.meta.env.VITE_APP_API_SOURCE;

class TutorialsStore {
  state = "none";
  tutorialsData = [];
  tutorialData = null;
  notifications = null;

  constructor() {
    makeObservable(this, {
      state: observable,
      tutorialsData: observable,
      tutorialData: observable,
      notifications: observable,
      getTutorials: action.bound,
      getTutorial: action.bound,
      deleteTutorial: action.bound,
      createTutorial: action.bound,
      updateTutorial: action.bound,
    })
  }

  getTutorials() {
    const url = `${APP_API_SOURCE}/tutorials`;
    this.state = "pending";
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(result => {
        this.tutorialsData = result;
        this.state = "done";
      })
      .catch((response) => {
        console.log('error:', response)
        this.state = "error";
      });
  }

  getTutorial(id: number) {
    const url = `${APP_API_SOURCE}/tutorials/${id}`;
    this.state = "pending";
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(result => {
        this.tutorialData = result;
        this.state = "done";
      })
      .catch((response) => {
        console.log('error:', response)
        this.state = "error";
      });
  }

  deleteTutorial(id: number) {
    const url = `${APP_API_SOURCE}/tutorials/${id}`;
    this.state = "pending";
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(result => {
        this.notifications = result.message;
        this.getTutorials();
        this.state = "done";
      })
      .catch((response) => {
        console.log('error:', response)
        this.state = "error";
      });
  }

  createTutorial(data) {
    const url = `${APP_API_SOURCE}/tutorials`;
    this.state = "pending";
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        this.notifications = result.message;
        this.getTutorials();
        this.state = "done";
      })
      .catch((response) => {
        console.log('error:', response)
        this.state = "error";
      });
  }

  updateTutorial(data) {
    const url = `${APP_API_SOURCE}/tutorials/${data.id}`;
    this.state = "pending";
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description
      })
    })
      .then(response => response.json())
      .then(result => {
        this.notifications = result.message;
        this.getTutorials();
        this.state = "done";
      })
      .catch((response) => {
        console.log('error:', response)
        this.state = "error";
      });
  }

}

const tutorialsStore = new TutorialsStore();

export default tutorialsStore;
export { TutorialsStore };
