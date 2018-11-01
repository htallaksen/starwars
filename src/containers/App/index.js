import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styles from './styles.css';
import { fetchFilms } from '../../ducks/films';
import Box from '../../components/Box';
import Content from '../../components/BoxContent';
import sortFilms from '../../helpers/sortFilms';


const mapStateToProps = (state) => {
  const fetching = state.films.get('fetching');
  const fetched = state.films.get('fetched');
  const error = state.films.get('error');
  const films = state.films.get('films');
  return { fetching, fetched, error, films };
};

export class AppContainer extends Component {
  state = {
    sortBy: 'releaseDate',
  }
  componentDidMount() {
    this.props.fetchFilms();
  }

  getSortedFilms = (films) => {
    const { sortBy } = this.state;
    return sortFilms({ sortBy, films });
  }

  handleSortByClick = (sortBy) => {
    this.setState({ sortBy });
  }

  render() {
    const { sortBy } = this.state;
    const { fetching, fetched, error, films } = this.props;

    if (!fetched && !fetching) {
      return null;
    } else if (fetching) {
      return (
        <div className={styles.container}>
          <h3>Loading ...</h3>
        </div>
      );
    } else if (error) {
      return (
        <div className={styles.container}>
          <h3>Error: {error}</h3>
        </div>
      );
    }
    const sortedFilms = this.getSortedFilms(films);
    return (
      <div className={styles.container}>

        <div className={styles.filters}>
          <label htmlFor="releaseDate">
            <input
              type="radio"
              id="releaseDate"
              name="sortBy"
              value="releaseDate"
              checked={sortBy === 'releaseDate'}
              onChange={() => this.handleSortByClick('releaseDate')}
            />
            Release date
          </label>
          <label htmlFor="title">
            <input
              type="radio"
              id="title"
              name="sortBy"
              value="title"
              checked={sortBy === 'title'}
              onChange={() => this.handleSortByClick('title')}
            />
            Title
          </label>
        </div>

        {sortedFilms.map(film => {
          return (
            <Box
              key={film.get('episodeId')}
              title={`${film.get('title')} (${moment(film.get('releaseDate')).format('YYYY-MM-DD')})`}
            >
              <Content wrapperClassName={styles.contentLeft}>
                <div>
                  <img
                    src={film.get('coverUrl')}
                    className={styles.image}
                    alt="cover"
                  />
                </div>
              </Content>

              <Content>
                <div>
                  <p>Director: {film.get('director')}</p>
                  <p>Producer: {film.get('producer')}</p>
                </div>
                <p>{film.get('openingCrawl')}</p>
              </Content>
            </Box>
          );
        })}
      </div>
    );
  }
}


export default connect(mapStateToProps, {
  fetchFilms,
})(AppContainer);
