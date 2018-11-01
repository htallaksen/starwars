import React from 'react';
import moment from 'moment';
import styles from './styles.css';

export default ({ location, temperature, iconUrl, lastUpdated }) => (
  <div className={styles.container}>
    <div className={styles.location}>{location}</div>
    <img className={styles.icon} src={`http:${iconUrl}`} alt="weather icon" />
    <div className={styles.temperature}>
      {temperature} grader
    </div>
    <div className={styles.lastUpdated}>
      {moment(lastUpdated).format('HH:mm')}
    </div>
  </div>
);
