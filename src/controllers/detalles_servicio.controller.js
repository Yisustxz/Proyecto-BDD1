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

const getDetalleServicio = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query

    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const isEmpty = await pool.query('SELECT * FROM detalle_servicio')
    if (isEmpty.rowCount === 0) {
      throw new Error('La tabla está vacía', STATUS_NOT_FOUND)
    }
    const response = await pool.query({
      text: 'SELECT * FROM detalle_servicio ORDER BY num_unico, num_detalle LIMIT $1 OFFSET $2',
      values: [size, offset]
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

const getDetalleServicioById = async (req, res) => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM detalle_servicio WHERE num_unico = $1 AND num_detalle = $2',
      values: [req.params.num, req.params.cod]
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el detalle de servicio de numero: ${req.params.num} y el numero de detalle de: ${req.params.cod}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows[0])
  } catch (error) {
    res.send(error.message)
  }
}

const getDetalleServicioFromRequestBody = (requestBody) => {
  const { num_unico, cantidad, costo, num_detalle } = requestBody

  const newDetalleServicio = [num_unico, cantidad, costo, num_detalle]

  return newDetalleServicio
}

const getDetalleServicioFromRequestBodyU = (requestBody) => {
  const { cantidad, costo } = requestBody

  const newDetalleServicio = [cantidad, costo]

  return newDetalleServicio
}

const addDetalleServicio = async (req, res) => {
  try {
    const newDetalleServicio = getDetalleServicioFromRequestBody(req.body)

    const insertar = await pool.query({
      text: 'INSERT INTO detalle_servicio (num_unico,cantidad,costo,num_detalle) VALUES ($1, $2, $3, $4) RETURNING num_unico,num_detalle',
      values: newDetalleServicio
    })
    const insertedNum_unico = insertar.rows[0].num
    const insertedNum_detalle = insertar.rows[0].cod
    const response = await pool.query({
      text: 'SELECT * FROM detalle_servicio WHERE num_unico = $1 AND num_detalle = $2',
      values: [insertedNum_unico, insertedNum_detalle]
    })
    return successItemsResponse(res, STATUS_CREATED, response.rows[0])
  } catch (error) {
    res.send(error.message)
  }
}

const updateDetalleServicio = async (req, res) => {
  try {
    const updateDetalleServicios = getDetalleServicioFromRequestBodyU(req.body)
    updateDetalleServicios.push(req.params.num)
    updateDetalleServicios.push(req.params.cod)
    const response = await pool.query({
      text: 'UPDATE detalle_servicio SET cantidad = $1, costo = $2 WHERE num_unico = $3 AND num_detalle = $4',
      values: updateDetalleServicios
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el detalle del servicio de numero: ${req.params.num} y de detalle ${req.params.cod}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(
      res,
      STATUS_OK,
      'El detalle del servicio se ha modificado exitosamente'
    )
  } catch (error) {
    res.send(error.message)
  }
}

const deleteDetalleServicio = async (req, res) => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM detalle_servicio WHERE num_unico = $1 AND num_detalle = $2',
      values: [req.params.num, req.params.cod]
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el detalle de servicio de numero: ${req.params.num} y el numero de detalle ${req.params.cod}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(
      res,
      STATUS_OK,
      'El detalle de servicio se ha sido eliminado'
    )
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = {
  getDetalleServicio,
  getDetalleServicioById,
  addDetalleServicio,
  updateDetalleServicio,
  deleteDetalleServicio
}
