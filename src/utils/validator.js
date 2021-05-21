import 'joi';

import Response from 'utils/response';

export default async (schema, toValidate, res, next) => {
  try {
    await schema.validateAsync(toValidate);
    next();
  } catch (error) {
    return Response.validationError(res, error.message);
  }
};
