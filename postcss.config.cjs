// @ts-check
'use strict';

/**
 * @type {Partial<import('postcss-load-config').Config>} PostcssConfig
 */
const PostcssConfig = {
  plugins: [
    require('autoprefixer')(),
    require('@fullhuman/postcss-purgecss')({
      content: ['./**/*.html'],
    }),
  ],
};

module.exports = PostcssConfig;
