import moment from 'moment';

export default ({ sortBy, films }) => {
  switch (sortBy) {
    case 'releaseDate':
      return films.sort((a, b) => moment(a.get('releaseDate')) - moment(b.get('releaseDate')));
    case 'title':
      return films.sort((a, b) => {
        if (a.get('title') > b.get('title')) return 1;
        if (a.get('title') < b.get('title')) return -1;
        return 0;
      });
    default:
      return films;
  }
};
