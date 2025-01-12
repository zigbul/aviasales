import { useState } from 'react';

import useFetchTickets from './hooks/useFetchTickets.tsx';
import { SearchedParams } from './types/types';

const App = () => {
  const [params, setParams] = useState<SearchedParams>({
    originLocationCode: 'JFK',
    destinationLocationCode: 'LAX',
    departureDate: new Date().toISOString().split('T')[0],
    adults: '1',
    currencyCode: 'RUB',
  });

  const { tickets, loading } = useFetchTickets(params);

  console.log(tickets);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Билеты</h2>
      <ul>App</ul>
    </div>
  );
};

export default App;
