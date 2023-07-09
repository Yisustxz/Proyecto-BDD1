const { errorResponse, errorResponseWithField } = require('../utils/response')
const { ZodError } = require('zod')

const schemaValidator = (schema) => (req, res, next) => {
  if (!schema) {
    return errorResponse(res, 500, 'hola INTERNAL_SERVER_ERROR')
  }

  try {
    console.log(req.body)
    schema.parse(req.body)
    return next()
  } catch (error) {
    console.log('hola', error)
    if (error instanceof ZodError) {
      return errorResponseWithField(
        res,
        400,
        error.issues[0].path[0],
        error.issues[0].message
      )
    }
    return errorResponse(res, 500, 'INTERNAL_SERVER_ERROR')
  }
}

module.exports = { schemaValidator }
