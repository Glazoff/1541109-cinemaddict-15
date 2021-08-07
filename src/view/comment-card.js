export const createCommentsTemplate = (films) => {
  const {comments} = films;

  const {commentText, emoji, userName, commentData} = comments;

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
