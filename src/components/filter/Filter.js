import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import styles from './Filter.module.scss';

const Filter = ({ sorterActive, setSorterActive }) => {

   const sorterHandle = useCallback((sortedButton) => {
      if(sorterActive[sortedButton]) return;
      setSorterActive({ lowprice: !sorterActive["lowprice"], faster: !sorterActive["faster"] })
   }, [sorterActive, setSorterActive]);
   
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
   );
};

const mapStateToProps = ({ sorterActive }) => {
   return {
      sorterActive,
   };
};

export default connect(mapStateToProps, actions)(Filter);