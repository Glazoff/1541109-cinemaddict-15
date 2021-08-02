/*
const filmPopup = {
  poster: '/public/images/posters/the-great-flamarion.jpg',
  title: 'The great flamarion',
  originalTitle: 'The great flamarion',
  rating: '8.9',
  director: 'Anthony Mann',
  writers: 'Anne Wigton, Heinz Herald, Richard Weil',
  actors: 'Erich von Stroheim, Mary Beth Hughes, Dan Duryea',
  releaseDate: '30 March 1945',
  runtime: '	1h 18m',
  country: 'USA',
  genres: 'Drama Film-Noir Mystery',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  ratingAge: '18+',
  comments: [{
    userName: 'Tim Macoveev',
    emoji: '/public/images/emoji/angry.png',
    commentText: 'Interesting setting and a good cast',
    commentTime: '2019/12/31 23:59'}
  ,{},{},{},{}],
  isAddToWatchlist: false,
  isAlreadyWatched: false,
  isAddToFavorites: false,
};

const film = {
  poster: '/public/images/posters/the-great-flamarion.jpg',
  title: 'The great flamarion',
  rating: '8.9',
  releaseDate: '30 March 1945',
  runtime: '	1h 18m',
  genre: 'Drama',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  comments: '5',
  isAddToWatchlist: false,
  isAlreadyWatched: false,
  isAddToFavorites: false,
};
*/

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  ];
  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  return descriptions[randomIndex];
};

const generatePoster = () => {
  const poster = [
    '/images/posters/the-great-flamarion.jpg',
    '/images/posters/made-for-each-other.png',
    '/images/posters/popeye-meets-sinbad.png',
    '/images/posters/sagebrush-trail.jpg',
    '/images/posters/santa-claus-conquers-the-martians.jpg',
    '/images/posters/the-dance-of-life.jpg',
    '/images/posters/the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, poster.length - 1);
  return poster[randomIndex];
};

const generateTitle = () => {
  const title = [
    'GeneratePoster',
    'Made for each other',
    'Popeye meets sinbad',
    'Sagebrush trail',
    'Santa claus conquers the martians',
    'The dance of life',
    'The man with the golden arm',
  ];

  const randomIndex = getRandomInteger(0, title.length - 1);
  return title[randomIndex];
};

const ganerateRating = () => {
  const minRating = 0.0;
  const maxRating = 9.9;

  const getRandom = (min, max) => Math.random() * (max - min) + min;

  const rating = getRandom(minRating, maxRating).toFixed(1);
  return rating;
};

const ganerateReleaseDate = () => {
  const minData = '1900';
  const maxData = '1990';

  const dataFilm = getRandomInteger(minData, maxData);
  return dataFilm;
};

const ganerateRunTime = () => {
  const minHours = '0';
  const maxHours = '2';
  const minMin = '00';
  const maxMin = '59';

  const hourse = getRandomInteger(minHours, maxHours);
  const minutes = getRandomInteger(minMin, maxMin);

  if (hourse === 0) {
    return `${minutes}m`;
  }

  return `${hourse}h ${minutes}m`;
};

const generateGenre = () => {
  const genre = [
    'Musical',
    'Western',
    'Drama',
    'Comedy',
    'Cartoon',
    'Mystery',
  ];

  const randomIndex = getRandomInteger(0, genre.length - 1);
  return genre[randomIndex];
};

export const generateFilm = () => ({
  poster: generatePoster(),
  title: generateTitle(),
  rating: ganerateRating(),
  releaseDate: ganerateReleaseDate(),
  runTime: ganerateRunTime(),
  genre: generateGenre(),
  description: generateDescription(),
  comments: getRandomInteger(1, 5),
  isAddToWatchlist: Boolean(getRandomInteger(0, 1)),
  isAlreadyWatched: Boolean(getRandomInteger(0, 1)),
  isAddToFavorites: Boolean(getRandomInteger(0, 1)),
});

