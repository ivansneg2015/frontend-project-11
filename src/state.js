const state = {
  form: {
    inputValue: '',
    validationError: null,
    feeds: [],
    posts: [],
    error: '',
    uiState: {
      posts: new Set(),
    },
    formState: 'initial',
  },
};

export default state;
