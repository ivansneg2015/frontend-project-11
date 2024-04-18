import onChange from 'on-change';
import isValid from './validation.js';

const state = {
  inputValue: '',
  feeds: [],
  validationError: null,
};

const form = document.getElementById('rss-form');
const input = document.getElementById('url-input');

const updateInputStyle = (error) => {
  input.classList.toggle('error-border', !!error);
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  isValid(state.inputValue, state.feeds)
    .then((validationError) => {
      state.validationError = validationError;
      updateInputStyle(validationError);

      if (validationError.isValid) {
        // Handle successful form submission
        state.feeds.push(state.inputValue);
        state.inputValue = '';

        // Clear the input style and set focus
        updateInputStyle(null);
        input.focus();
      }
    });
});

const watchedState = onChange(state, (path, value) => {
  if (path === 'inputValue') {
    isValid(value, watchedState.feeds)
      .then((validationError) => {
        watchedState.validationError = validationError;
        updateInputStyle(validationError);
        console.log('VALID');
      });
  } else if (path === 'feeds') {
    watchedState.inputValue = '';
    watchedState.validationError = null;

    // Clear the input style and set focus
    updateInputStyle(null);
    input.focus();
  }
});
