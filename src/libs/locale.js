module.exports = (locales) => {
  const replace = (template, data) =>
    (template || '').replace(/{(\w*)}/g, (_, key) =>
      Object.prototype.hasOwnProperty.call(data || {}, key) ? data[key] : ''
    );

  const translate = (key, locale, params) => {
    if (!locales[locale]) {
      // eslint-disable-next-line no-param-reassign
      locale = 'en';
    }

    return replace(locales[locale][key], params) || key;
  };

  const createTranslateFunc = (locale) => (key, params) => translate(key, locale || 'en', params);

  return { translate, createTranslateFunc };
};
