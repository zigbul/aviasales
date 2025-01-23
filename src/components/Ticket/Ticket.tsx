import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ITicketData } from '../../types/types.ts';

import formatDuration from '../../utils/formatDuration.ts';
import formatDateAndTime from '../../utils/formatDateAndTime.ts';
import { AppDispatch } from '../../redux/store.ts';
import { selectTicket } from '../../redux/slices/ticketsSlice.ts';

const Ticket: FC<ITicketData> = ({ id, price, validatingAirlineCodes, itineraries }) => {
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

export default Ticket;
