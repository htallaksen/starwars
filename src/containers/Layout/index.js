import React from 'react';
import styles from './styles.css';

type Props = {
  children: any
}

const Layout = (props: Props) => (
  <div className={styles.container}>
    <div className={styles.content}>
      {props.children}
    </div>
  </div>
);

export default Layout;
