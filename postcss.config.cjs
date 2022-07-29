'use strict';

/**
 * @type {Partial<import('postcss-load-config').Config>}
 */
const PostcssConfig = {
  plugins: [
    require('autoprefixer')(),
    require('@fullhuman/postcss-purgecss')({
      content: ['./**/*.html'],
      safelist: ['shown', 'visible', 'responsive', 'data-error'],
    }),
  ],
};

module.exports = PostcssConfig;
