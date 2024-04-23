// Создаем функцию для динамической загрузки стилей
const loadStyles = () => {
    // Создаем ссылку на элемент style
    const styleElement = document.createElement('link');
    styleElement.rel = 'stylesheet';
    styleElement.href = './styles.scss';
    // Добавляем элемент style в конец тега <head>
    document.head.appendChild(styleElement);
  };
  // Вызываем функцию загрузки стилей
  loadStyles();
  // Импортируем Bootstrap
  import 'bootstrap';
  // Импортируем основной код приложения
  import app from './app.js';
  // Вызываем функцию инициализации приложения
  app();
  