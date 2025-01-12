import { ChangeEvent, useState } from 'react';

import './app.css';

import { SearchedParams } from '../../types/types';

import TicketsList from '../TicketList/index.tsx';
import Sidebar from '../Sidebar/Sidebar.tsx';

const App = () => {
  const [params, setParams] = useState<SearchedParams>({
    originLocationCode: 'JFK',
    destinationLocationCode: 'LAX',
    departureDate: new Date().toISOString().split('T')[0],
    adults: '1',
    currencyCode: 'RUB',
  });

  const noStopValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setParams({ ...params, nonStop: e.target.checked });
  };

  return (
    <div className="app">
      <Sidebar noStopValueChange={noStopValueChange} />
      <main className="app__main">
        <h2>Билеты</h2>
        <TicketsList params={params} />
      </main>
    </div>
  );
};

export default App;
