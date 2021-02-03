import React from 'react';
import 'antd/dist/antd.css';
import styles from './Spinner.module.scss';

import { Spin } from 'antd';

const Spinner = () => {
   return (
      <div className={styles.spinner}>
         <Spin size="large" />
      </div>
   )
}

export default Spinner;