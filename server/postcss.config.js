module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-import': {},
    'postcss-mixins': {},
    'postcss-preset-env': {
      stage: 2, // default
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
      },
    },
  },
};
