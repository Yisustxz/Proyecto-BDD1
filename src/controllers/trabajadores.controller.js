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

const getTrabajadores = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query

    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const isEmpty = await pool.query('SELECT * FROM trabajadores')
    if (isEmpty.rowCount === 0) {
      throw new Error('La tabla está vacía', STATUS_NOT_FOUND)
    }
    const response = await pool.query({
      text: 'SELECT * FROM trabajadores ORDER BY ci_trabajador LIMIT $1 OFFSET $2',
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

const getTrabajadorById = async (req, res) => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM trabajadores WHERE ci_trabajador = $1',
      values: [req.params.id]
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el trabajador de CI: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows[0])
  } catch (error) {
    res.send(error.message)
  }
}

const getTrabajadorFromRequestBody = (requestBody) => {
  const {
    ci_trabajador,
    nombre_trabajador,
    direccion_trabajador,
    telefono_trabajador,
    sueldo_trabajador,
    cargo
  } = requestBody

  const newTrabajador = [
    ci_trabajador,
    nombre_trabajador,
    direccion_trabajador,
    telefono_trabajador,
    sueldo_trabajador,
    cargo
  ]

  return newTrabajador
}

const getTrabajadorFromRequestBodyU = (requestBody) => {
  const {
    nombre_trabajador,
    direccion_trabajador,
    telefono_trabajador,
    sueldo_trabajador,
    cargo
  } = requestBody

  const newTrabajador = [
    nombre_trabajador,
    direccion_trabajador,
    telefono_trabajador,
    sueldo_trabajador,
    cargo
  ]

  return newTrabajador
}

const addTrabajador = async (req, res) => {
  try {
    const newTrabajador = getTrabajadorFromRequestBody(req.body)

    const insertar = await pool.query({
      text: 'INSERT INTO trabajadores (ci_trabajador,nombre_trabajador,direccion_trabajador, telefono_trabajador,sueldo_trabajador,cargo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING ci_trabajador',
      values: newTrabajador
    })
    const insertedCi = insertar.rows[0].ci_trabajador
    const response = await pool.query({
      text: 'SELECT * FROM trabajadores WHERE ci_trabajador = $1',
      values: [insertedCi]
    })
    return successItemsResponse(res, STATUS_CREATED, response.rows[0])
  } catch (error) {
    res.send(error.message)
  }
}

const updateTrabajador = async (req, res) => {
  try {
    const updateTrabajador = getTrabajadorFromRequestBodyU(req.body)
    updateTrabajador.push(req.params.id)
    const response = await pool.query({
      text: 'UPDATE trabajadores SET nombre_trabajador = $1,  direccion_trabajador = $2, telefono_trabajador = $3,sueldo_trabajador = $4, cargo = $5 WHERE ci_trabajador = $6',
      values: updateTrabajador
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el trabajador de CI: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'Trabajador modificado exitosamente')
  } catch (error) {
    res.send(error.message)
  }
}

const deleteTrabajador = async (req, res) => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM trabajadores WHERE ci_trabajador = $1',
      values: [req.params.id]
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el trabajador de CI: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'El trabajador ha sido eliminado')
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = {
  getTrabajadores,
  getTrabajadorById,
  addTrabajador,
  updateTrabajador,
  deleteTrabajador
}
