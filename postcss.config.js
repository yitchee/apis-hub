const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    tailwindcss,
    require('./tailwind.config.js'),
    autoprefixer,
  ],
};