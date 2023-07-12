const { z } = require('zod')

const modelosSchema = z.object({
  cod_modelo: z
    .string()
    .nonempty('Es necesario indicar un codigo de un modelo de carro')
    .max(5, 'El codigo del modelo es demasiado largo'),
  nombre_modelo: z
    .string()
    .nonempty('Es necesario indicar un nombre del modelo')
    .max(20, 'El nombre debe ser menor a 20 carácteres'),
  num_asiento: z.number().int('Tiene que ser un numero entero'),
  marca: z.string().max(10, 'El nombre de la marca es demasiado larga'),
  peso: z.number(),
  t_aceite: z.enum(['AM', 'AS', 'ASS', 'AAM', 'AMG']),
  aceite_caja: z
    .string()
    .nonempty('es necesario indicar el aceite de caja que usa el modelo')
    .max(6, 'El aceite de caja ingresado es demasiado largo'),
  octanaje: z
    .string()
    .nonempty('Es necesario indicar el octanaje del modelo')
    .max(2, 'El octanaje ingresado es demasiado largo'),
  t_refrigerante: z
    .string()
    .nonempty('Es necesario indicar el tipo de refrigerante')
    .max(5, 'El tipo de refrigerante es demasiado largo')
})

const modelosSchemaU = z.object({
  nombre_modelo: z
    .string()
    .nonempty('Es necesario indicar un nombre del modelo')
    .max(20, 'El nombre debe ser menor a 20 carácteres'),
  num_asiento: z.number().int('Tiene que ser un numero entero'),
  marca: z.string().max(10, 'El nombre de la marca es demasiado larga'),
  peso: z.number(),
  t_aceite: z.enum(['AM', 'AS', 'ASS', 'AAM', 'AMG']),
  aceite_caja: z
    .string()
    .nonempty('es necesario indicar el aceite de caja que usa el modelo')
    .max(6, 'El aceite de caja ingresado es demasiado largo'),
  octanaje: z
    .string()
    .nonempty('Es necesario indicar el octanaje del modelo')
    .max(2, 'El octanaje ingresado es demasiado largo'),
  t_refrigerante: z
    .string()
    .nonempty('Es necesario indicar el tipo de refrigerante')
    .max(5, 'El tipo de refrigerante es demasiado largo')
})

module.exports = { modelosSchema, modelosSchemaU }
