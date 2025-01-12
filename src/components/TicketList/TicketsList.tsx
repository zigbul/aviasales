import { FC } from 'react';
import './ticket-list.css';

import { ITicketData, SearchedParams, SortByTypes } from '../../types/types';

import useFetchTickets from '../../hooks/useFetchTickets.tsx';

import formatDuration from '../../utils/formatDuration.ts';
import convertDurationInMinutes from '../../utils/convertDurationInMinutes.ts';

type TicketListProps = {
  params: SearchedParams;
  sortBy: SortByTypes;
};

const TicketListItem: FC<ITicketData> = ({ price, validatingAirlineCodes, itineraries }) => {
  return (
    <li className="ticket-list__item ticket">
      <header className="ticket__header">
        <h3>
          {price.total} {price.currency}
        </h3>
        <p>Aвиакомпания: {validatingAirlineCodes[0]}</p>
      </header>

      {itineraries.map((itinerary, i) => (
        <section key={i} className="ticket__itinerary">
          <ul className="ticket__segment-list">
            {itinerary.segments.map((segment, j) => (
              <li key={j} className="ticket__segment-list-item">
                <div className="ticket__segment-list-column">
                  <div className="ticket__segment-title">
                    {segment.departure.iataCode} - {segment.arrival.iataCode}
                  </div>
                  <div>
                    {segment.departure.at} - {segment.arrival.at}
                  </div>
                </div>
                <div className="ticket__segment-list-column">
                  <div className="ticket__segment-title">В пути</div>
                  <div>{formatDuration(segment.duration)}</div>
                </div>
                <div className="ticket__segment-list-column">
                  <div className="ticket__segment-title">{segment.numberOfStops} пересадки</div>
                  <div>{segment.carrierCode}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </li>
  );
};

const TicketsList: FC<TicketListProps> = ({ params, sortBy }) => {
  const { tickets, loading } = useFetchTickets(params);

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
        <TicketListItem key={ticket.id} {...ticket} />
      ))}
    </ul>
  );
};

export default TicketsList;
