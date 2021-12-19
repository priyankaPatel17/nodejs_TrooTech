const joi = require('joi');

exports.schemaKeys = joi.object({
  name: joi.string().required(),
}).unknown(true);

exports.updateSchemaKeys = joi.object({
  id: joi.number(),
  name: joi.string().required(),
}).unknown(true);
