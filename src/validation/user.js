import Joi from "joi";

export const createUserValidate = (data) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    salesArea: Joi.array().required(),
    role: Joi.string().required(),
  });
  return Schema.validate(data);
};

export const updateUserValidate = (data) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    salesArea: Joi.array().required(),
    role: Joi.string().required(),
  });
  return Schema.validate(data);
};

export const changePasswordValidate = (data) => {
  const Schema = Joi.object({
    currentPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
    confirmPassword: Joi.any()
      .valid(Joi.ref("newPassword"))
      .required()
      .options({
        messages: {
          "any.only": "New password and Confirm password does not match.",
        },
      }),
  });
  return Schema.validate(data);
};

export const createNewPasswordValidate = (data) => {
  const Schema = Joi.object({
    email: Joi.string().required(),
  });
  return Schema.validate(data);
};
