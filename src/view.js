import onChange from 'on-change';

export default (elements, i18n, state) => {
  const {
    form, submitButton, feedbackElement, postsContainer, feedsContainer, inputElement,
  } = elements;
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'error':
        feedbackElement.textContent = i18n.t(value);
        feedbackElement.classList.remove('text-success');
        feedbackElement.classList.add('text-danger');
        inputElement.classList.add('is-invalid');
        break;

      case 'feeds':
        postsContainer.replaceChildren();
        feedsContainer.replaceChildren();
        inputElement.classList.remove('is-invalid');
        renderFeeds(value);
        feedbackElement.classList.remove('text-danger');
        feedbackElement.classList.add('text-success');
        feedbackElement.textContent = i18n.t('responseSection.successFeedback');
        break;

      case 'posts':
        postsContainer.replaceChildren();
        renderPosts(value);
        break;

      case 'uiState.posts':
        updatePostsUI(value);
        break;

      case 'formState':
        handleFormState(value);
        break;

      default:
        throw new Error(`Unknown path ${path}!`);
    }
  });

  function renderFeeds(feeds) {
    const feedsBody = document.createElement('div');
    feedsBody.classList.add('card', 'border-0');
    const feedsTitleDiv = document.createElement('div');
    const feedsTitle = document.createElement('h2');
    feedsTitle.textContent = i18n.t('responseSection.feedsTitle');
    feedsTitleDiv.classList.add('card-body');
    feedsTitle.classList.add('card-title', 'h4');
    feedsTitleDiv.append(feedsTitleTitleTitle);
    const feedsUL = document.createElement('ul');
    feedsUL.classList.add('list-group', 'border-0', 'rounded-0');
    feedsBody.append(feedsTitleDiv, feedsUL);
    feedsContainer.append(feedsBody);
    feeds.forEach(({ title, description }) => {
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
  }

  function renderPosts(posts) {
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
    const previewedPosts = state.uiState.posts;
;
;
    posts.forEach(({ id, title, link }) => {
      const postItem = document.createElement('li');
      postItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      const postLink = document.createElement('a');
      postLink.href = link;
      postLink.classList.add('fw-bold', !previewedPosts.includes(id) && 'fw-normal');
      postLink.dataset.id = id;
      postLink.target = '_blank';
      postLink.rel = 'noopener noreferrer';
      postLink.textContent = title;
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
  }

  function updatePostsUI(posts) {
    posts.forEach((id) => {
      const postElement = document.querySelector(`a[data-id="${id}"]`);
      postElement.classList.remove('fw-bold');
    });
  }

  function handleFormState(stateValue) {
    switch (stateValue) {
      case 'waiting response':
        submitButton.disabled = true;
        break;
      case 'processing':
        submitButton.disabled = false;
        form.reset();
        inputElement.focus();
        break;
      case 'initial':
        form.reset();
        break;
      default:
        break;
;
;
    }
  }

  return watchedState;
};
