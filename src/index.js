import { Joi } from '@docusaurus/utils-validation'

export default async function localizeJs(
  context,
  options,
) {
  return {
    name: 'docusaurus-localize-js-plugin',

    contentLoaded({actions}) {
      actions.setGlobalData(options);
    },

    injectHtmlTags() {
      const localizeConfig = Object.assign({}, options.settings, { key: options.key });
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              src: `https://global.localizecdn.com/localize.js`,
            },
          },
          {
            tagName: 'script',
            innerHTML: '(function(a){if(!a.Localize){a.Localize={};for(var e=["translate","untranslate","phrase","initialize","translatePage","setLanguage","getLanguage","getSourceLanguage","detectLanguage","getAvailableLanguages","setWidgetLanguages","hideLanguagesInWidget","untranslatePage","bootstrap","prefetch","on","off","hideWidget","showWidget"],t=0;t<e.length;t++)a.Localize[e[t]]=function(){};}})(window);',
          },
          {
            tagName: 'script',
            innerHTML: `
              Localize.initialize(${JSON.stringify(localizeConfig)});
            `,
          },
        ],
      };
    },
  };
}

const optionsSchema = Joi.object({
  key: Joi.string().required(),
  settings: Joi.object()
});

export function validateOptions({ options, validate }) {
  return validate(optionsSchema, options);
}