// import AbstractView from './abstract.js';
import Smart from './abstract.js';

const createCommentsTemplate = (commentObj) => {
  const {commentText, emoji, userName, commentData} = commentObj;

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="${emoji}" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${commentText}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${userName}</span>
        <span class="film-details__comment-day">${commentData}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};

const generateComments = (comment) => {
  let commentsList = '';

  for(let i = 0; i < comment.length; i++) {
    const commentes = createCommentsTemplate(comment[i]);
    commentsList = commentsList + commentes;
  }

  return commentsList;
};

const createPopupFilmDetailsTemplate = (film) => {
  const {comments, poster, title, rating, director, writers, actors, releaseDate, runTime, country, genresOne, genresTwo, genresFree, description, ratingAge, isAddToWatchlist, isAlreadyWatched, isAddToFavorites} = film;

  const commentList = generateComments(comments);

  const addToWatchlistClassName = isAddToWatchlist
    ? 'film-details__control-button--active '
    : '';

  const alreadyWatchedClassName = isAlreadyWatched
    ? 'film-details__control-button--active '
    : '';

  const addToFavoritesClassName = isAddToFavorites
    ? 'film-details__control-button--active '
    : '';


  return`<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src=${poster} alt="">

            <p class="film-details__age">${ratingAge}</p>

          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">

                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>

              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${releaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${runTime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>

              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">

                  <span class="film-details__genre">${genresOne}</span>
                  <span class="film-details__genre">${genresTwo}-Noir</span>
                  <span class="film-details__genre">${genresFree}</span></td>

              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">

          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${addToWatchlistClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${alreadyWatchedClassName}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${addToFavoritesClassName}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">

          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${commentList}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};


export default class SitePopupFilmDetails extends Smart {
  constructor(film) {
    super();
    this._data = film;
    this._editClickWatchlist = this._editClickWatchlist.bind(this);
    this._editClickWatched = this._editClickWatched.bind(this);
    this._editClickFavorites = this._editClickFavorites.bind(this);

    this._clickHandlerEmoji = this._clickHandlerEmoji.bind(this);
    this._inputTextComment = this._inputTextComment.bind(this);

    this.getElement()
      .querySelector('.film-details__comment-label')
      .addEventListener('input', this._inputTextComment);

    this.getElement()
      .querySelectorAll('.film-details__emoji-label')
      .forEach((element) => {
        element.addEventListener('click', this._clickHandlerEmoji);
      });
  }

  getTemplate() {
    return createPopupFilmDetailsTemplate(this._data);
  }

  _inputTextComment(evt) {
    const textComment = this.getElement().querySelector('.film-details__comment-input');
    textComment.value = evt.target.value;
  }

  _clickHandlerEmoji(evt) {
    evt.preventDefault();
    const containsEmoji = this.getElement().querySelector('.film-details__add-emoji-label');
    containsEmoji.innerHTML = '';
    const emojiSelect = evt.target.getAttribute('src');
    const newImg = document.createElement('img');

    newImg.setAttribute('src', emojiSelect);
    newImg.setAttribute('width', '55px');
    newImg.setAttribute('height', '55px');

    containsEmoji.append(newImg);
  }

  _editClickWatchlist(evt) {
    evt.preventDefault();
    this._callback.editChangeWatchlist();
  }

  _editClickWatched(evt) {
    evt.preventDefault();
    this._callback.editChangeWatched();
  }

  _editClickFavorites(evt) {
    evt.preventDefault();
    this._callback.editChangeFavorites();
  }

  setEditClickWatchlist(callback) {
    this._callback.editChangeWatchlist = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._editClickWatchlist);
  }

  setEditClickWatched(callback) {
    this._callback.editChangeWatched = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._editClickWatched);
  }

  setEditClickFavorites(callback) {
    this._callback.editChangeFavorites = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._editClickFavorites);
  }
}


