const bcrypt = require('bcryptjs');
const Category = require("../models")['categories'];

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(query={}) {
    return await Category.findAll(query);
}

async function getById(id) {
    return await getCategory(id);
}

async function create(params) {
   const category = new Category(params);
   console.log("df", category)
   return await category.save();
}

async function update(id, params) {
    const category = await getCategory(id);
    category.update(params);
    return category
}

async function _delete(id) {
    const category = await getCategory(id);
    await category.destroy();
}

async function getCategory(id) {
    const category = await Category.findByPk(id);
    if (!category) throw 'Category not found';
    return category;
}