module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      role_id: {
        type: DataTypes.INTEGER, references: {model: 'users', key: 'id'}
      },
      install_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      first_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      last_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      phone: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    name: {
        type: DataTypes.VIRTUAL,
        get: function () {
          var firstName = this.getDataValue("first_name");
          var lastName = this.getDataValue("last_name");
          if (firstName && lastName) {
            return firstName + " " + lastName;
          }
        },
      },
    },
    {
      tableName: "users",
      freezeTableName: true,
      underscored: true,
      classMethods: {
        associate: function (models) {
          User.belongsTo(models.role, {
            foreignKey: "id",
          });
        },
      },
    }
  );

  return User;
};
