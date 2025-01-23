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
    <article className="main">
      <header className="main__header">
        <SearchBar />
      </header>
      <div className="main__container">
        <Sidebar />
        <main className="main__content">
          <h1 className="main__title">Билеты</h1>
          <TicketsList />
        </main>
      </div>
    </article>
  );
};

export default MainPage;
