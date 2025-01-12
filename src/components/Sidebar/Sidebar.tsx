import { ChangeEvent, FC } from 'react';

import './sidebar.css';

interface ISidebarProps {
  noStopValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Sidebar: FC<ISidebarProps> = ({ noStopValueChange }) => {
  return (
    <aside className="sidebar">
      <label>
        Без остановок
        <input type="checkbox" onChange={noStopValueChange} />
      </label>
    </aside>
  );
};

export default Sidebar;
