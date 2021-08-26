import {getRandomInteger} from '../utils/common.js';

export const generateFilters = () => ({
  watchlist: getRandomInteger(1, 15),
  history: getRandomInteger(1, 15),
  favorites:getRandomInteger(1, 15),
});
