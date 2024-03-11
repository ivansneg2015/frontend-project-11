/* eslint-disable no-param-reassign */
const handleErrors = (elements, error) => {
  const { input, notificationBox } = elements;
  input.style.border = '2px solid red';
  notificationBox.textContent = error;
  notificationBox.classList.add('text-danger');
};

const buildElement = (tagName, { style = [], textContent } = {}) => {
  const element = document.createElement(tagName);
  element.classList.add(...style);
  element.style.color = element.classList.contains('fw-normal') && 'gray';
  if (textContent) element.textContent = textContent;
  return element;
};

const buildContainer = (title, i18n, list) => {
  const container = buildElement('div', { style: ['card', 'border-0'] });
  const cardBody = buildElement('div', { style: 'card-body' });
  const cardTitle = buildElement('h2', { style: ['card-title', 'h4'], textContent: i18n.t(title) });
  const ulList = buildElement('ul', { style: ['list-group', 'border-0', 'rounded-0'] });
  cardBody.innerHTML = '';
  cardBody.append(cardTitle);
  ulList.append(...list);
  container.append(cardBody, ulList);
  return container;
};

const handleFormState = (elements, formState, i18n) => {
  const { notificationBox, submit } = elements;
  switch (formState) {
    case 'filling':
      submit.disabled = false;
      elements.input.focus();
      break;
    case 'sending':
      submit.disabled = true;
      notificationBox.textContent = i18n.t('common.submit');
      notificationBox.classList.remove('text-danger');
      notificationBox.style.color = 'white';
      break;
    default:
      throw new Error(`Unexpected form state: ${formState}`);
  }
};

const handleFeeds = (feeds, divContainer, i18n, feedsName) => {
  const listFeeds = feeds.map(({ title, description }) => {
    const li = buildElement('li', { style: ['list-group-item', 'border-0', 'border-end-0'] });
    const feedTitle = buildElement('h3', { style: ['h6', 'm-0'], textContent: title });
    const feedDesc = buildElement('p', { style: ['m-0', 'small', 'text-black-50'], textContent: description });
    li.append(feedTitle, feedDesc);
    return li;
  });
  divContainer.replaceChildren(buildContainer(feedsName, i18n, listFeeds));
};

const handlePosts = (posts, divContainer, i18n, postsName, state) => {
  const listPosts = posts.map(({ id, title, link }) => {
    const li = buildElement('li', { style: ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0'] });
    const linkEl = buildElement('a', {
      style: [state.seenIds.has(id) ? ['fw-normal'] : ['fw-bold']],
      textContent: title,
    });
    linkEl.href = link;
    linkEl.target = '_blank';
    linkEl.rel = 'noopener noreferrer';
    linkEl.setAttribute('data-id', id);
    const button = buildElement('button', { style: ['btn', 'btn-outline-primary', 'btn-sm'], textContent: i18n.t('common.preview') });
    button.type = 'button';
    button.setAttribute('data-id', id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    li.append(linkEl, button);
    return li;
  });
  divContainer.replaceChildren(buildContainer(postsName, i18n, listPosts));
};

export default (elements, state, i18n) => (path, value) => {
  const {
    input, notificationBox, feedsDiv, postsDiv, modal,
  } = elements;

  const { feeds, posts } = state;

  switch (path) {
    case 'form.url':
      input.value = value;
      break;

    case 'form.state':
      handleFormState(elements, value, i18n);
      break;

    case 'form.error':
      handleErrors(elements, value);
      break;

    case 'feeds':
      input.style.border = '';
      notificationBox.classList.remove('text-danger');
      notificationBox.style.color = 'green';
      notificationBox.textContent = i18n.t('common.validated');
      handleFeeds(feeds, feedsDiv, i18n, 'common.feeds', state);
      input.value = '';
      break;

    case 'posts':
      handlePosts(posts, postsDiv, i18n, 'common.posts', state);
      break;

    case 'modal':
      modal.title.textContent = value.title;
      modal.body.textContent = value.description;
      modal.showFull.href = value.link;
      break;

    case 'seenIds':
      handlePosts(posts, postsDiv, i18n, 'common.posts', state);
      break;

    default:
      throw new Error(`Unexpected state: ${path}`);
  }
};
