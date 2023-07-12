const { z } = require('zod')

const trabajadoresSchema = z.object({
  ci_trabajador: z
    .string()
    .nonempty('Es necesario indicar una cedula del encargado')
    .max(8, 'La cedula es demasiado larga'),
  nombre_trabajador: z
    .string()
    .nonempty('Es necesario indicar un nombre del trabajador')
    .max(40, 'El nombre debe ser menor a 40 carácteres'),
  direccion_trabajador: z
    .string()
    .nonempty('Es necesario indicar una direccion del trabajador'),
  telefono_trabajador: z
    .string()
    .max(11, 'El numero de telefono solo puede tener 11 caracteres'),
  sueldo_trabajador: z.number().positive('El numero tiene que ser positivo'),
  cargo: z.enum(['A'])
})

const trabajadoresSchemaU = z.object({
  nombre_trabajador: z
    .string()
    .nonempty('Es necesario indicar un nombre del trabajador')
    .max(40, 'El nombre debe ser menor a 40 carácteres'),
  direccion_trabajador: z
    .string()
    .nonempty('Es necesario indicar una direccion del trabajador'),
  telefono_trabajador: z
    .string()
    .max(11, 'El numero de telefono solo puede tener 11 caracteres'),
  sueldo_trabajador: z.number().positive('El numero tiene que ser positivo'),
  cargo: z.enum(['A'])
})

module.exports = { trabajadoresSchema, trabajadoresSchemaU }
