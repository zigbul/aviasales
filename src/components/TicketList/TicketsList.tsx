import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import './ticket-list.css';

import { ITicketData } from '../../types/types.ts';

import formatDuration from '../../utils/formatDuration.ts';
import formatDateAndTime from '../../utils/formatDateAndTime.ts';
import convertDurationInMinutes from '../../utils/convertDurationInMinutes.ts';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { selectTicket } from '../../redux/slices/ticketsSlice.ts';

const TicketListItem: FC<ITicketData> = ({ id, price, validatingAirlineCodes, itineraries }) => {
  const dispatch = useDispatch<AppDispatch>();

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
                    {formatDateAndTime(segment.departure.at)} -{' '}
                    {formatDateAndTime(segment.arrival.at)}
                  </div>
                </div>
                <div className="ticket__segment-list-column">
                  <div className="ticket__segment-title">В пути</div>
                  <div>{formatDuration(segment.duration)}</div>
                </div>
                <div className="ticket__segment-list-column">
                  <div className="ticket__segment-title">Пересадки: {segment.numberOfStops}</div>
                  <div>{segment.carrierCode}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <Link onClick={() => dispatch(selectTicket(id))} to={`/ticket/${id}`}>
        Подробнее
      </Link>
    </li>
  );
};

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
        <TicketListItem key={ticket.id} {...ticket} />
      ))}
    </ul>
  );
};

export default TicketsList;
