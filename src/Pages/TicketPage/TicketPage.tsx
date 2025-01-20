import { useNavigate, useParams } from 'react-router-dom';

const TicketPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <h2>Ticket Page with ID: {id}</h2>
      <button onClick={() => navigate(-1)}>Назад</button>
    </div>
  );
};

export default TicketPage;
