const state = {
  feeds: [],
  posts: [],
  error: '',
  inputValue: '',
  validationError: null,
  uiState: {
    posts: new Set(),
  },
  formState: 'initial',
};

export default state;
