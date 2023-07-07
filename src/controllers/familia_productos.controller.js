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

const getFamiliaProductos = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query

    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const isEmpty = await pool.query('SELECT * FROM familia_productos')
    if (isEmpty.rowCount === 0) {
      throw new Error('La tabla está vacía', STATUS_NOT_FOUND)
    }
    const response = await pool.query({
      text: 'SELECT * FROM familia_productos ORDER BY cod_tipo '
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

const getFamiliaProductosById = async (req, res) => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM familia_productos WHERE cod_tipo = $1',
      values: [req.params.id]
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la familia del producto de codigo: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows[0])
  } catch (error) {
    res.send(error.message)
  }
}

const getFamiliaProductoFromRequestBody = (requestBody) => {
  const { cod_tipo, nombre } = requestBody

  const newFamiliaProducto = [cod_tipo, nombre]

  return newFamiliaProducto
}

const getFamiliaProductoFromRequestBodyU = (requestBody) => {
  const { nombre } = requestBody

  const newFamiliaProducto = [nombre]

  return newFamiliaProducto
}

const addFamiliaProducto = async (req, res) => {
  try {
    const newFamiliaProducto = getFamiliaProductoFromRequestBody(req.body)

    const insertar = await pool.query({
      text: 'INSERT INTO familia_productos (cod_tipo, nombre) VALUES ($1, $2) RETURNING cod_tipo',
      values: newFamiliaProducto
    })
    const insertedId = insertar.rows[0].cod_tipo
    const response = await pool.query({
      text: 'SELECT * FROM familia_productos WHERE cod_tipo = $1',
      values: [insertedId]
    })
    return successItemsResponse(res, STATUS_CREATED, response.rows[0])
  } catch (error) {
    res.send(error.message)
  }
}

const updateFamiliaProducto = async (req, res) => {
  try {
    const updatedFamiliaProducto = getFamiliaProductoFromRequestBodyU(req.body)
    updatedFamiliaProducto.push(req.params.id)
    const response = await pool.query({
      text: 'UPDATE familia_productos SET nombre = $1 WHERE cod_tipo = $2',
      values: updatedFamiliaProducto
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la familia de producto de codigo: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(
      res,
      STATUS_OK,
      'Familia de producto modificado exitosamente'
    )
  } catch (error) {
    res.send(error.message)
  }
}

const deleteFamiliaProducto = async (req, res) => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM familia_productos WHERE cod_tipo = $1',
      values: [req.params.id]
    })
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la Familia de producto de codigo: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(
      res,
      STATUS_OK,
      'Familia de producto ha sido eliminado'
    )
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = {
  getFamiliaProductos,
  getFamiliaProductosById,
  addFamiliaProducto,
  updateFamiliaProducto,
  deleteFamiliaProducto
}
