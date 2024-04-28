export default (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/xml');

  const errorNode = doc.querySelector('parsererror');
  if (errorNode) {
    const error = new Error();
    error.name = 'ParsingError';
    error.message = errorNode.textContent;
    throw error;
  }

  const feed = {
    title: doc.querySelector('title').textContent,
    description: doc.querySelector('description').textContent,
  };
  const itemsEl = doc.querySelectorAll('item');

  const items = Array.from(itemsEl).map((item) => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;

    return { title, description, link };
  });
  return { feed, items };
};
