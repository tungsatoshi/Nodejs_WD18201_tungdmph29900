const Joi = require("joi");
const schemaProduct = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(100).required(),
});
module.exports = {
  schemaProduct,
};
