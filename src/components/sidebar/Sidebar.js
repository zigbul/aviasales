import React from 'react';
import styles from './Sidebar.module.scss';

const Sidebar = ({allHandler, filter}) => {
   return (
      <div className={styles.sidebar}>
         <h3>Количество пересадок</h3>
         <form>
            <label className={styles.label}>
               <input 
                  type="checkbox" 
                  className={styles.input} 
                  onChange={() => allHandler("all")}
                  checked={filter.all}
               />
               <span className={styles.checker}></span>
                  Все
            </label>
            <label className={styles.label}>
               <input 
                  type="checkbox" 
                  className={styles.input} 
                  onChange={() => allHandler("without")}
                  checked={filter.without}
               />
               <span className={styles.checker}></span>
                  Без пересадок
            </label>
            <label className={styles.label}>
               <input 
                  type="checkbox" 
                  className={styles.input} 
                  onChange={() => allHandler("one")}
                  checked={filter.one}
               />
               <span className={styles.checker}></span>
                  1 пересадка
            </label>
            <label className={styles.label}>
               <input 
                  type="checkbox" 
                  className={styles.input} 
                  onChange={() => allHandler("two")}
                  checked={filter.two}
            />
               <span className={styles.checker}></span>
                  2 пересадки
            </label>
            <label className={styles.label}>
               <input 
                  type="checkbox" 
                  className={styles.input} 
                  onChange={() => allHandler("three")}
                  checked={filter.three}
            />
               <span className={styles.checker}></span>
                  3 пересадки
            </label>
         </form>
      </div>
   )
}

export default Sidebar;