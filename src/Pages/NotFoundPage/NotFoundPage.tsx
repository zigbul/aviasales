import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      Not Found Page
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default NotFoundPage;
