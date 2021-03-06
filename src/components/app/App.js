import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import logo from '../../assets/logo.svg';
import { ticketNormalize } from '../../helper';
import { aviasalesURL } from '../../constants';
import styles from './App.module.scss';
import Sidebar from '../sidebar';
import Filter from '../filter';
import Tickets from '../tickets';
import Spinner from '../spinner/Spinner';

function App( { searchId, tickets, stop, sortTickets, filter, sorterActive, loading, setSearchId,
  setTickets, setStop, setSortTickets } ) {

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

      const transfersForward = current.segments[0].stops.length;
      const transfersBackward = current.segments[1].stops.length;

      if (filter.all) return true;
      if (filter.without && transfersForward === 0 && transfersBackward === 0) return true;
      if (filter.one && transfersForward === 1 && transfersBackward === 1) return true;
      if (filter.two && transfersForward === 2 && transfersBackward === 2) return true;
      if (filter.three && transfersForward === 3 && transfersBackward === 3) return true;
      return false;
    });
  }, [filter.all, filter.without, filter.one, filter.two, filter.three]);

  useEffect(() => {
    if (stop) {
      setSortTickets(ticketNormalize(allSorter(filteredTickets(tickets)).slice(0, 5)));
    }
  }, [stop, tickets, sorterActive, allSorter, filteredTickets, setSortTickets]);

  useEffect(() => {
    fetch(`${aviasalesURL}search`)
      .then((res) => res.json())
      .then((res) => {
        setSearchId(res.searchId);
    })
      .catch(e =>console.log(e));
  }, [setSearchId]);

  useEffect(() => {
    if (searchId && stop === false) {
      function subscribe() {
        fetch(`${aviasalesURL}tickets?searchId=${searchId}`)
          .then(res => { 
            if(res.status === 500) {
              subscribe();
            }
            return res.json();
          })
          .then(ticketsPart => {
            if(ticketsPart.stop) {
              setStop();
            }
            setTickets([...tickets, ...ticketsPart.tickets]);
          })
          .catch((e) => console.log(e));
      }
      subscribe();
    }
  }, [searchId, tickets, stop, setTickets, setStop]);

  let content = Object.values(filter).every((key) => {
    if (key) {
      return false;
    }
    return true;
  });

  return (
    <div className={styles.app}>
        <div className={styles['app-wrapper']}>
          <div className={styles.header}>
            <img className={styles.logo}src={logo} width="60px" height="60px" alt="logo" />
          </div>
          <div className={styles.main}>
            <div className={styles['sidebar-wrapper']}>
              <Sidebar />
            </div>
              <Filter />
              { content ? <h2 className={styles.empty} >No tickets found!</h2> : loading ? <Spinner /> : <Tickets sortTickets={ sortTickets } /> }
          </div>
        </div>
      </div>
  );
};

const mapStateToProps = ({ searchId, tickets, stop, sortTickets, filter, sorterActive, loading }) => {
  return {
    searchId, tickets, 
    stop, sortTickets, 
    filter, sorterActive,
    loading
  };
};

export default connect(mapStateToProps, actions)(App);