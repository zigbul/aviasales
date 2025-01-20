import { FC, ChangeEvent } from 'react';

import { SearchedParams, SortByTypes } from '../../types/types';

import SearchBar from '../../components/SearchBar';
import Sidebar from '../../components/Sidebar';
import TicketsList from '../../components/TicketList';

type MainPageProps = {
  params: SearchedParams;
  setParams: (params: SearchedParams) => void;
  noStopValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
  sortBy: SortByTypes;
  setSortBy: (sortBy: SortByTypes) => void;
};

const MainPage: FC<MainPageProps> = ({
  params,
  setParams,
  noStopValueChange,
  setSortBy,
  sortBy,
}) => {
  return (
    <div className="app">
      <header>
        <SearchBar params={params} setParams={setParams} />
      </header>
      <div className="app__container">
        <Sidebar noStopValueChange={noStopValueChange} setSortBy={setSortBy} sortBy={sortBy} />
        <main className="app__main">
          <h2>Билеты</h2>
          <TicketsList params={params} sortBy={sortBy} />
        </main>
      </div>
    </div>
  );
};

export default MainPage;
