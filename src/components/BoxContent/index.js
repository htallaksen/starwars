import React from 'react';
import classNamesBind from 'classnames/bind';
import styles from './styles.css';

const cx = classNamesBind.bind(styles);

export default ({ children, header, wrapperClassName, contentClassName, headerClassName }) => {
  return (
    <div className={cx(styles.wrapper, wrapperClassName)}>
      {header && (
        <div className={cx(styles.header, headerClassName)}>
          {header}
        </div>
      )}
      <div className={cx(styles.content, contentClassName)}>
        { children }
      </div>
    </div>
  );
};
