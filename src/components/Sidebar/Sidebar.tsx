import { ChangeEvent, FC } from 'react';

import './Sidebar.scss';

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
      <label className="sidebar__checkbox-label">
        <h3 className="sidebar__title">Фильтрация</h3>
        <span className="sidebar__subtitle">Без остановок</span>
        <input
          className="sidebar__chekbox-input"
          type="checkbox"
          onChange={(e) => dispatch(nonStopValueChange(e.target.checked))}
        />
      </label>
      <label className="sidebar__radio-label">
        <h3 className="sidebar__title">Сортировка</h3>
        <span className="sidebar__subtitle">По цене: </span>
        <input
          className="sidebar__radio-input"
          type="radio"
          name="sort"
          value="price"
          checked={sortBy === 'price'}
          onChange={onSortValueChange}
        />
        <span className="sidebar__subtitle">По длине перелёта: </span>
        <input
          className="sidebar__radio-input"
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
