module.exports = function (sequelize, DataTypes) {
  var Category = sequelize.define(
    "categories",
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
  );
  Category.associate = (models) => {
    Category.hasMany(models.products,{
        as:'products'
    });
  }
  return Category;
};
