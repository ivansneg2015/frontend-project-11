import * as yup from 'yup';
import i18next from 'i18next';

const isUrlInList = (url, feeds) => feeds.includes(url);

const isValid = (url, feeds) => {
  const validationSchema = yup.object().shape({
    url: yup.string()
      .url(i18next.t('validation.url.invalid'))
      .test('is-unique', i18next.t('validation.url.unique'), (value) => !isUrlInList(value, feeds))
      .required(i18next.t('validation.url.required')),
  });

  return validationSchema.validate({ url })
    .then((validData) => ({ isValid: true, data: validData }))
    .catch((error) => ({ isValid: false, error: error.message }));
};

export default isValid;
