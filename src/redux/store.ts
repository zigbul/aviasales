import { configureStore } from '@reduxjs/toolkit';

import ticketsReducer from './slices/ticketsSlice.ts';

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
