import onChange from 'on-change';
import i18next from 'i18next';
import axios from 'axios';
import { uniqueId } from 'lodash';
import * as yup from 'yup';
import ru from './locales/ru.js';
import render from './render.js';
import parseRSS from './utils/parser.js';

const updateLocalization = (i18n) => {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    // eslint-disable-next-line no-param-reassign
    element.textContent = i18n.t(key);
  });
};

const generateUrl = (url) => `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;

const getHttpContents = (url) => axios.get(generateUrl(url))
  .then((response) => {
    const { contents } = response.data;
    return contents;
  });

const addPosts = (feedId, items, state) => {
  const posts = items.map((item) => ({ feedId, id: uniqueId(), ...item }));
  state.posts.unshift(...posts);
};

const trackUpdates = (state, timeout = 5000) => {
  const checkUpdates = () => {
    const checkFeed = (feed) => getHttpContents(feed.link)
      .then((contents) => parseRSS(contents))
      .then((parsedRSS) => {
        const postsUrls = state.posts.map(({ link, feedId }) => feed.id === feedId && link);
        const newItems = parsedRSS.items.filter(({ link }) => !postsUrls.includes(link));

        if (newItems.length > 0) {
          addPosts(feed.id, newItems, state);
        }
      })
      .catch((error) => console.error(error));

    const checkAllFeeds = () => {
      const feedPromises = state.feeds.map((feed) => checkFeed(feed));
      return Promise.all(feedPromises);
    };

    checkAllFeeds().then(() => {
      setTimeout(checkUpdates, timeout);
    });
  };

  setTimeout(checkUpdates, timeout);
};

export default () => {
  const defaultLanguage = 'ru';

  const i18n = i18next.createInstance();

  yup.setLocale({
    mixed: {
      required: () => i18n.t('errors.required'),
      notOneOf: () => i18n.t('errors.shouldBeUnique'),
    },
    string: {
      url: () => i18n.t('errors.shouldBeValid'),
    },
  });

  i18n.init({
    lng: defaultLanguage,
    resources: {
      ru,
    },
  })
    .then(() => {
      updateLocalization(i18n);
      const elements = {
        form: document.querySelector('.rss-form'),
        input: document.getElementById('url-input'),
        notificationBox: document.querySelector('.text-danger'),
        feedsDiv: document.querySelector('.feeds'),
        postsDiv: document.querySelector('.posts'),
        submit: document.querySelector('button[type="submit"]'),
        modal: {
          modalElement: document.querySelector('.modal'),
          title: document.querySelector('.modal-title'),
          body: document.querySelector('.modal-body'),
          showFull: document.querySelector('.full-article'),
        },
      };

      const initialState = {
        form: {
          state: 'filling',
          url: '',
          error: '',
        },
        feeds: [],
        posts: [],
        seenIds: new Set(),
        modal: {
          title: '',
          description: '',
          link: '',
        },
      };

      const state = onChange(initialState, render(elements, initialState, i18n));

      trackUpdates(state);

      const {
        form, input, modal, postsDiv,
      } = elements;

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        state.form.error = '';
        const urlLinks = state.feeds.map(({ link }) => link);
        const schema = yup.string().required().url().notOneOf(urlLinks);

        schema.validate(state.form.url)
          .then((url) => {
            state.form.state = 'sending';
            return getHttpContents(url, i18n);
          })
          .then((content) => parseRSS(content, i18n))
          .then((parsedData) => {
            const { title, description, items } = parsedData;
            const feedId = uniqueId();
            const feed = {
              id: feedId, title, description, link: state.form.url,
            };
            state.feeds.push(feed);
            addPosts(feedId, items, state);
          })
          .catch((error) => {
            const message = error.message === 'Network Error' ? i18n.t('errors.networkError') : error.message;
            state.form.error = message;
          })
          .finally(() => {
            state.form.state = 'filling';
          });
      });

      input.addEventListener('input', ({ target: { value } }) => {
        state.form.url = value.trim();
      });

      modal.modalElement.addEventListener('show.bs.modal', (e) => {
        const postId = e.relatedTarget.getAttribute('data-id');
        const post = state.posts.find(({ id }) => postId === id);
        const { title, description, link } = post;
        state.seenIds.add(postId);
        state.modal = { title, description, link };
      });

      postsDiv.addEventListener('click', (event) => {
        const postId = event.target.getAttribute('data-id');
        state.seenIds.add(postId);
      });
    });
};
