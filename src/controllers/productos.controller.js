const { pool } = require("../database");

const {
  paginatedItemsResponse,
  successItemsResponse,
  successResponse,
} = require("../utils/response");
/* import StatusError from '../utils/status-error'
import { handleControllerError } from '../utils/handleControllerError' */

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_NOT_FOUND = 404;

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 10;

const getProductos = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query;

    let offset = (Number(page) - 1) * Number(size);

    if (Number(page) < 1) {
      offset = 0;
    }

    const isEmpty = await pool.query("SELECT * FROM productos");
    if (isEmpty.rowCount === 0) {
      throw new Error("La tabla está vacía", STATUS_NOT_FOUND);
    }
    const response = await pool.query({
      text: "SELECT * FROM productos ORDER BY cod_producto ",
    });
    const pagination = {
      total: isEmpty.rowCount,
      currentPage: Number(page),
      perPage: Number(size),
    };

    return paginatedItemsResponse(res, STATUS_OK, response.rows, pagination);
  } catch (error) {
    res.send(error.message);
  }
};

const getProductosById = async (req, res) => {
  try {
    const response = await pool.query({
      text: "SELECT * FROM productos WHERE cod_producto = $1",
      values: [req.params.cod],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el producto de codigo: ${req.params.cod}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getProductoFromRequestBody = (requestBody) => {
  const {
    cod_producto,
    nombre_producto,
    descripcion_producto,
    es_ecologico,
    precio,
    cantidad,
    cantidad_minima,
    cantidad_maxima,
    cod_tipo,
    proveedor,
  } = requestBody;

  const newProducto = [
    cod_producto,
    nombre_producto,
    descripcion_producto,
    es_ecologico,
    precio,
    cantidad,
    cantidad_minima,
    cantidad_maxima,
    cod_tipo,
    proveedor,
  ];

  return newProducto;
};

const addProducto = async (req, res) => {
  try {
    const newProducto = getProductoFromRequestBody(req.body);

    const insertar = await pool.query({
      text: "INSERT INTO productos (cod_producto, nombre_producto, descripcion_producto, es_ecologico, precio, cantidad, cantidad_minima, cantidad_maxima, cod_tipo, proveedor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING cod_producto",
      values: newProducto,
    });
    const insertedId = insertar.rows[0].cod_producto;
    const response = await pool.query({
      text: "SELECT * FROM productos WHERE cod_producto = $1",
      values: [insertedId],
    });
    return successItemsResponse(res, STATUS_CREATED, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getProductoFromRequestBodyU = (requestBody) => {
  const {
    nombre_producto,
    descripcion_producto,
    es_ecologico,
    precio,
    cantidad,
    cantidad_minima,
    cantidad_maxima,
    cod_tipo,
    proveedor,
  } = requestBody;

  const newProducto = [
    nombre_producto,
    descripcion_producto,
    es_ecologico,
    precio,
    cantidad,
    cantidad_minima,
    cantidad_maxima,
    cod_tipo,
    proveedor,
  ];

  return newProducto;
};

const updateProducto = async (req, res) => {
  try {
    const updatedProducto = getProductoFromRequestBodyU(req.body);
    updatedProducto.push(req.params.cod);
    const response = await pool.query({
      text: "UPDATE productos SET nombre_producto = $1, descripcion_producto = $2, es_ecologico = $3, precio = $4, cantidad = $5, cantidad_minima = $6, cantidad_maxima = $7, cod_tipo = $8, proveedor = $9 WHERE cod_producto = $10",
      values: updatedProducto,
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el producto de codigo: ${req.params.cod}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, "Producto modificado exitosamente");
  } catch (error) {
    res.send(error.message);
  }
};

const deleteProducto = async (req, res) => {
  try {
    const response = await pool.query({
      text: "DELETE FROM productos WHERE cod_producto = $1",
      values: [req.params.cod],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el producto de codigo: ${req.params.cod}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, "Producto ha sido eliminado");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  getProductos,
  getProductosById,
  addProducto,
  updateProducto,
  deleteProducto,
};
