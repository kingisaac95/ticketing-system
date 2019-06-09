import bcrypt from 'bcrypt';

export default function(sequelize, DataTypes) {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      fullName: {
        type: DataTypes.STRING,
        notNull: {
          args: true,
          msg: 'Full name is required'
        }
      },
      username: {
        type: DataTypes.STRING,
        notNull: {
          args: true,
          msg: 'Username is required'
        },
        unique: {
          args: true,
          msg: 'Username already registered to another user'
        }
      },
      plateNo: {
        type: DataTypes.STRING,
        notNull: {
          args: true,
          msg: 'Plate number is required'
        },
        unique: {
          args: true,
          msg: 'Plate number already registered to another user'
        }
      },
      password: {
        type: DataTypes.STRING,
        notNull: true
      }
    },
    {
      hooks: {
        beforeCreate(user) {
          user.hashPassword();
        },
        beforeUpdate(user) {
          if (user._changed.password)
            user.hashPassword(); /* eslint no-underscore-dangle: ["error", { "allow": ["_changed"] }] */
        }
      }
    }
  );

  // Instance methods
  User.prototype.hashPassword = function hashPassword() {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  };

  User.prototype.matchPassword = function matchPassword(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
}
