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

const getModelos = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query

    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const isEmpty = await pool.query('SELECT * FROM modelos')
    if (isEmpty.rowCount === 0) {
      throw new Error('La tabla está vacía', STATUS_NOT_FOUND)
    }
    const response = await pool.query({
      text: 'SELECT * FROM modelos ORDER BY cod_modelo LIMIT $1 OFFSET $2',
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

const getModelosById = async (req, res) => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM modelos WHERE cod_modelo = $1',
      values: [req.params.id]
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el modelo de codigo: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows[0])
  } catch (error) {
    res.send(error.message)
  }
}

const getModelosFromRequestBody = (requestBody) => {
  const {
    cod_modelo,
    nombre_modelo,
    num_asiento,
    marca,
    peso,
    t_aceite,
    aceite_caja,
    octanaje,
    t_refrigerante
  } = requestBody

  const newModelo = [
    cod_modelo,
    nombre_modelo,
    num_asiento,
    marca,
    peso,
    t_aceite,
    aceite_caja,
    octanaje,
    t_refrigerante
  ]

  return newModelo
}

const getModelosFromRequestBodyU = (requestBody) => {
  const {
    nombre_modelo,
    num_asiento,
    marca,
    peso,
    t_aceite,
    aceite_caja,
    octanaje,
    t_refrigerante
  } = requestBody

  const newModelo = [
    nombre_modelo,
    num_asiento,
    marca,
    peso,
    t_aceite,
    aceite_caja,
    octanaje,
    t_refrigerante
  ]

  return newModelo
}

const addModelos = async (req, res) => {
  try {
    const newModelos = getModelosFromRequestBody(req.body)

    const insertar = await pool.query({
      text: 'INSERT INTO modelos (cod_modelo, nombre_modelo, num_asiento, marca, peso, t_aceite, aceite_caja, octanaje, t_refrigerante) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING cod_modelo',
      values: newModelos
    })
    const insertedCod = insertar.rows[0].cod_modelo
    const response = await pool.query({
      text: 'SELECT * FROM modelos WHERE cod_modelo = $1',
      values: [insertedCod]
    })
    return successItemsResponse(res, STATUS_CREATED, response.rows[0])
  } catch (error) {
    res.send(error.message)
  }
}

const updateModelos = async (req, res) => {
  try {
    const updateModelos = getModelosFromRequestBodyU(req.body)
    updateModelos.push(req.params.id)
    const response = await pool.query({
      text: 'UPDATE modelos SET nombre_modelo = $1, num_asiento = $2, marca = $3, peso = $4, t_aceite = $5, aceite_caja = $6, octanaje = $7, t_refrigerante = $8 WHERE cod_modelo = $9',
      values: updateModelos
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el Modelo de codigo: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'Modelo modificado exitosamente')
  } catch (error) {
    res.send(error.message)
  }
}

const deleteModelos = async (req, res) => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM modelos WHERE cod_modelo = $1',
      values: [req.params.id]
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el modelo de codigo: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'El modelo ha sido eliminado')
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = {
  getModelos,
  getModelosById,
  addModelos,
  updateModelos,
  deleteModelos
}
