import { useState } from 'react';

import { SearchedParams } from '../../types/types';

import TicketsList from '../TicketList/index.tsx';

const App = () => {
  const [params, setParams] = useState<SearchedParams>({
    originLocationCode: 'JFK',
    destinationLocationCode: 'LAX',
    departureDate: new Date().toISOString().split('T')[0],
    adults: '1',
    currencyCode: 'RUB',
  });

  return (
    <div>
      <h2>Билеты</h2>
      <TicketsList params={params} />
    </div>
  );
};

export default App;
