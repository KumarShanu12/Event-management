import { combineReducers } from '@reduxjs/toolkit';
import eventsReducer from './eventsSlice';

const rootReducer = combineReducers({
  events: eventsReducer,
  // Add more reducers if needed
});

export default rootReducer;
