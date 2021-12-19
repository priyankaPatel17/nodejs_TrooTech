var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var dbUrl = process.env.DB_URL || "mysql://root:test123@localhost:3306/nodejs_test"
var sequelize = new Sequelize(dbUrl,{
  logging: false,
  define: {
    hooks: {
      afterCreate: function (model) {
        var date = new Date();
        model.update({ created_at: date.getTime() });
      },
      afterUpdate: function (model) {
        var date = new Date();
        model.update({ updated_at: date.getTime() });
      },
    },
  },
}
);
var db = {};

fs.readdirSync(__dirname)
  .filter(function (file) {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach(function (file) {
    var model =  require(path.join(__dirname, file))(sequelize, Sequelize)
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
