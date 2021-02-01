import React from 'react';
import styles from './Spinner.module.scss';

const Spinner = () => {
   return (
      <div className={styles.spinner}>
         <h2>Loading...</h2>
      </div>
   )
}

export default Spinner;