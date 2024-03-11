import * as yup from 'yup';

const isUrlInList = (url, feeds) => feeds.includes(url);

const isValid = (url, feeds) => {
  const validationSchema = yup.object().shape({
    url: yup.string()
      .url('Введите корректную ссылку.')
      .test('is-unique', 'Такой URL уже добавлен', (value) => !isUrlInList(value, feeds))
      .required('Введите URL.'),
  });

  return validationSchema.validate({ url })
    .then((validData) => ({ isValid: true, data: validData }))
    .catch((error) => ({ isValid: false, error: error.message }));
};

export default isValid;
