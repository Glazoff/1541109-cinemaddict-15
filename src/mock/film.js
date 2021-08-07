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

import {getRandomInteger} from '../util';

import dayjs from 'dayjs';
// Функция рандомизирущая дату и вермя
// Истояник - https://github.com/FraserHamilton/dayjs-random
dayjs.between = (from, to) => {
  const fromMilli = dayjs(from).valueOf();
  const max = dayjs(to).valueOf() - fromMilli;

  const dateOffset = Math.floor(Math.random() * max + 1);

  const newDate = dayjs(fromMilli + dateOffset);

  return dayjs(newDate);
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

const ganerateInDetailReleaseDate = () => {
  const minData = '1900';
  const maxData = '1990';
  const minNumber = '1';
  const maxNumber = '30';
  const month = [
    'January ',
    'February ',
    'March ',
    'July ',
    'November ',
    'September ',
  ];

  const dataFilm = getRandomInteger(minData, maxData);
  const monthFilm = getRandomInteger(0, month.length - 1);
  const numberFilm = getRandomInteger(minNumber, maxNumber);
  return `${numberFilm} ${month[monthFilm]} ${dataFilm}`;
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

const generateDirector = () => {
  const director = [
    'Anthony Mann',
    'Anne Wigton',
    'Heinz Herald',
  ];

  const randomIndex = getRandomInteger(0, director.length - 1);
  return director[randomIndex];
};

const generateWriters = () => {
  const writers = [
    'Anne Wigton, Heinz Herald, Richard Weil',
    'Richard Weil, Heinz Herald, Dan Duryea',
    'Anne Wigton, Erich von Stroheim, Richard Weil',
  ];

  const randomIndex = getRandomInteger(0, writers.length - 1);
  return writers[randomIndex];
};

const generateActors = () => {
  const actors = [
    'Anne Wigton, Heinz Herald, Richard Weil',
    'Richard Weil, Heinz Herald, Dan Duryea',
    'Anne Wigton, Erich von Stroheim, Richard Weil',
  ];

  const randomIndex = getRandomInteger(0, actors.length - 1);
  return actors[randomIndex];
};

const generateCountry = () => {
  const country = [
    'USA',
    'Belgium',
    'Canada',
    'Cuba',
  ];

  const randomIndex = getRandomInteger(0, country.length - 1);
  return country[randomIndex];
};

const ganerateRatingAge = () => {
  const ratingAge = Boolean(getRandomInteger(0, 1));

  return ratingAge? '18+': '';
};

const ganerateTextComment = () => {
  const textComment = [
    'Interesting setting and a good cast',
    'Booooooooooring',
    'Very very old. Meh',
    'Almost two hours? Seriously?',
  ];

  const randomIndex = getRandomInteger(0, textComment.length - 1);
  return textComment[randomIndex];
};

const ganerateEmoji = () => {
  const emoji = [
    '/images/emoji/angry.png',
    '/images/emoji/puke.png',
    '/images/emoji/angry.png',
    '/images/emoji/sleeping.png',
  ];

  const randomIndex = getRandomInteger(0, emoji.length - 1);
  return emoji[randomIndex];
};

const ganerateUserName = () => {
  const userName = [
    'Tim Macoveev',
    'John Doe',
    'Liam',
    'Kevin',
  ];

  const randomIndex = getRandomInteger(0, userName.length - 1);
  return userName[randomIndex];
};

const ganerateDate = () => dayjs.between('2021-01-01T23:59', '2015-03-02T00:00').format('YYYY/MM/DD HH:MM');

const generateComments = () => {
  const comment = {
    commentText: ganerateTextComment(),
    emoji: ganerateEmoji(),
    userName: ganerateUserName(),
    commentData: ganerateDate(),
  };

  return comment;
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

export const generateFilmPopup = () => ({
  poster: generatePoster(),
  title: generateTitle(),
  rating: ganerateRating(),
  director: generateDirector(),
  writers: generateWriters(),
  actors: generateActors(),
  releaseDate: ganerateInDetailReleaseDate(),
  runTime: ganerateRunTime(),
  country: generateCountry(),
  genresOne: generateGenre(),
  genresTwo: generateGenre(),
  genresFree: generateGenre(),
  description: generateDescription(),
  ratingAge: ganerateRatingAge(),
  comments: generateComments(),
  isAddToWatchlist: Boolean(getRandomInteger(0, 1)),
  isAlreadyWatched: Boolean(getRandomInteger(0, 1)),
  isAddToFavorites: Boolean(getRandomInteger(0, 1)),
});
