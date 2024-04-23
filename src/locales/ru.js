export default {
  translation: {
    validation: {
      url: {
        invalid: 'Введите корректный URL-адрес.',
        unique: 'Этот URL уже добавлен.',
        required: 'Введите URL-адрес.',
      },
    },
    requestSection: {
      mainTitle: 'RSS агрегатор',
      leadText: 'Начните читать RSS сегодня! Это легко, это красиво.',
      inputLabel: 'Ссылка RSS',
      addButtonName: 'Добавить',
      exampleText: 'Пример: https://lorem-rss.hexlet.app/feed',
    },
    modalSection: {
      readFullButton: 'Читать полностью',
      closeButton: 'Закрыть',
    },
    responseSection: {
      feedsTitle: 'Фиды',
      postsTitle: 'Посты',
      successFeedback: 'RSS успешно загружен',
      openLinkButton: 'Просмотр',
      errors: {
        notOneOf: 'RSS уже существует',
        url: 'Ссылка должна быть валидным URL',
        matches: 'Не должно быть пустым',
        parsingError: 'Ресурс не содержит валидный RSS',
        AxiosError: 'Ошибка сети',
      },
    },
  },
};
