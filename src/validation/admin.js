import Joi from "joi";

export const loginValidate = (data) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return Schema.validate(data);
};

export const signUpValidate = (data) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
    salesArea: Joi.array().required(),
  });
  return Schema.validate(data);
};
