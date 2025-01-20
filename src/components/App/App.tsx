import { Routes, Route } from 'react-router-dom';

import './app.css';

import MainPage from '../../Pages/MainPage';
import TicketPage from '../../Pages/TicketPage';
import NotFoundPage from '../../Pages/NotFoundPage';

const App = () => {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="/ticket/:id" element={<TicketPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
