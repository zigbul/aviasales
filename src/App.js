import React, { useState, useEffect } from 'react';
import logo from './assets/logo.svg';
import { ticketNormalize } from './helper';
import styles from './App.module.scss';

function App() {
  const [searchId, setSearchId] = useState();
  const [tickets, setTickets] = useState([]);
  const [stop, setStop] = useState(false);
  const [sortTickets, setSortTickets] = useState([]);

  useEffect(() => {
    if (stop === true) {
      setSortTickets(ticketNormalize(tickets.slice(0, 5)));
    }
  }, [stop, tickets])

  useEffect(() => {
    fetch("https://front-test.beta.aviasales.ru/search")
      .then((res) => res.json())
      .then((res) => {
        setSearchId(res.searchId);
    })
      .catch(e =>console.log(e));
  }, []);

  useEffect(() => {
    if(searchId && stop === false) {
      function subscribe() {
        fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
          .then(res => { 
            if(res.status === 500) {
              subscribe();
            }
            return res.json();
          })
          .then(ticketsPart => {
            if(ticketsPart.stop) {
              setStop(true);
            }
            setTickets([...tickets, ...ticketsPart.tickets]);
          })
          .catch((e) => console.log(e));
      }
      subscribe();
    }
  }, [searchId, tickets, stop]);

  return (
    <div className={styles.app}>
        <div className={styles['app-wrapper']}>
          <div className={styles.header}>
            <img className={styles.logo}src={logo} width="60px" height="60px" alt="logo" />
          </div>
          <div className={styles.main}>
            <div className={styles['sidebar-wrapper']}>
              <div className={styles.sidebar}>
                <h3>Количество пересадок</h3>
                <form>
                  <label className={styles.label}>
                    <input type="checkbox" className={styles.input} />
                    <span className={styles.checker}></span>
                    Все
                  </label>
                  <label className={styles.label}>
                    <input type="checkbox" className={styles.input} />
                    <span className={styles.checker}></span>
                    Без пересадок
                  </label>
                  <label className={styles.label}>
                    <input type="checkbox" className={styles.input} />
                    <span className={styles.checker}></span>
                    1 пересадка
                  </label>
                  <label className={styles.label}>
                    <input type="checkbox" className={styles.input} />
                    <span className={styles.checker}></span>
                    2 пересадки
                  </label>
                  <label className={styles.label}>
                    <input type="checkbox" className={styles.input} />
                    <span className={styles.checker}></span>
                    3 пересадки
                  </label>
                </form>
              </div>
            </div>
              <div className={styles.filter}>
                <div className={ styles['filter__low-price'] }>Самый дешевый</div>
                <div className={ styles['filter__faster'] }>Самый быстрый</div>
              </div>
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
          </div>
        </div>
      </div>
  );
};

export default App;