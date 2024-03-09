import 'bootstrap';
import '../node_modules/bootstrap/scss/bootstrap.scss';
import * as yup from 'yup';

// ...

const schema = yup.object().shape({
  url: yup.string().url('Некорректный URL').required('URL обязателен'),
});

document.getElementById('rss-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Предотвращаем стандартную отправку формы

  const urlInput = document.getElementById('rss-url');
  const url = urlInput.value;

  schema.validate({ url })
    .then(() => {
      // Если URL прошел валидацию, добавляем его в список фидов
      if (!isDuplicateUrl(url)) {
        addFeed(url);
        // Очищаем инпут и устанавливаем фокус
        urlInput.value = '';
        urlInput.focus();
      } else {
        // Подсвечиваем красным рамку, если URL дублируется
        urlInput.style.borderColor = 'red';
      }
    })
    .catch((error) => {
      // Подсвечиваем красным рамку, если URL невалидный
      urlInput.style.borderColor = 'red';
    });
});

async function isDuplicateUrl(url) {
  // Проверяем наличие дубликата URL в списке фидов
  const feedList = await getFeedList(); // Получаем список фидов
  return feedList.includes(url);
};

function getFeedList() {
  // Получаем список фидов из локального хранилища
  return new Promise((resolve) => {
    const feedList = localStorage.getItem('feedList');
    resolve(feedList ? JSON.parse(feedList) : []);
  });
};

function addFeed(url) {
  // Добавляем URL в список фидов
  return getFeedList().then((feedList) => {
    feedList.push(url);
    saveFeedList(feedList);
  });
};

function saveFeedList(feedList) {
  // Сохраняем список фидов в локальном хранилище
  localStorage.setItem('feedList', JSON.stringify(feedList));
};
// Добавьте код для работы с формой RSS-потока
