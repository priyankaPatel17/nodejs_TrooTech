module.exports = function (sequelize, DataTypes) {
  var Product = sequelize.define(
    "products",
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
      category_id: {
        type: DataTypes.INTEGER, references: {model: 'categories', key: 'id'}
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      }
    }  
    );
  Product.associate = (models) => {
    Product.belongsTo(models.categories,{
        as:'associateCategory',
        foreignKey: 'category_id',
        onDelete: 'CASCADE'
    });
}
  return Product;
};
