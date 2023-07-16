const { z } = require('zod')

const ordenServicioSchema = z.object({
  ci_autorizada: z
    .string()
    .max(
      8,
      'La cedula de la persona autorizada puede tener como máximo 8 dígitos'
    )
    .nullable()
    .optional(),
  nombre_autorizada: z
    .string()
    .max(
      40,
      'El nombre de la persona autorizada puede tener como máximo 40 caracteres'
    )
    .nullable()
    .optional(),
  hora_entrada: z.string().refine(
    (hora) => {
      const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/
      return regex.test(hora)
    },
    { message: 'La hora debe estar en formato HH:MM y ser válida' }
  ),
  hora_salida_estimada: z.string().refine(
    (hora) => {
      const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/
      return regex.test(hora)
    },
    { message: 'La hora debe estar en formato HH:MM y ser válida' }
  ),
  hora_salida_real: z.string().refine(
    (hora) => {
      const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/
      return regex.test(hora)
    },
    { message: 'La hora debe estar en formato HH:MM:SS y ser válida' }
  ),
  fecha_entrada: z.string().refine(
    (fecha) => {
      const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/
      return regex.test(fecha)
    },
    { message: 'La fecha debe estar en formato YYYY-MM-DD y ser válida' }
  ),
  fecha_salida_estimada: z.string().refine(
    (fecha) => {
      const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/
      return regex.test(fecha)
    },
    { message: 'La fecha debe estar en formato YYYY-MM-DD y ser válida' }
  ),
  fecha_salida_real: z.string().refine(
    (fecha) => {
      const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/
      return regex.test(fecha)
    },
    { message: 'La fecha debe estar en formato YYYY-MM-DD y ser válida' }
  ),
  placa: z
    .string()
    .nonempty('Debe indicar la placa del vehículo')
    .max('La placa tiene como máximo 7 caracteres'),
  ci_trabajador: z
    .string()
    .nonempty('Debe indicar la cédula del trabajador')
    .max(8, 'La cédula tiene como máximo 8 dígitos')
})

const ordenServicioSchemaU = z.object({
  ci_autorizada: z
    .string()
    .max(
      8,
      'La cedula de la persona autorizada puede tener como máximo 8 dígitos'
    )
    .nullable()
    .optional(),
  nombre_autorizada: z
    .string()
    .max(
      40,
      'El nombre de la persona autorizada puede tener como máximo 40 caracteres'
    )
    .nullable()
    .optional(),
  hora_entrada: z.string().refine(
    (hora) => {
      const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/
      return regex.test(hora)
    },
    { message: 'La hora debe estar en formato HH:MM:SS y ser válida' }
  ),
  hora_salida_estimada: z.string().refine(
    (hora) => {
      const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/
      return regex.test(hora)
    },
    { message: 'La hora debe estar en formato HH:MM:SS y ser válida' }
  ),
  hora_salida_real: z.string().refine(
    (hora) => {
      const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/
      return regex.test(hora)
    },
    { message: 'La hora debe estar en formato HH:MM:SS y ser válida' }
  ),
  fecha_entrada: z.string().refine(
    (fecha) => {
      const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/
      return regex.test(fecha)
    },
    { message: 'La fecha debe estar en formato YYYY-MM-DD y ser válida' }
  ),
  fecha_salida_estimada: z.string().refine(
    (fecha) => {
      const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/
      return regex.test(fecha)
    },
    { message: 'La fecha debe estar en formato YYYY-MM-DD y ser válida' }
  ),
  fecha_salida_real: z.string().refine(
    (fecha) => {
      const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/
      return regex.test(fecha)
    },
    { message: 'La fecha debe estar en formato YYYY-MM-DD y ser válida' }
  ),
  placa: z
    .string()
    .nonempty('Debe indicar la placa del vehículo')
    .max('La placa tiene como máximo 7 caracteres'),
  ci_trabajador: z
    .string()
    .nonempty('Debe indicar la cédula del trabajador')
    .max(8, 'La cédula tiene como máximo 8 dígitos')
})

module.exports = { ordenServicioSchema, ordenServicioSchemaU }
