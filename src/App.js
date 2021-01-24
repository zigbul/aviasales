import styles from './App.module.scss';
import logo from './assets/logo.svg';
import avialogo from './assets/avialogo.svg';

function App() {
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
              <div className={styles.ticket}>
                <div className={styles['ticket__header']}>
                  <div className={styles['ticket__price']}>13 400р</div>
                  <div className={styles['ticket__logo']}>
                    <img src={avialogo} alt="avia logo" />
                  </div>
                </div> 
                <div className={styles['ticket__data-wrapper']}>
                  <div className={styles['ticket__data']}>
                    <div className={styles['ticket__item']}>
                      <p className={styles['ticket__item-grey']}>MOW - HKT</p>
                      <p>10:45 - 08:00</p>
                    </div>
                    <div className={styles['ticket__item']}>
                      <p className={styles['ticket__item-grey']}>MOW - HKT</p>
                      <p>10:45 - 08:00</p>
                    </div>
                    <div className={styles['ticket__item']}>
                      <p className={styles['ticket__item-grey']}>MOW - HKT</p>
                      <p>10:45 - 08:00</p>
                    </div>
                  </div>
                  <div className={styles['ticket__data']}>
                    <div className={styles['ticket__item']}>
                      <p className={styles['ticket__item-grey']}>MOW - HKT</p>
                      <p>10:45 - 08:00</p>
                    </div>
                    <div className={styles['ticket__item']}>
                      <p className={styles['ticket__item-grey']}>MOW - HKT</p>
                      <p>10:45 - 08:00</p>
                    </div>
                    <div className={styles['ticket__item']}>
                      <p className={styles['ticket__item-grey']}>MOW - HKT</p>
                      <p>10:45 - 08:00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.ticket}>
                <div className={styles['ticket__header']}>
                  <div className={styles['ticket__price']}>13 400р</div>
                  <div className={styles['ticket__logo']}>
                    <img src={avialogo} alt="avia logo" />
                  </div>
                </div> 
                <div className={styles['ticket__data-wrapper']}>
                  <div className={styles['ticket__data']}>
                    <div className={styles['ticket__item']}>
                      <p className={styles['ticket__item-grey']}>MOW - HKT</p>
                      <p>10:45 - 08:00</p>
                    </div>
                    <div className={styles['ticket__item']}>
                      <p className={styles['ticket__item-grey']}>MOW - HKT</p>
                      <p>10:45 - 08:00</p>
                    </div>
                    <div className={styles['ticket__item']}>
                      <p className={styles['ticket__item-grey']}>MOW - HKT</p>
                      <p>10:45 - 08:00</p>
                    </div>
                  </div>
                  <div className={styles['ticket__data']}>
                    <div className={styles['ticket__item']}>
                      <p className={styles['ticket__item-grey']}>MOW - HKT</p>
                      <p>10:45 - 08:00</p>
                    </div>
                    <div className={styles['ticket__item']}>
                      <p className={styles['ticket__item-grey']}>MOW - HKT</p>
                      <p>10:45 - 08:00</p>
                    </div>
                    <div className={styles['ticket__item']}>
                      <p className={styles['ticket__item-grey']}>MOW - HKT</p>
                      <p>10:45 - 08:00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.ticket}>
                <div className={styles['ticket__header']}>
                  <div className={styles['ticket__price']}>13 400р</div>
                  <div className={styles['ticket__logo']}>
                    <img src={avialogo} alt="avia logo" />
                  </div>
                </div> 
                <div className={styles['ticket__data-wrapper']}>
                  <div className={styles['ticket__data']}>
                    <div className={styles['ticket__item']}>
                      <p className={styles['ticket__item-grey']}>MOW - HKT</p>
                      <p>10:45 - 08:00</p>
                    </div>
                    <div className={styles['ticket__item']}>
                      <p className={styles['ticket__item-grey']}>MOW - HKT</p>
                      <p>10:45 - 08:00</p>
                    </div>
                    <div className={styles['ticket__item']}>
                      <p className={styles['ticket__item-grey']}>MOW - HKT</p>
                      <p>10:45 - 08:00</p>
                    </div>
                  </div>
                  <div className={styles['ticket__data']}>
                    <div className={styles['ticket__item']}>
                      <p className={styles['ticket__item-grey']}>MOW - HKT</p>
                      <p>10:45 - 08:00</p>
                    </div>
                    <div className={styles['ticket__item']}>
                      <p className={styles['ticket__item-grey']}>MOW - HKT</p>
                      <p>10:45 - 08:00</p>
                    </div>
                    <div className={styles['ticket__item']}>
                      <p className={styles['ticket__item-grey']}>MOW - HKT</p>
                      <p>10:45 - 08:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
