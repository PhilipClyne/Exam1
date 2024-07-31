import { configureStore } from "@reduxjs/toolkit";
import chemicalReducer from "../features/chemicalSlice";
import { loadState, saveState } from "../utils/localStorage";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    chemicals: chemicalReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
