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

const getFacturas = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query;

    let offset = (Number(page) - 1) * Number(size);

    if (Number(page) < 1) {
      offset = 0;
    }

    const isEmpty = await pool.query("SELECT * FROM facturas");
    if (isEmpty.rowCount === 0) {
      throw new Error("La tabla está vacía", STATUS_NOT_FOUND);
    }
    const response = await pool.query({
      text: "SELECT * FROM facturas ORDER BY num_factura ",
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

const getFacturaById = async (req, res) => {
  try {
    const response = await pool.query({
      text: "SELECT * FROM facturas WHERE num_factura = $1",
      values: [req.params.id],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la factura de codigo: ${req.params.id}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getFacturaFromRequestBody = (requestBody) => {
  const {
    num_factura,
    costo_mano_obra,
    monto_total,
    fecha_factura,
    num_unico,
  } = requestBody;

  const newFactura = [
    num_factura,
    costo_mano_obra,
    monto_total,
    fecha_factura,
    num_unico,
  ];

  return newFactura;
};

const addFactura = async (req, res) => {
  try {
    const newFactura = getFacturaFromRequestBody(req.body);

    const insertar = await pool.query({
      text: "INSERT INTO facturas (num_factura, costo_mano_obra, monto_total, fecha_factura, num_unico) VALUES ($1, $2, $3, $4, $5) RETURNING num_factura",
      values: newFactura,
    });
    const insertedId = insertar.rows[0].num_factura;
    const response = await pool.query({
      text: "SELECT * FROM facturas WHERE num_factura = $1",
      values: [insertedId],
    });
    return successItemsResponse(res, STATUS_CREATED, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getFacturaFromRequestBodyU = (requestBody) => {
  const { costo_mano_obra, monto_total, fecha_factura, num_unico } =
    requestBody;

  const newFactura = [costo_mano_obra, monto_total, fecha_factura, num_unico];

  return newFactura;
};

const updateFacturas = async (req, res) => {
  try {
    const updatedFactura = getFacturaFromRequestBodyU(req.body);
    updatedFactura.push(req.params.id);
    const response = await pool.query({
      text: "UPDATE facturas SET costo_mano_obra = $1, monto_total = $2, fecha_factura = $3, num_unico = $4 WHERE num_factura = $5",
      values: updatedFactura,
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la factura de numero: ${req.params.id}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, "Factura modificada exitosamente");
  } catch (error) {
    res.send(error.message);
  }
};

const deleteFactura = async (req, res) => {
  try {
    const response = await pool.query({
      text: "DELETE FROM facturas WHERE num_factura = $1",
      values: [req.params.id],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la Factura de numero: ${req.params.id}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, "Factura ha sido eliminada");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  getFacturas,
  getFacturaById,
  addFactura,
  updateFacturas,
  deleteFactura,
};
