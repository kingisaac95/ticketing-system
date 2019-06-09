const Chance = require('chance');
const uuidv4 = require('uuid/v4');
const constants = require('../utils/constants');

const chance = new Chance();

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Merchants', [
      {
        id: uuidv4(),
        pin: '123-456-789',
        type: constants.types[2],
        expiry: new Date(),
        used: true,
        userId: constants.userId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      ...Array.from(Array(3).keys()).map(() => ({
          id: uuidv4(),
          pin: chance.phone(),
          type: chance.pickone(constants.types),
          expiry: new Date(),
          used: false,
          userId: null,
          createdAt: new Date(),
          updatedAt: new Date()
      }))
    ]);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Merchants', null, { returning: true });
  }
};
