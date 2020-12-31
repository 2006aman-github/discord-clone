const joi = require("joi");

const registerValidation = (data) => {
  const schema = joi.object({
    username: joi.string().min(6).max(50).required(),
    email: joi
      .string()
      .min(6)
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .max(50)
      .required(),
    password: joi.string().min(4).max(50).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = joi.object({
    email: joi
      .string()
      .min(6)
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .max(50)
      .required(),
    password: joi.string().min(4).max(50).required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
