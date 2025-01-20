import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

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

  return (
    <div>
      <h2>Ticket Page with ID: {selectedTicket.id}</h2>
      <button onClick={() => navigate(-1)}>Назад</button>
    </div>
  );
};

export default TicketPage;
