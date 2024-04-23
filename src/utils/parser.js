export default (rssData, i18n) => {
  // Проверяем, является ли rssData строкой
  if (typeof rssData !== 'string') {
    const errorMessage = i18n.t('errors.invalidRssData');
    const error = new Error(errorMessage);
    error.isInvalidDataError = true;
    error.localizedErrorMessage = errorMessage;
    throw error;
  }
  // Проверяем, содержит ли rssData хотя бы один открывающий тег
  if (!rssData.includes('<')) {
    const errorMessage = i18n.t('errors.invalidXmlFormat');
    const error = new Error(errorMessage);
    error.isInvalidDataError = true;
    error.localizedErrorMessage = errorMessage;
    throw error;
  }
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(rssData, 'application/xml');
  const parserError = xmlDoc.querySelector('parsererror');
  if (parserError) {
    // Получаем содержимое элемента parsererror
    const errorContent = parserError.textContent.trim();
    // Создаем объект ошибки с дополнительной информацией
    const errorMessage = i18n.t('errors.shouldContainRss');
    const error = new Error(errorMessage);
    error.isParserError = true;
    error.localizedErrorMessage = errorMessage;
    error.parserErrorContent = errorContent; // Добавляем содержимое parserError
    throw error;
  }
  const itemsElements = xmlDoc.querySelectorAll('item');
  const items = [...itemsElements].map((item) => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;
    return { title, description, link };
  });
  const parsedData = {
    title: xmlDoc.querySelector('channel > title').textContent,
    description: xmlDoc.querySelector('channel > description').textContent,
    items,
  };
  return parsedData;
};
