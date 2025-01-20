import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITicketData, SearchedParams, SortByTypes } from '../../types/types';

import fetchAccessToken from '../../utils/fetchAccessToken';
import createUrl from '../../utils/createUrl.ts';
import normalizeTicketData from '../../utils/normalizeTicketData.ts';

interface ITicketsState {
  tickets: ITicketData[];
  loading: boolean;
  error: string | null;
  selectedTicket: ITicketData | null;
  sortBy: SortByTypes;
  params: SearchedParams;
}

const initialState: ITicketsState = {
  tickets: [],
  loading: false,
  error: null,
  selectedTicket: null,
  sortBy: 'price',
  params: {
    originLocationCode: 'JFK',
    destinationLocationCode: 'LAX',
    departureDate: new Date().toISOString().split('T')[0],
    adults: '1',
    currencyCode: 'RUB',
  },
};

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (params: SearchedParams, { rejectWithValue }) => {
    try {
      const accessToken = await fetchAccessToken();
      const header = `Bearer ${accessToken}`;
      const url = createUrl(params);

      const response = await fetch(url, {
        headers: {
          Authorization: header,
          'Content-Type': 'application/json',
        },
      });

      const { data } = await response.json();
      const normalizedTicketData = normalizeTicketData(data);
      return normalizedTicketData;
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }

      return rejectWithValue('Что-то пошло не так...');
    }
  },
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setTickets(state, action: PayloadAction<ITicketData[]>) {
      state.tickets = action.payload;
    },
    selectTicket(state, action: PayloadAction<string>) {
      state.selectedTicket = state.tickets.find((ticket) => ticket.id === action.payload) || null;
    },
    clearSelectedTicket(state) {
      state.selectedTicket = null;
    },
    setSortBy(state, action: PayloadAction<SortByTypes>) {
      state.sortBy = action.payload;
    },
    setParams(state, action: PayloadAction<SearchedParams>) {
      state.params = { ...state.params, ...action.payload };
    },
    nonStopValueChange(state, action: PayloadAction<boolean>) {
      state.params = { ...state.params, nonStop: action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action: PayloadAction<ITicketData[]>) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setTickets,
  selectTicket,
  clearSelectedTicket,
  setSortBy,
  setParams,
  nonStopValueChange,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
