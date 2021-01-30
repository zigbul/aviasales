import React from 'react';
import styles from './Filter.module.scss';

const Filter = ({ sorterActive, sorterHandle }) => {
   return (
      <div className={styles.filter}>
         <div 
            className={sorterActive.lowprice ? styles['filter__low-price_blue'] : styles['filter__low-price'] }
            onClick={() => sorterHandle("lowprice")}
         >
            Самый дешевый
         </div>
         <div 
            className={sorterActive.faster ? styles['filter__faster_blue'] : styles['filter__faster'] }
            onClick={() => sorterHandle("faster")}
         >
            Самый быстрый
         </div>
      </div>
   )
}

export default Filter;