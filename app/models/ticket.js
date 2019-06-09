export default function(sequelize, DataTypes) {
  const Ticket = sequelize.define(
    'Ticket',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      pin: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 12],
            msg: 'PIN must have more than one characters, no leading or trailing spaces'
          }
        }
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiry: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
    },
  );
  // Instance methods
  Ticket.associate = models => {
    Ticket.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Ticket;
}
