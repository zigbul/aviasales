import React from 'react';
import styles from './Tickets.module.scss';

const Tickets = ({ sortTickets }) => {
   return (
      <div className={styles.tickets}>
         {sortTickets.map(({id, price, carrier, segments}) => (
            <div className={styles.ticket} key={id}>
               <div className={styles['ticket__header']}>
                  <div className={styles['ticket__price']}>
                     {price}
                  </div>
                  <div className={styles['ticket__logo']}>
                     <img src={carrier} alt="avia logo" />
                  </div>
               </div> 
               <div className={styles['ticket__data-wrapper']}>
                  {segments.map(({id, out, outTime, timeInFlight, stops, stopCitys}) => (
                     <div className={styles['ticket__data']} key={id}>
                        <div className={styles['ticket__item']}>
                           <p className={styles['ticket__item-grey']}>{out}</p>
                           <p>
                              {outTime}
                           </p>
                        </div>
                        <div className={styles['ticket__item']}>
                           <p className={styles['ticket__item-grey']}>В пути</p>
                           <p>
                              {timeInFlight}</p>
                        </div>
                        <div className={styles['ticket__item']}>
                           <p className={styles['ticket__item-grey']}>
                              {stops}
                           </p>
                           <p>{stopCitys}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>))}
      </div>
   );
};

export default Tickets;