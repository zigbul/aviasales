import { ChangeEvent, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './app.css';

import { SearchedParams, SortByTypes } from '../../types/types';

import MainPage from '../../Pages/MainPage';
import TicketPage from '../../Pages/TicketPage';
import NotFoundPage from '../../Pages/NotFoundPage';

const App = () => {
  const [params, setParams] = useState<SearchedParams>({
    originLocationCode: 'JFK',
    destinationLocationCode: 'LAX',
    departureDate: new Date().toISOString().split('T')[0],
    adults: '1',
    currencyCode: 'RUB',
  });

  const [sortBy, setSortBy] = useState<SortByTypes>('price');

  const noStopValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setParams({ ...params, nonStop: e.target.checked });
  };

  return (
    <Routes>
      <Route
        index
        element={
          <MainPage
            params={params}
            setParams={setParams}
            noStopValueChange={noStopValueChange}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        }
      />
      <Route path="/ticket/:id" element={<TicketPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
