const styleguide = require('@vercel/style-guide/prettier');

module.exports = {
  singleQuote: true,
  trailingComma: 'all',
	arrowParens: 'avoid',
  ...styleguide,
  plugins: [...styleguide.plugins],
};
