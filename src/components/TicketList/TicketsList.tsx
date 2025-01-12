import { FC } from 'react';
import './ticket-list.css';

import { ITicketData, SearchedParams } from '../../types/types';

import useFetchTickets from '../../hooks/useFetchTickets.tsx';

import formatDuration from '../../utils/formatDuration.ts';

type TicketListProps = {
  params: SearchedParams;
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

const TicketsList: FC<TicketListProps> = ({ params }) => {
  const { tickets, loading } = useFetchTickets(params);

  if (loading) return <h2>Loading...</h2>;

  return (
    <ul>
      {tickets.map((ticket) => (
        <TicketListItem key={ticket.id} {...ticket} />
      ))}
    </ul>
  );
};

export default TicketsList;
