const Product = require("../../models")["products"];
const categorySchemaKey = require("../../utils/validation/categoryValidation");
const validation = require('../../utils/validateRequest');
const utils = require('../../utils/messages');
const categoryHelper = require("../../helpers/category")


const getAllCategories = async (req, res) => {
  try {
    let query = {};
    if (req.body.query !== undefined) {
      query = { ...req.body.query };
    }
    let result = await categoryHelper.getAll(query);
    console.log("Df", result)
    res.message = req.i18n.t("categories.retrieved");
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
      categorySchemaKey.schemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.error, res);
    }
    const data = {
      ...req.body,
      id: req.params.id,
    };
    let result = await categoryHelper.update(
      req.params.id,
      data
    );
    res.message = req.i18n.t("categories.updated");
    return !result
      ? utils.failureResponse("something is wrong", res)
      : utils.successResponse({ result }, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const add = async (req, res) => {
  try {
    console.log("body", req.body)
    let isValid = validation.validateParamsWithJoi(
      req.body,
      categorySchemaKey.schemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.error, res);
    }
    let result = await categoryHelper.create({ ...req.body });
    res.message = req.i18n.t("categories.created");
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

const destroy = async (req, res) => {
  try {
    let id = req.params.id;
    let categoryAssociated = await getCountOfDocuments(Product, {category_id : id})
    if(categoryAssociated){
      res.message = req.i18n.t("categories.associatedDelete");
      return utils.failureResponse(res.message, res);
    }
    let result = await categoryHelper.delete(id);
    res.message = req.i18n.t("categories.deleted");
    return utils.successResponse(result, res);
  } catch (error) {
    return utils.failureResponse(error, res);
  }
};

module.exports = {
  getAllCategories: getAllCategories,
  update: update,
  add: add,
  delete: destroy,
};
