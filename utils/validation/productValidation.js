const joi = require('joi');

exports.schemaKeys = joi.object({
  // id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  name: joi.string().required(),
  description: joi.string().required(),
  category_id: joi.number().required(),
}).unknown(true);

exports.updateSchemaKeys = joi.object({
  id: joi.number(),
  name: joi.string().required(),
  description: joi.string().required(),
  category_id: joi.number().required(),
}).unknown(true);
