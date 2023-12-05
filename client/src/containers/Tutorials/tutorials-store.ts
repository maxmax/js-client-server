import { observable, makeObservable, action } from 'mobx';
import { toJS } from 'mobx';

const APP_API_SOURCE = import.meta.env.VITE_APP_API_SOURCE;
// console.log('VITE_APP_API_SOURCE--', VITE_APP_API_SOURCE);

class TutorialsStore {
  tutorialsData = [];
  state = "none";

  constructor() {
    makeObservable(this, {
      tutorialsData: observable,
      state: observable,
      getTutorials: action.bound,
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

}

const tutorialsStore = new TutorialsStore();

export default tutorialsStore;
export { TutorialsStore };
