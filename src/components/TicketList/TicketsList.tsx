import { FC } from 'react';
import { useSelector } from 'react-redux';

import './ticket-list.css';

import Ticket from '../Ticket';

import convertDurationInMinutes from '../../utils/convertDurationInMinutes.ts';
import { RootState } from '../../redux/store.ts';

const TicketsList: FC = () => {
  const { tickets, loading, sortBy } = useSelector((state: RootState) => state.tickets);

  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortBy === 'duration') {
      const firstDuration: number = convertDurationInMinutes(a.itineraries[0].duration);
      const secondDuration: number = convertDurationInMinutes(b.itineraries[0].duration);

      return firstDuration - secondDuration;
    }

    if (sortBy === 'price') {
      return parseInt(a.price.total, 10) - parseInt(b.price.total, 10);
    }

    return 0;
  });

  if (loading) return <h2>Loading...</h2>;

  return (
    <ul>
      {sortedTickets.map((ticket) => (
        <Ticket key={ticket.id} {...ticket} />
      ))}
    </ul>
  );
};

export default TicketsList;
