import { ChangeEvent, useState } from 'react';

import './app.css';

import { SearchedParams, SortByTypes } from '../../types/types';

import TicketsList from '../TicketList';
import Sidebar from '../Sidebar';
import SearchBar from '../SearchBar';

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
    <div className="app">
      <header>
        <SearchBar params={params} setParams={setParams} />
      </header>
      <div className="app__container">
        <Sidebar noStopValueChange={noStopValueChange} setSortBy={setSortBy} sortBy={sortBy} />
        <main className="app__main">
          <h2>Билеты</h2>
          <TicketsList params={params} sortBy={sortBy} />
        </main>
      </div>
    </div>
  );
};

export default App;
