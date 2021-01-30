import React, { useState, useEffect, useCallback } from 'react';
import logo from './assets/logo.svg';
import { ticketNormalize } from './helper';
import styles from './App.module.scss';
import Sidebar from './components/sidebar';
import Filter from './components/filter';
import Tickets from './components/tickets';

function App() {
  
  const [searchId, setSearchId] = useState();
  const [tickets, setTickets] = useState([]);
  const [stop, setStop] = useState(false);
  const [sortTickets, setSortTickets] = useState([]);
  const [filter, setFilter] = useState({all: true, without: true, one: true, two: true, three: true});
  const [sorterActive, setSorterActive] = useState({ lowprice: true, faster: false });

  const allSorter = useCallback((tickets1) => {
    const newTicketsArr = [...tickets1];
    if (sorterActive.lowprice) {
      return newTicketsArr.sort((a, b) => a.price - b.price);
    }
    if (sorterActive.faster) {
      return newTicketsArr.sort(
        (a , b) => a.segments[0].duration + a.segments[1].duration  - (b.segments[0].duration + b.segments[1].duration)
      );
    };
    return newTicketsArr;
  }, [sorterActive]);

  const filteredTickets = useCallback ((tickArr) => {
    return tickArr.filter((current) => {
      if (filter.all) return true;
      if (filter.without && current.segments[0].stops.length === 0 && current.segments[1].stops.length === 0) return true;
      if (filter.one && current.segments[0].stops.length === 1 && current.segments[1].stops.length === 1) return true;
      if (filter.two && current.segments[0].stops.length === 2 && current.segments[1].stops.length === 2) return true;
      if (filter.three && current.segments[0].stops.length === 3 && current.segments[1].stops.length === 3) return true;
      return false;
    });
  }, [filter.all, filter.without, filter.one, filter.two, filter.three]);

  useEffect(() => {
    if (stop === true) {
      setSortTickets(ticketNormalize(allSorter(filteredTickets(tickets)).slice(0, 5)));
    }
  }, [stop, tickets, sorterActive, allSorter, filteredTickets]);


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

  const sorterHandle = useCallback((sortedButton) => {
    if(sorterActive[sortedButton]) return;
    setSorterActive({ lowprice: !sorterActive["lowprice"], faster: !sorterActive["faster"] })
  }, [sorterActive])

  const allHandler = (fil) => {
    let tempFilter = {...filter};
    tempFilter[fil] = !tempFilter[fil];
    if (fil === "all") {
      tempFilter = Object.fromEntries(Object.keys(tempFilter).map((current) => {
        return [current, tempFilter[fil]];
      }));
    } else {
      if (Object.keys(tempFilter).some(key => tempFilter[key] === false)) {
        tempFilter["all"] = false;
      }
      if (Object.keys(tempFilter).every(key => {
          if ( key === "all" ) return true;
          return tempFilter[key] === true;
      })) {
        tempFilter["all"] = true;
      };
    };
    setFilter({...tempFilter});
  };

  return (
    <div className={styles.app}>
        <div className={styles['app-wrapper']}>
          <div className={styles.header}>
            <img className={styles.logo}src={logo} width="60px" height="60px" alt="logo" />
          </div>
          <div className={styles.main}>
            <div className={styles['sidebar-wrapper']}>
              <Sidebar 
                allHandler={(fil) => allHandler(fil)}
                filter={filter} 
              />
            </div>
              <Filter
                sorterActive={sorterActive}
                sorterHandle={(sortedButton) => sorterHandle(sortedButton)}
              />
              <Tickets 
                sortTickets={sortTickets}
              />
          </div>
        </div>
      </div>
  );
};

export default App;