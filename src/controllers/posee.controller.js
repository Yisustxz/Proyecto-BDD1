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

const getPosee = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query

    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const isEmpty = await pool.query('SELECT * FROM posee')
    if (isEmpty.rowCount === 0) {
      throw new Error('La tabla está vacía', STATUS_NOT_FOUND)
    }
    const response = await pool.query({
      text: 'SELECT * FROM posee ORDER BY rif, cod_modelo'
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

const getPoseeById = async (req, res) => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM posee WHERE rif = $1 AND cod_modelo = $2',
      values: [req.params.unic, req.params.detail]
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar posee con RIF: ${req.params.unic} y cod_modelo ${req.params.detail}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows[0])
  } catch (error) {
    res.send(error.message)
  }
}

const getPoseeFromRequestBody = (requestBody) => {
  const { rif, cod_modelo } = requestBody

  const newPosee = [rif, cod_modelo]

  return newPosee
}

const addPosee = async (req, res) => {
  try {
    const newPosee = getPoseeFromRequestBody(req.body)

    const insertar = await pool.query({
      text: 'INSERT INTO posee (rif,cod_modelo) VALUES ($1, $2) RETURNING rif, cod_modelo',
      values: newPosee
    })
    const insertedUnic = insertar.rows[0].rif
    const insertedDetail = insertar.rows[0].cod_modelo

    const response = await pool.query({
      text: 'SELECT * FROM posee WHERE rif = $1 AND cod_modelo = $2',
      values: [insertedUnic, insertedDetail]
    })
    return successItemsResponse(res, STATUS_CREATED, response.rows[0])
  } catch (error) {
    res.send(error.message)
  }
}

const deletePosee = async (req, res) => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM posee WHERE rif = $1 AND cod_modelo = $2',
      values: [req.params.unic, req.params.detail]
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar El modelo que posee el concesionario de RIF: ${req.params.unic} y con el codigo de modelo: ${req.params.detail}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'Posee ha sido eliminado')
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = {
  getPosee,
  getPoseeById,
  addPosee,
  deletePosee
}
