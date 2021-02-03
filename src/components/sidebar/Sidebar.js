import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import styles from './Sidebar.module.scss';
import { transfer } from '../../constants';

const Sidebar = ({ filter, setFilter }) => {

   const allHandler = (transferValue) => {
      let tempFilter = {...filter};
      tempFilter[transferValue] = !tempFilter[transferValue];
      if (transferValue === transfer.ALL) {
         tempFilter = Object.fromEntries(Object.keys(tempFilter).map((current) => {
            return [current, tempFilter[transferValue]];
         }));
      } else {
         if (Object.keys(tempFilter).some(key => tempFilter[key] === false)) {
            tempFilter[transfer.ALL] = false;
         }
         if (Object.keys(tempFilter).every(key => {
            if ( key === transfer.ALL ) return true;
            return tempFilter[key] === true;
         })) {
            tempFilter[transfer.ALL] = true;
         };
      };
      setFilter({...tempFilter});
   };

   return (
      <div className={styles.sidebar}>
         <h3>Количество пересадок</h3>
         <form>
            <label className={styles.label}>
               <input 
                  type="checkbox" 
                  className={styles.input} 
                  onChange={() => allHandler(transfer.ALL)}
                  checked={filter.all}
               />
               <span className={styles.checker}></span>
                  Все
            </label>
            <label className={styles.label}>
               <input 
                  type="checkbox" 
                  className={styles.input} 
                  onChange={() => allHandler(transfer.WITHOUT)}
                  checked={filter.without}
               />
               <span className={styles.checker}></span>
                  Без пересадок
            </label>
            <label className={styles.label}>
               <input 
                  type="checkbox" 
                  className={styles.input} 
                  onChange={() => allHandler(transfer.ONE)}
                  checked={filter.one}
               />
               <span className={styles.checker}></span>
                  1 пересадка
            </label>
            <label className={styles.label}>
               <input 
                  type="checkbox" 
                  className={styles.input} 
                  onChange={() => allHandler(transfer.TWO)}
                  checked={filter.two}
            />
               <span className={styles.checker}></span>
                  2 пересадки
            </label>
            <label className={styles.label}>
               <input 
                  type="checkbox" 
                  className={styles.input} 
                  onChange={() => allHandler(transfer.THREE)}
                  checked={filter.three}
            />
               <span className={styles.checker}></span>
                  3 пересадки
            </label>
         </form>
      </div>
   );
};

const mapStateToProps = ({ filter }) => {
   return {
      filter,
   };
};

export default connect(mapStateToProps, actions)(Sidebar);