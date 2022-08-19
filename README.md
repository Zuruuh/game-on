# Game On

## Usage

### Installation

To setup the project locally, you need to meet the following requirements:

- Git
- NodeJS (Version ^16, prefer installation using [NVM](https://github.com/nvm-sh/nvm))
- PNPM (Version ^7 recommended, install with `npm i -g pnpm`)
- Docker (Not required but useful if playwright is not compatible with your environment)

Once everything is installed, you can clone the project locally with the following command:

```shell
git clone git@github.com:Zuruuh/game-on
cd game-on
```

Then, install all the npm dependencies with `pnpm install`.

### Development

To run the project locally, use the npm script _dev_ with `pnpm run dev`, and the project will be served locally at http://localhost:5173.
You will benefit from ViteJS Hot Module Replacement which will update all your code directly in your browser when you edit it.

### Testing

Playwright is used to test the website's features. To set it up locally, try to run the command `pnpm run playwright:install`.
If you receive an error message telling you that your os is not supported you can use the docker alternative by running `pnpm run docker:build`.

Once the installation step is done, simply run `pnpm run playwright:test` (or `pnpm run docker:test` if you are using docker) and everything should be good to go!

### Production

To build the project for production, simply run `pnpm run build` and you will get your prod-ready project in the _./dist_ folder.

## Tools

This project has multiple tools setup by default, let's take a look at all of them 🚀

- [Playwright](https://playwright.dev)
  - Playwright is an end-to-end test runner which is very easy to set up and get started with.
  - It allows developers to test quickly their web-app with multiple browsers & size screen.
- Linters, Formatters, Static-Code Analyzers
  - [Prettier](https://prettier.io)
  - [Eslint](https://eslint.org)
- [ViteJS](https://vitejs.dev)
  - Very popular module bundler which is known for its speed and fast-growing community.  
    It utilizes Hot Module Replacement to update your code directly in your browser without loosing its state and extremely fast.
- [PostCSS](https://postcss.org)
  - Tool used to apply modifications on css during build time, has a very large plugin ecosystem that can help a lot with common issues.
  * [PurgeCSS](https://purgecss.com)
    - Reduces drastically final css bundle size by making sure every css selector is actually used in final html files, and will get rid of unused ones.
  * [Autoprefixer](https://autoprefixer.github.io)
    - Makes sure our css will support as much browsers as possible by adding custom vendor prefixes to css declarations that might behave differently depending on the browser interpreting it.
- [GitHub Pages](https://pages.github.com)
  - Free web hosting offered by GitHub with easy configuration and access directly from a GitHub repository's settings
- [GitHub Actions](https://github.com/features/actions)
  - Continuous Integration
    - Since this project utilizes a lot ot linters, formatters, static-code analyzers, etc... Making sure they are correctly used is vital!  
      All linters are run whenever someone pushes on a branch, and they need to all pass in order to be able to merge a pull request.
  - Continuous Deployment (w/ GitHub Pages)
    - This project uses GitHub Actions to re-deploy whenever someone updates the main branch.  
      (All assets are built beforehand using ViteJS)
