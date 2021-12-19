const bcrypt = require('bcryptjs');
const Product = require("../models")['products'];

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(query={}) {
    // return await Product.findAll(query);
    return await Product.findAndCountAll({
        include: ['associateCategory']
    });
}

async function getById(id) {
    return await getProduct(id);
}

async function create(params) {
   const product = new Product(params);
   return await product.save(params);
}

async function update(id, params) {
    const product = await getProduct(id);
    await product.update(params);
    return product;
}

async function _delete(id) {
    const product = await getProduct(id);
    await product.destroy();
}

async function getProduct(id) {
    const product = await Product.findByPk(id);
    if (!product) throw 'Product not found';
    return product;
}