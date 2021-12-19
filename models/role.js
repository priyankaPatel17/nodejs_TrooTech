module.exports = function (sequelize, DataTypes) {
  var Role = sequelize.define(
    "roles",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      }
    },
    {
      tableName: "roles",
      freezeTableName: true,
      underscored: true,
      classMethods: {
        associate: function (models) {
          Role.hasMany(models.users, {
            foreignKey: "id"
          });
        },
      },
    }
  );
  return Role;
};
