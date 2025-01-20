import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

import formatDuration from '../../utils/formatDuration';
import BookingForm from '../../components/BookingForm';

const TicketPage = () => {
  const selectedTicket = useSelector((state: RootState) => state.tickets.selectedTicket);
  const navigate = useNavigate();

  if (!selectedTicket) {
    return (
      <>
        <h2>Такого перелёта не существует</h2>
        <button onClick={() => navigate(-1)}>Назад</button>
      </>
    );
  }

  const {
    price: { total, currency },
    itineraries,
    validatingAirlineCodes,
  } = selectedTicket;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Назад</button>
      <h1>Детали рейса</h1>
      <p>
        <strong>Цена:</strong> {total} {currency}
      </p>
      {itineraries.map((itinerary, index) => (
        <div key={index}>
          <h2>Маршрут {index + 1}</h2>
          <p>
            <strong>Общее время в пути:</strong> {formatDuration(itinerary.duration)}
          </p>
          {itinerary.segments.map((segment, idx) => (
            <div
              key={idx}
              style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <p>
                <strong>Из:</strong> {segment.departure.iataCode} (
                {new Date(segment.departure.at).toLocaleString()})
              </p>
              <p>
                <strong>В:</strong> {segment.arrival.iataCode} (
                {new Date(segment.arrival.at).toLocaleString()})
              </p>
              <p>
                <strong>Перевозчик:</strong> {segment.carrierCode}
              </p>
              <p>
                <strong>Время в пути:</strong> {formatDuration(segment.duration)}
              </p>
              <p>
                <strong>Пересадок:</strong> {segment.numberOfStops}
              </p>
            </div>
          ))}
        </div>
      ))}
      <p>
        <strong>Авиакомпания:</strong> {validatingAirlineCodes.join(', ')}
      </p>

      <h2>Забронировать рейс</h2>

      <BookingForm />
    </div>
  );
};

export default TicketPage;
