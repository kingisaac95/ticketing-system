const Chance = require('chance');
const uuidv4 = require('uuid/v4');

const chance = new Chance();

module.exports = {
  up(queryInterface) {
    let firstName;
    let lastName;
    let username;

    return queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        fullName: 'Emeka Ofo',
        userName: 'emeka.ofo',
        plateNo: '657-787-8897',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      ...Array.from(Array(4).keys()).map(() => {
        firstName = chance.first();
        lastName = chance.last();
        username = `${firstName}.${lastName}`;

        return {
          id: uuidv4(),
          fullName: `${firstName} ${lastName}`,
          username,
          plateNo: chance.phone(),
          password: chance.string({ length: 7 }),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    ]);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, { returning: true });
  }
};
