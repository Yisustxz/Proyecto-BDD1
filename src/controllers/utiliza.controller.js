const { pool } = require('../database')

const {
  paginatedItemsResponse,
  successItemsResponse,
  successResponse
} = require('../utils/response')
/* import StatusError from '../utils/status-error'
import { handleControllerError } from '../utils/handleControllerError' */

const STATUS_OK = 200
const STATUS_CREATED = 201
const STATUS_NOT_FOUND = 404

const DEFAULT_PAGE = 1
const DEFAULT_SIZE = 10

const getUtiliza = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query

    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const isEmpty = await pool.query('SELECT * FROM utiliza')
    if (isEmpty.rowCount === 0) {
      throw new Error('La tabla está vacía', STATUS_NOT_FOUND)
    }
    const response = await pool.query({
      text: 'SELECT * FROM utiliza ORDER BY num_unico, num_detalle, ci_trabajador, cod_producto'
    })
    const pagination = {
      total: isEmpty.rowCount,
      currentPage: Number(page),
      perPage: Number(size)
    }

    return paginatedItemsResponse(res, STATUS_OK, response.rows, pagination)
  } catch (error) {
    res.send(error.message)
  }
}

const getUtilizaById = async (req, res) => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM utiliza WHERE num_unico = $1 AND num_detalle = $2 AND ci_trabajador = $3 AND cod_producto = $4',
      values: [
        req.params.unic,
        req.params.detail,
        req.params.cod,
        req.params.num
      ]
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la utiliza con num_unico: ${req.params.unic}, num_detalle: ${req.params.detail}, ci_trabajador ${req.params.cod} y cod_producto: ${req.params.num}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows[0])
  } catch (error) {
    res.send(error.message)
  }
}

const getUtilizaFromRequestBody = (requestBody) => {
  const {
    num_unico,
    num_detalle,
    ci_trabajador,
    cod_producto,
    precio_actual,
    cantidad_usada
  } = requestBody

  const newUtiliza = [
    num_unico,
    num_detalle,
    ci_trabajador,
    cod_producto,
    precio_actual,
    cantidad_usada
  ]

  return newUtiliza
}

const addUtiliza = async (req, res) => {
  try {
    const newUtiliza = getUtilizaFromRequestBody(req.body)

    const insertar = await pool.query({
      text: 'INSERT INTO utiliza (num_unico, num_detalle, ci_trabajador, cod_producto, precio_actual, cantidad_usada) VALUES ($1, $2, $3, $4, $5, $6) RETURNING num_unico, num_detalle, ci_trabajador, cod_producto',
      values: newUtiliza
    })
    const insertedUnic = insertar.rows[0].num_unico
    const insertedDetail = insertar.rows[0].num_detalle
    const insertedCi = insertar.rows[0].ci_trabajador
    const insertedCod = insertar.rows[0].cod_producto
    const response = await pool.query({
      text: 'SELECT * FROM utiliza WHERE num_unico = $1 AND num_detalle = $2 AND ci_trabajador = $3 AND cod_producto = $4',
      values: [insertedUnic, insertedDetail, insertedCi, insertedCod]
    })
    return successItemsResponse(res, STATUS_CREATED, response.rows[0])
  } catch (error) {
    res.send(error.message)
  }
}

const deleteUtiliza = async (req, res) => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM utiliza WHERE num_unico = $1 AND num_detalle = $2 AND ci_trabajador = $3 AND cod_producto = $4',
      values: [
        req.params.unic,
        req.params.detail,
        req.params.cod,
        req.params.num
      ]
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el producto utilizado del servicio de numero: ${req.params.unic}, con el numero de detalle: ${req.params.detail}, realizado por el trabajador ${req.params.cod} y con el producto: ${req.params.num}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'Utiliza ha sido eliminado')
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = {
  getUtiliza,
  getUtilizaById,
  addUtiliza,
  deleteUtiliza
}
