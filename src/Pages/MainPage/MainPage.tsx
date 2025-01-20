import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../redux/store.ts';

import SearchBar from '../../components/SearchBar';
import Sidebar from '../../components/Sidebar';
import TicketsList from '../../components/TicketList';

import { fetchTickets } from '../../redux/slices/ticketsSlice';

const MainPage: FC = () => {
  const { params } = useSelector((state: RootState) => state.tickets);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTickets(params));
  }, [params, dispatch]);

  return (
    <div className="app">
      <header>
        <SearchBar />
      </header>
      <div className="app__container">
        <Sidebar />
        <main className="app__main">
          <h2>Билеты</h2>
          <TicketsList />
        </main>
      </div>
    </div>
  );
};

export default MainPage;
