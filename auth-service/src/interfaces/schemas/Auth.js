const Joi = require('joi');

class AuthSchema {
  register = () => {
    return Joi.object({
      name: Joi.string().trim().min(2).max(50).required().label('name'),
      lastname: Joi.string().trim().min(3).max(50).required().label('lastname'),
      email: Joi.string().trim().email().max(64).required().label('email'),
      phone: Joi.string().trim().min(8).max(15).required().label('phone'),
      password: Joi.string().trim().min(8).max(64).required().label('password'),
      photo: Joi.string().uri().trim().max(128).allow('').optional().label('photo'),
      dob: Joi.date().iso().less('now').greater(new Date('1950-01-01')).required().label('dob'),
      country: Joi.string().trim().pattern(/^[A-Za-zÀ-ÿ\u00f1\u00d1\s]+$/).min(2).max(56).required().label('country'),
      school: Joi.string().trim().min(2).max(55).required().label('school'),
      graduation_year: Joi.number().integer().min(1950).max(2100).required().label('graduation_year'),
      terms: Joi.boolean().required().label('terms'),
      roles: Joi.array().items(Joi.string().trim()).unique().optional().label('roles'),
    });
  };

  login = () => {
    return Joi.object({
      email: Joi.string().trim().email().max(64).required().label('email'),
      password: Joi.string().trim().min(8).max(64).required().label('password'),
    });
  };

  loginSocial = () => {
    return Joi.object({
      socialToken: Joi.string().trim().required().label('socialToken'),
    });
  };

  sendVerificationCode = () => {
    return Joi.object({
      email: Joi.string().trim().email().max(64).required().label('email'),
      code: Joi.string().trim().min(6).max(6).optional().label('code'),
    });
  };

  verifyAccount = () => {
    return Joi.object({
      email: Joi.string().trim().email().max(64).required().label('email'),
      code: Joi.string().trim().min(6).max(6).required().label('code'),
    });
  };

  forgotPassword = () => {
    return Joi.object({
      email: Joi.string().trim().email().max(64).required().label('email'),
      code: Joi.string().trim().min(6).max(6).optional().label('code'),
    });
  };

  resetPassword = () => {
    return Joi.object({
      email: Joi.string().trim().email().max(64).required().label('email'),
      password: Joi.string().trim().min(8).max(64).required().label('password'),
      code: Joi.string().trim().min(6).max(6).required().label('code'),
    });
  };
}

module.exports = new AuthSchema();
