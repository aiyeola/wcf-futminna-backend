import 'joi';

import Response from './response';

export default async (schema, toValidate, res, next) => {
  try {
    await schema.validateAsync(toValidate);
    next();
  } catch (error) {
    return Response.validationError(res, error.message);
  }
};
