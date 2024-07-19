import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  // Example initial state, actual state may vary
  {
    id: '1',
    eventName: 'Sample Event',
    eventType: 'general',
    startDate: '2024-07-01',
    endDate: '2024-07-03',
    description: 'This is a sample event.',
    handledBy: 'John Doe',
    organisation: 'ABC Events',
    totalSubEvents: 3,
  },
];

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent(state, action) {
        // state= [...state, action.payload]
      state.push(action.payload);
    },
    editEvent(state, action) {
      const { id, updatedEvent } = action.payload;
      const eventIndex = state.findIndex((event) => event.id === id);
      if (eventIndex !== -1) {
        state[eventIndex] = { ...state[eventIndex], ...updatedEvent };
      }
    },
    deleteEvent(state, action) {
      const eventId = action.payload;
      return state.filter((event) => event.id !== eventId);
    },
  },
});

export const { addEvent, editEvent, deleteEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
