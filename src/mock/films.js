const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
];

const POSTER = [
  '/images/posters/the-great-flamarion.jpg',
  '/images/posters/made-for-each-other.png',
  '/images/posters/popeye-meets-sinbad.png',
  '/images/posters/sagebrush-trail.jpg',
  '/images/posters/santa-claus-conquers-the-martians.jpg',
  '/images/posters/the-dance-of-life.jpg',
  '/images/posters/the-man-with-the-golden-arm.jpg',
];

const TITLE = [
  'Made for each other',
  'Popeye meets sinbad',
  'Sagebrush trail',
  'Santa claus conquers the martians',
  'The dance of life',
  'The man with the golden arm',
];

const MIN_RATING = 0.0;
const MAX_RATING = 9.9;

const MIN_DATA = '1900';
const MAX_DATA = '1990';

const MIN_NUMBER = '1';
const MAX_NUMBER = '30';

const MONTH = [
  'January ',
  'February ',
  'March ',
  'July ',
  'November ',
  'September ',
];

const MIN_HOURS = '0';
const MAX_HOURS = '2';
const MIN_MINUTE = '00';
const MAX_MINUTE = '59';

const GENRE = [
  'Musical',
  'Western',
  'Drama',
  'Comedy',
  'Cartoon',
  'Mystery',
];

const DIRECTOR = [
  'Anthony Mann',
  'Anne Wigton',
  'Heinz Herald',
];

const WRITERS = [
  'Anne Wigton, Heinz Herald, Richard Weil',
  'Richard Weil, Heinz Herald, Dan Duryea',
  'Anne Wigton, Erich von Stroheim, Richard Weil',
];

const ACTORS = [
  'Anne Wigton, Heinz Herald, Richard Weil',
  'Richard Weil, Heinz Herald, Dan Duryea',
  'Anne Wigton, Erich von Stroheim, Richard Weil',
];

const COUNTRY = [
  'USA',
  'Belgium',
  'Canada',
  'Cuba',
];

const TEXT_COMMENT = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
];

const EMOJI = [
  '/images/emoji/angry.png',
  '/images/emoji/puke.png',
  '/images/emoji/angry.png',
  '/images/emoji/sleeping.png',
];

const USER_NAME = [
  'Tim Macoveev',
  'John Doe',
  'Liam',
  'Kevin',
];

import {getRandomInteger} from '../utils/common.js';


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

const generateRandomDescription = () => {
  const randomIndex = getRandomInteger(0, DESCRIPTIONS.length - 1);
  return DESCRIPTIONS[randomIndex];
};

const generateRandomPoster = () => {
  const randomIndex = getRandomInteger(0, POSTER.length - 1);
  return POSTER[randomIndex];
};

const generateRandomTitle = () => {
  const randomIndex = getRandomInteger(0, TITLE.length - 1);
  return TITLE[randomIndex];
};

const ganerateRandomRating = () => {
  const getRandom = (min, max) => Math.random() * (max - min) + min;

  const rating = getRandom(MIN_RATING, MAX_RATING).toFixed(1);
  return rating;
};

const ganerateRandomReleaseDate = () => {
  const dataFilm = getRandomInteger(MIN_DATA, MAX_DATA);
  return dataFilm;
};

const ganerateRandomInDetailReleaseDate = () => {
  const dataFilm = getRandomInteger(MIN_DATA, MAX_DATA);
  const monthFilm = getRandomInteger(0, MONTH.length - 1);
  const numberFilm = getRandomInteger(MIN_NUMBER, MAX_NUMBER);
  return `${numberFilm} ${MONTH[monthFilm]} ${dataFilm}`;
};

const ganerateRandomRunTime = () => {
  const hours = getRandomInteger(MIN_HOURS, MAX_HOURS);
  const minutes = getRandomInteger(MIN_MINUTE, MAX_MINUTE);

  if (hours === 0) {
    return `${minutes}m`;
  }

  return `${hours}h ${minutes}m`;
};

const generateRandomGenre = () => {
  const randomIndex = getRandomInteger(0, GENRE.length - 1);
  return GENRE[randomIndex];
};

const generateRandomDirector = () => {
  const randomIndex = getRandomInteger(0, DIRECTOR.length - 1);
  return DIRECTOR[randomIndex];
};

const generateRandomWriters = () => {
  const randomIndex = getRandomInteger(0, WRITERS.length - 1);
  return WRITERS[randomIndex];
};

const generateRandomActors = () => {
  const randomIndex = getRandomInteger(0, ACTORS.length - 1);
  return ACTORS[randomIndex];
};

const generateRandomCountry = () => {
  const randomIndex = getRandomInteger(0, COUNTRY.length - 1);
  return COUNTRY[randomIndex];
};

const ganerateRandomRatingAge = () => {
  const ratingAge = Boolean(getRandomInteger(0, 1));

  return ratingAge? '18+': '';
};

const ganerateRandomTextComment = () => {
  const randomIndex = getRandomInteger(0, TEXT_COMMENT.length - 1);
  return TEXT_COMMENT[randomIndex];
};

const ganerateRandomEmoji = () => {
  const randomIndex = getRandomInteger(0, EMOJI.length - 1);
  return EMOJI[randomIndex];
};

const ganerateRandomUserName = () => {
  const randomIndex = getRandomInteger(0, USER_NAME.length - 1);
  return USER_NAME[randomIndex];
};

const ganerateRandomDate = () => dayjs.between('2021-01-01T23:59', '2015-03-02T00:00').format('YYYY/MM/DD HH:MM');

const generateComment = () => {
  const comment = {
    commentText: ganerateRandomTextComment(),
    emoji: ganerateRandomEmoji(),
    userName: ganerateRandomUserName(),
    commentData: ganerateRandomDate(),
  };

  return comment;
};

const generateComments = (number) => {
  const comments = [];
  for(let i = 0; i < number; i++) {
    const comment = generateComment();
    comments.push(comment);
  }
  return comments;
};

const generateFilm = () => ({
  poster: generateRandomPoster(),
  title: generateRandomTitle(),
  description: generateRandomDescription(),
  rating: ganerateRandomRating(),

  releaseDate: ganerateRandomReleaseDate(),
  releaseDatePopup: ganerateRandomInDetailReleaseDate(),
  runTime: ganerateRandomRunTime(),

  genre: generateRandomGenre(),
  genresOne: generateRandomGenre(),
  genresTwo: generateRandomGenre(),
  genresFree: generateRandomGenre(),

  director: generateRandomDirector(),
  actors: generateRandomActors(),
  writers: generateRandomWriters(),
  country: generateRandomCountry(),

  ratingAge: ganerateRandomRatingAge(),

  isAddToWatchlist: Boolean(getRandomInteger(0, 1)),
  isAlreadyWatched: Boolean(getRandomInteger(0, 1)),
  isAddToFavorites: Boolean(getRandomInteger(0, 1)),

  comments: generateComments(getRandomInteger(1, 5)),
});

const generateFilms = (number) => {
  const films = [];
  for(let i = 0; i < number; i++) {
    const film = generateFilm();
    films.push(film);
  }
  return films;
};


export default generateFilms;

