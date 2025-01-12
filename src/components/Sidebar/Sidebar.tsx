import { ChangeEvent, FC } from 'react';

import './sidebar.css';

import { SortByTypes } from '../../types/types';

interface ISidebarProps {
  noStopValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setSortBy: (sort: SortByTypes) => void;
  sortBy: SortByTypes;
}

const Sidebar: FC<ISidebarProps> = ({ noStopValueChange, setSortBy, sortBy }) => {
  const onSortValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSortBy(e.target.value as SortByTypes);
  };

  return (
    <aside className="sidebar">
      <label>
        <h3>Фильтрация</h3>
        <p>Без остановок</p>
        <input type="checkbox" onChange={noStopValueChange} />
      </label>
      <label>
        <h3>Сортировка</h3>
        <span>По цене: </span>
        <input
          type="radio"
          name="sort"
          value="price"
          checked={sortBy === 'price'}
          onChange={onSortValueChange}
        />
        <span>По длине перелёта: </span>
        <input
          type="radio"
          name="sort"
          value="duration"
          checked={sortBy === 'duration'}
          onChange={onSortValueChange}
        />
      </label>
    </aside>
  );
};

export default Sidebar;
