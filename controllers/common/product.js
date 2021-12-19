const Product = require("../../models")['products'];
const productSchemaKey = require("../../utils/validation/productValidation");
const validation = require('../../utils/validateRequest');
const utils = require('../../utils/messages');
const productHelper = require("../../helpers/product")

const getAllProducts = async (req, res) => {
  try {
    let query = {};
    if (req.body.query !== undefined) {
      query = { ...req.body.query };
    }
    let result = await productHelper.getAll(query)
    res.message = req.i18n.t("products.retrieved");
    return utils.successResponse(result, res);
  } catch (error) {
    console.error(error);
    return utils.failureResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    let isValid = validation.validateParamsWithJoi(
      req.body,
      productSchemaKey.schemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.error, res);
    }
    const data = {
      ...req.body,
      id: req.params.id,
    };
    let result = await productHelper.update(
      req.params.id,
      data
    );
    res.message = req.i18n.t("products.updated");
    return !result
      ? utils.failureResponse("something is wrong", res)
      : utils.successResponse({ result }, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const add = async (req, res) => {
  try {
    let isValid = validation.validateParamsWithJoi(
      req.body,
      productSchemaKey.schemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.error, res);
    }
    let result = await productHelper.create({ ...req.body });
    res.message = req.i18n.t("products.created");
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const destroy = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await productHelper.delete(id);
    res.message = req.i18n.t("products.deleted");
    return utils.successResponse(result, res)
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

module.exports = {
  getAllProducts: getAllProducts,
  update: update,
  add: add,
  delete: destroy,
};
