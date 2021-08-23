import Joi from 'joi';

import Schema from './schema/index';
import validator from '../utils/validator';

export default class userValidator {
  static async validateSignUp(req, res, next) {
    const schema = Joi.object().keys({
      username: Schema.name,
      password: Schema.password,
    });
    validator(schema, req.body, res, next);
  }

  static async validateSignIn(req, res, next) {
    const schema = Joi.object().keys({
      username: Joi.string()
        .required()
        .error(new Error('username is required')),
      password: Joi.string()
        .required()
        .error(new Error('password is required')),
    });
    validator(schema, req.body, res, next);
  }
}
