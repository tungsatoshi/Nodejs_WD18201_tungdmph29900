const Joi = require("joi");
const schemaUsername = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
});
const schema = Joi.object({
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

module.exports = {
  schema,
  schemaUsername,
};
