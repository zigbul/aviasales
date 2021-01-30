import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, bindActionCreators } from 'redux';
import reducer from './reducer';
import * as actions from './actions';
import App from './App';

const store = createStore(reducer);
const { dispatch, subscribe, getState } = store;

const { setSearchId, setTickets,
        setStop, setSortTickets,
        setFilter, setSorterActive } = bindActionCreators(actions, dispatch);

const update = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App
        state={ getState() }
        setSearchId={ setSearchId }
        setTickets={ setTickets }
        setStop= { setStop }
        setSortTickets={ setSortTickets }
        setFilter={ setFilter }
        setSorterActive={ setSorterActive }
      />
    </React.StrictMode>,
    document.getElementById('root')
  );
};

update();
subscribe(update);
subscribe(() => console.log(getState()));