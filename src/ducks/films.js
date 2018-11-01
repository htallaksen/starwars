import { Map, List, fromJS } from 'immutable';
import { camelizeKeys } from 'humps';
import moment from 'moment';
import sortFilms from '../helpers/sortFilms';

// Action types
const FETCH_FILMS_START = 'FETCH_FILMS_START';
const FETCH_FILMS_COMPLETE = 'FETCH_FILMS_COMPLETE';
const FETCH_FILMS_ERROR = 'FETCH_FILMS_ERROR';

const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const fetchFilms = () => dispatch => {
  dispatch({ type: FETCH_FILMS_START });
  return fetch('https://swapi.co/api/films/', {
    HEADERS,
    method: 'GET',
  }).then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (response.ok) {
        return dispatch({ type: FETCH_FILMS_COMPLETE, response: json });
      }
      return dispatch({ type: FETCH_FILMS_ERROR, error: json });
    })
    .catch(err => {
      console.error('fetch error', err);
      dispatch({ type: FETCH_FILMS_ERROR, error: 'Ooops, fant ikkje filmar gitt. Prøv på nytt du.' });
    });
};


// Ikkje bra (hard coded):
const coverUrls = List.of(
  Map({ episodeId: 1, coverUrl: 'http://www.coverwhiz.com/content/Star-Wars-Episode-I-The-Phantom-Menace.jpg' }),
  Map({ episodeId: 2, coverUrl: 'http://www.coverwhiz.com/content/Star-Wars-Episode-II-Attack-Of-The-Clones.jpg' }),
  Map({ episodeId: 3, coverUrl: 'http://www.coverwhiz.com/content/Star-Wars-Episode-III-Revenge-Of-The-Sith.jpg' }),
  Map({ episodeId: 4, coverUrl: 'http://www.coverwhiz.com/content/Star-Wars-Episode-IV-A-New-Hope.jpg' }),
  Map({ episodeId: 5, coverUrl: 'http://www.coverwhiz.com/content/Star-Wars-Episode-V-The-Empire-Strikes-Back.jpg' }),
  Map({ episodeId: 6, coverUrl: 'http://www.coverwhiz.com/content/Star-Wars-Episode-VI-Return-Of-The-Jedi.jpg' }),
  Map({ episodeId: 7, coverUrl: 'http://www.coverwhiz.com/content/Star-Wars-Episode-VII-The-Force-Awakens.jpg' }),
  Map({ episodeId: 8, coverUrl: 'http://www.coverwhiz.com/content/Star-Wars-Episode-VIII-The-Last-Jedi.jpg' }),
);

const starWarsLogoUrl = 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg';

// initial state
const initialState = Map({
  fetching: false,
  fetched: false,
  error: null,
  films: Map(),
});

// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_FILMS_START:
      return state.merge({
        fetching: true,
        fetched: false,
        error: null
      });
    case FETCH_FILMS_COMPLETE: {
      const films = fromJS(camelizeKeys(action.response));
      const filmsWithCoverUrl = films.get('results').map((result) => {
        let url = coverUrls.find(x => x.get('episodeId') === result.get('episodeId'));
        if (!url) url = starWarsLogoUrl;
        else url = url.get('coverUrl');
        return result.set('coverUrl', url);
      });
      return initialState.merge({
        fetched: true,
        fetching: false,
        films: sortFilms({ films: filmsWithCoverUrl, sortBy: 'releaseDate' }),
      });
    }
    case FETCH_FILMS_ERROR: {
      return initialState.merge({
        fetched: true,
        fetching: false,
        films: Map(),
        error: fromJS(camelizeKeys(action.error)),
      });
    }
    default:
      return state;
  }
}
