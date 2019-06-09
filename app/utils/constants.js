const uuidv4 = require('uuid/v4');

const userId = uuidv4();
const types = ['one-day', 'one-week', 'one-month'];

module.exports = {
  userId,
  types,
  // ...
};
