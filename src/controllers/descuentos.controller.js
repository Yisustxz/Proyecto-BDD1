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

const getDescuentos = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query;

    let offset = (Number(page) - 1) * Number(size);

    if (Number(page) < 1) {
      offset = 0;
    }

    const isEmpty = await pool.query("SELECT * FROM descuentos");
    if (isEmpty.rowCount === 0) {
      throw new Error("La tabla está vacía", STATUS_NOT_FOUND);
    }
    const response = await pool.query({
      text: "SELECT * FROM descuentos ORDER BY porcentaje",
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

const getDescuentosById = async (req, res) => {
  try {
    const response = await pool.query({
      text: "SELECT * FROM descuentos WHERE porcentaje = $1",
      values: [req.params.porcentaje],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el descuento con porcentaje: ${req.params.porcentaje}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getDescuentoFromRequestBody = (requestBody) => {
  const { porcentaje, rango_min, rango_max } = requestBody;

  const newDescuento = [porcentaje, rango_min, rango_max];

  return newDescuento;
};

const addDescuento = async (req, res) => {
  try {
    const newDescuento = getDescuentoFromRequestBody(req.body);

    const insertar = await pool.query({
      text: "INSERT INTO descuentos (porcentaje, rango_min, rango_max) VALUES ($1, $2, $3) RETURNING porcentaje",
      values: newDescuento,
    });
    const insertedId = insertar.rows[0].porcentaje;
    const response = await pool.query({
      text: "SELECT * FROM descuentos WHERE porcentaje = $1",
      values: [insertedId],
    });
    return successItemsResponse(res, STATUS_CREATED, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getDescuentoFromRequestBodyU = (requestBody) => {
  const { rango_min, rango_max } = requestBody;

  const newDescuento = [rango_min, rango_max];

  return newDescuento;
};

const updateDescuento = async (req, res) => {
  try {
    const updatedDescuento = getDescuentoFromRequestBodyU(req.body);
    updatedDescuento.push(req.params.porcentaje);
    const response = await pool.query({
      text: "UPDATE descuentos SET rango_min = $1, rango_max = $2 WHERE porcentaje = $3",
      values: updatedDescuento,
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el descuento con porcentaje: ${req.params.porcentaje}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, "Descuento modificado exitosamente");
  } catch (error) {
    res.send(error.message);
  }
};

const deleteDescuento = async (req, res) => {
  try {
    const response = await pool.query({
      text: "DELETE FROM descuentos WHERE porcentaje = $1",
      values: [req.params.porcentaje],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el descuento con porcentaje: ${req.params.porcentaje}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, "Descuento ha sido eliminado");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  getDescuentos,
  getDescuentosById,
  addDescuento,
  updateDescuento,
  deleteDescuento,
};
