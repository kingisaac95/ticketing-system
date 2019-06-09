module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      pin: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      expiry: {
        type: Sequelize.DATE,
        unique: true
      },
      used: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable('Tickets')
};
