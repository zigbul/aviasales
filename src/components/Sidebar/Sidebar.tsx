import { ChangeEvent, FC } from 'react';

import './sidebar.css';

import { SortByTypes } from '../../types/types.ts';
import { RootState } from '../../redux/store.ts';

import { setSortBy, nonStopValueChange } from '../../redux/slices/ticketsSlice.ts';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar: FC = () => {
  const { sortBy } = useSelector((state: RootState) => state.tickets);
  const dispatch = useDispatch();

  const onSortValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSortBy(e.target.value as SortByTypes));
  };

  return (
    <aside className="sidebar">
      <label>
        <h3>Фильтрация</h3>
        <p>Без остановок</p>
        <input type="checkbox" onChange={(e) => dispatch(nonStopValueChange(e.target.checked))} />
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
