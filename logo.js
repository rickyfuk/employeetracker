const logo = require('asciiart-logo');

const config = require('./package.json');
config.font = 'Calvin S';
config.logoColor = 'green';
config.textColor = 'green';
config.borderColor = 'grey';
console.log(logo(config).render());
