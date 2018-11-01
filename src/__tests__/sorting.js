import sortFilms from '../helpers/sortFilms';
import films from '../mock/films';

const sortedIdsReleaseDate = [4, 5, 6, 1, 2, 3, 7];

test('Correct sorting (releaseDate)', () => {
  const maybeSorted = sortFilms({ films, sortBy: 'releaseDate' });
  maybeSorted.forEach((f, i) => {
    expect(sortedIdsReleaseDate[i]).toBe(f.get('episodeId'));
  });
});
