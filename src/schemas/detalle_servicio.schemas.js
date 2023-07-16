const { z } = require('zod')

const detalleServicioSchema = z.object({
  num_unico: z.number().int('el numero unico debe ser entero'),
  cantidad: z
    .number()
    .int('La cantidad debe ser entero')
    .positive('la cantidad debe ser positiva'),
  costo: z.number()
})

const detalleServicioSchemaU = z.object({
  cantidad: z
    .number()
    .int('La cantidad debe ser entero')
    .positive('la cantidad debe ser positiva'),
  costo: z.number()
})

module.exports = { detalleServicioSchema, detalleServicioSchemaU }
