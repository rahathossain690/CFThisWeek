# JavaScript Chrome Extension Boilerplate

<!-- [![](https://img.shields.io/badge/Fork%20on-CodeSandbox-blue)](https://githubbox.com/extend-chrome/javascript-boilerplate) -->
[![GitHub last commit](https://img.shields.io/github/last-commit/extend-chrome/javascript-boilerplate.svg)](https://github.com/extend-chrome/rollup-plugin-javascript-boilerplate)

A basic boilerplate that gets you started quickly. It supports modern, modular
JavaScript and automatic reloading during development. ESLint and Prettier
included.

This is a great starting place for a proof of concept or a simple Chrome
extension. If you need more, like React and CSS imports, check out our React
boilerplate.

## Get Started

Type this into your terminal:

```sh
git clone https://github.com/extend-chrome/javascript-boilerplate
npm install
```

### Development

For development with automatic reloading:

```sh
npm run start
```

Open the [Extensions Dashboard](chrome://extensions), make sure "Developer mode"
is switched on, click "Load unpacked", and choose the `dist` folder.

### Production

You'll want to make a production build when it's time to publish your Chrome
Extension. Run the following line:

```sh
npm run build
```

This will create a ZIP file with your package name and version in the `releases`
folder.

## Source Layout

Your manifest is at `src/manifest.json`, and Rollup will bundle any files you
include here. All the filepaths in your manifest should point to files in `src`.
