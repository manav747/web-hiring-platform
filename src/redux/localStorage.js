// localStorage.js
export const loadState = () => {
    try {
      const serializedState = localStorage.getItem("state");
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.error("Could not load state from localStorage", err);
      return undefined;
    }
  };
  
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify({
        jobs: state.jobs,
        candidates: state.candidates,
        assessments: state.assesments,
      });
      localStorage.setItem("state", serializedState);
    } catch (err) {
      console.error("Could not save state to localStorage", err);
    }
  };
  