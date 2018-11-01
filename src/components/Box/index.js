import React from 'react';
import classNamesBind from 'classnames/bind';
import styles from './styles.css';

const cx = classNamesBind.bind(styles);

// export default ({ children, leftSide = false, className, style = {} }) => {
// export default ({ children, className, style = {} }) => {
//   const classNamesCombined = cx(styles.box, className);
//   return (
//     <div className={classNamesCombined} >
//       { children }
//     </div>
//   );
// };

class Box extends React.Component {
  state = {
    // expanded: false,
    expanded: false,
  }

  // toggleExpand = prevState => ({ expanded: !prevState.expanded });
  toggleExpand = () => {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
    // ({ expanded: !prevState.expanded });
  }

  render() {
    const { expanded } = this.state;
    const { children, className, title, titleClassName } = this.props;
    
    return (
      <div className={styles.container}>
        <div
          className={styles.listHeader}
          onClick={this.toggleExpand}
          role="button"
          tabIndex={0}
        >
          <div
            className={cx(styles.title, titleClassName)}
          >
            {title}
          </div>

          <div
            className={styles.expandArrowWrapper}
            onClick={this.toggleExpand}
            role="button"
            tabIndex={0}
          >
            <div
              className={cx(
                styles.expandArrow,
                expanded && styles.expanded,
                expanded ? styles.arrowDown : styles.arrowLeft
              )}
            />
          </div>
        </div>

        {expanded && (
          <div className={cx(styles.box, className)}>
            { children }
          </div>
        )}
      </div>
    );
  }
}

export default Box;
