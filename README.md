# @equinix-labs/docusaurus-plugin-localizejs

A [Docusaurus](https://docusaurus.io) plugin that injects the [Localize.js](https://localizejs.com) script and initializes it on every page of your Docusaurus site.

## Prerequisites

- A Localize account and project key from [localizejs.com](https://localizejs.com)
- A Docusaurus v2 or v3 site

## Installation

```bash
npm install @equinix-labs/docusaurus-plugin-localizejs
```

## Usage

Add the plugin to your `docusaurus.config.js`:

```js
// docusaurus.config.js
module.exports = {
  plugins: [
    [
      '@equinix-labs/docusaurus-plugin-localizejs',
      {
        key: 'YOUR_LOCALIZE_PROJECT_KEY',
        settings: {
          // optional Localize initialization settings
          // see https://developers.localizejs.com/reference/introduction
        },
      },
    ],
  ],
};
```

### Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `key` | `string` | Yes | Your Localize project key |
| `settings` | `object` | No | Additional [Localize initialization options](https://developers.localizejs.com/reference/introduction) passed to `Localize.initialize()` |

## How it works

The plugin uses the Docusaurus [`injectHtmlTags`](https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#injectHtmlTags) lifecycle method to inject the following into the `<head>` of every page:

1. The Localize CDN script (`https://global.localizecdn.com/localize.js`)
2. The Localize stub script (prevents errors if the CDN script has not yet loaded)
3. A `Localize.initialize()` call with your project key and any additional settings

## References

- [Localize.js](https://localizejs.com)
- [Localize API & SDK reference](https://developers.localizejs.com/reference/introduction)
- [Docusaurus plugin lifecycle APIs](https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis)
- [Docusaurus using plugins guide](https://docusaurus.io/docs/using-plugins)

## License

[MIT](./LICENSE)
