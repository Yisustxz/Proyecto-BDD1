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

const getEncargados = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query

    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const isEmpty = await pool.query('SELECT * FROM encargados')
    if (isEmpty.rowCount === 0) {
      throw new Error('La tabla está vacía', STATUS_NOT_FOUND)
    }
    const response = await pool.query({
      text: 'SELECT * FROM encargados ORDER BY ci_encargado LIMIT $1 OFFSET $2',
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

const getEncargadoById = async (req, res) => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM encargados WHERE ci_encargado = $1',
      values: [req.params.id]
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el encargado de CI: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows[0])
  } catch (error) {
    res.send(error.message)
  }
}

const getEncargadoFromRequestBody = (requestBody) => {
  const {
    ci_encargado,
    nombre_encargado,
    direccion_encargado,
    telefono_encargado,
    correo_encargado,
    telefono_secundario_encargado
  } = requestBody

  const newEncargado = [
    ci_encargado,
    nombre_encargado,
    direccion_encargado,
    telefono_encargado,
    correo_encargado,
    telefono_secundario_encargado
  ]

  return newEncargado
}

const getEncargadoFromRequestBodyU = (requestBody) => {
  const {
    nombre_encargado,
    direccion_encargado,
    telefono_encargado,
    correo_encargado,
    telefono_secundario_encargado
  } = requestBody

  const newEncargado = [
    nombre_encargado,
    direccion_encargado,
    telefono_encargado,
    correo_encargado,
    telefono_secundario_encargado
  ]

  return newEncargado
}

const addEncargado = async (req, res) => {
  try {
    const newEncargado = getEncargadoFromRequestBody(req.body)

    const insertar = await pool.query({
      text: 'INSERT INTO encargados (ci_encargado,nombre_encargado,direccion_encargado,telefono_encargado, correo_encargado, telefono_secundario_encargado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING ci_encargado',
      values: newEncargado
    })
    const insertedCi = insertar.rows[0].ci_encargado
    const response = await pool.query({
      text: 'SELECT * FROM encargados WHERE ci_encargado = $1',
      values: [insertedCi]
    })
    return successItemsResponse(res, STATUS_CREATED, response.rows[0])
  } catch (error) {
    res.send(error.message)
  }
}

const updateEncargado = async (req, res) => {
  try {
    const updateEncargado = getEncargadoFromRequestBodyU(req.body)
    updateEncargado.push(req.params.id)
    const response = await pool.query({
      text: 'UPDATE encargados SET nombre_encargado = $1,  direccion_encargado = $2, telefono_encargado = $3,correo_encargado = $4, telefono_secundario_encargado = $5 WHERE ci_encargado = $6',
      values: updateEncargado
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el encargado de CI: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(
      res,
      STATUS_OK,
      'El Encargado modificado exitosamente'
    )
  } catch (error) {
    res.send(error.message)
  }
}

const deleteEncargado = async (req, res) => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM encargados WHERE ci_encargado = $1',
      values: [req.params.id]
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el encargado de CI: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'El Encargado ha sido eliminado')
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = {
  getEncargados,
  getEncargadoById,
  addEncargado,
  updateEncargado,
  deleteEncargado
}
