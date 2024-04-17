import onChange from 'on-change';

export default (elements, i18n, state) => {
  const {
    form, submitButton, feedbackElement, postsContainer, feedsContainer, inputElement,
  } = elements;

  const updateError = (value) => {
    feedbackElement.textContent = i18n.t(value);
    feedbackElement.classList.remove('text-success');
    feedbackElement.classList.add('text-danger');
    inputElement.classList.add('is-invalid');
  };

  const updateFeeds = (value) => {
    postsContainer.replaceChildren();
    feedsContainer.replaceChildren();
    inputElement.classList.remove('is-invalid');

    const feedsBody = document.createElement('div');
    feedsBody.classList.add('card', 'border-0');

    const feedsTitleDiv = document.createElement('div');
    const feedsTitle = document.createElement('h2');
    feedsTitle.textContent = i18n.t('responseSection.feedsTitle');
    feedsTitleDiv.classList.add('card-body');
    feedsTitle.classList.add('card-title', 'h4');
    feedsTitleDiv.append(feedsTitle);

    const feedsUL = document.createElement('ul');
    feedsUL.classList.add('list-group', 'border-0', 'rounded-0');

    feedsBody.append(feedsTitleDiv, feedsUL);
    feedsContainer.append(feedsBody);

    value.forEach(({ title, description }) => {
      const feedItem = document.createElement('li');
      feedItem.classList.add('list-group-item', 'border-0', 'border-end-0');

      const feedItemTitle = document.createElement('h3');
      feedItemTitle.classList.add('h6', 'm-0');
      feedItemTitle.textContent = title;

      const feedItemBody = document.createElement('p');
      feedItemBody.classList.add('m-0', 'small', 'text-black-50');
      feedItemBody.textContent = description;

      feedItem.append(feedItemTitle, feedItemBody);
      feedsUL.append(feedItem);
    });

    feedbackElement.classList.remove('text-danger');
    feedbackElement.classList.add('text-success');
    feedbackElement.textContent = i18n.t('responseSection.successFeedback');
  };

  const updatePosts = (value) => {
    postsContainer.replaceChildren();

    const postsBody = document.createElement('div');
    postsBody.classList.add('card', 'border-0');

    const postsTitleDiv = document.createElement('div');
    const postsTitle = document.createElement('h2');
    postsTitle.textContent = i18n.t('responseSection.postsTitle');
    postsTitleDiv.classList.add('card-body');
    postsTitle.classList.add('card-title', 'h4');
    postsTitleDiv.append(postsTitle);

    const postsUL = document.createElement('ul');
    postsUL.classList.add('list-group', 'border-0', 'rounded-0');

    postsBody.append(postsTitleDiv, postsUL);
    postsContainer.append(postsBody);

    const previewedPosts = new Set(state.uiState.posts);

    value.forEach(({ id, title, link }) => {
      const postItem = document.createElement('li');
      postItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

      const postLink = document.createElement('a');
      postLink.href = link;
      postLink.textContent = title;
      postLink.classList.toggle('fw-bold', !previewedPosts.has(id));
      postLink.dataset.id = id;
      postLink.target = '_blank';
      postLink.rel = 'noopener noreferrer';

      const postButton = document.createElement('button');
      postButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      postButton.type = 'button';
      postButton.dataset.id = id;
      postButton.dataset.bsToggle = 'modal';
      postButton.dataset.bsTarget = '#modal';
      postButton.textContent = i18n.t('responseSection.openLinkButton');

      postItem.append(postLink, postButton);
      postsUL.append(postItem);
    });
  };

  const updateUiPosts = (value) => {
    value.forEach((postId) => {
      const postElement = document.querySelector(`a[data-id="${postId}"]`);
      if (postElement) {
        postElement.classList.add('fw-normal');
        postElement.classList.remove('fw-bold');
      }
    });
  };

  const updateFormState = (value) => {
    if (value === 'waiting response') {
      submitButton.disabled = true;
    } else if (value === 'processing') {
      submitButton.disabled = false;
      form.reset();
      inputElement.focus();
    } else if (value === 'initial') {
      form.reset();
    }
  };

  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'error':
        updateError(value);
        break;

      case 'feeds':
        updateFeeds(value);
        break;

      case 'posts':
        updatePosts(value);
        break;

      case 'uiState.posts':
        updateUiPosts(value);
        break;

      case 'formState':
        updateFormState(value);
        break;

      default:
        throw new Error(`Unknown path ${path}!`);
    }
  });

  return watchedState;
};
