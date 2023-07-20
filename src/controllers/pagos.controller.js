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
const STATUS_ERROR = 400;

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 10;

const tasa_dolar = 25;

const getPagos = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query;

    let offset = (Number(page) - 1) * Number(size);

    if (Number(page) < 1) {
      offset = 0;
    }

    const isEmpty = await pool.query("SELECT * FROM pagos");
    if (isEmpty.rowCount === 0) {
      throw new Error("La tabla está vacía", STATUS_NOT_FOUND);
    }
    const response = await pool.query({
      text: "SELECT * FROM pagos ORDER BY num_factura, num_consecutivo ",
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

const getPagoById = async (req, res) => {
  try {
    const response = await pool.query({
      text: "SELECT * FROM pagos WHERE num_factura = $1 AND num_consecutivo = $2",
      values: [req.params.cod, req.params.num],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el pago con numero ${req.params.num} de la factura ${req.params.cod}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getPagoFromRequestBody = (requestBody) => {
  const { num_factura, modalidad, fecha_pago, monto, num_tarjeta, num_banco } =
    requestBody;

  const newPago = [
    num_factura,
    modalidad,
    fecha_pago,
    monto,
    num_tarjeta,
    num_banco,
  ];

  return newPago;
};

const addPago = async (req, res) => {
  try {
    const newPago = getPagoFromRequestBody(req.body);

    const pago = await pool.query({
      text: "SELECT * FROM pagos WHERE num_factura = $1",
      values: [newPago[0]],
    });

    if (pago.rows.length == 2) {
      throw new Error(
        `Se pueden realizar máximo 2 pagos por factura`,
        STATUS_ERROR
      );
    }

    if (pago.rows.length == 1) {
      const factura = await pool.query({
        text: "SELECT * FROM facturas WHERE num_factura = $1",
        values: [newPago[0]],
      });
      let monto = newPago[3];
      let montoPago1 = pago.rows[0].monto;
      if (newPago[1] != "ED") monto = monto / tasa_dolar;
      if (pago.rows[0].modalidad != "ED") montoPago1 = montoPago1 / tasa_dolar;
      if (factura.rows[0].monto_total - montoPago1 - monto > 0) {
        throw new Error(
          `El segundo pago no completa el monto total de la factura`,
          STATUS_ERROR
        );
      }
    }
    const insertar = await pool.query({
      text: "INSERT INTO pagos (num_factura, modalidad, fecha_pago, monto, num_tarjeta, num_banco) VALUES ($1, $2, $3, $4, $5, $6) RETURNING num_factura, num_consecutivo",
      values: newPago,
    });
    const insertedCod = insertar.rows[0].num_factura;
    const insertedNum = insertar.rows[0].num_consecutivo;
    const response = await pool.query({
      text: "SELECT * FROM pagos WHERE num_factura = $1 AND num_consecutivo = $2",
      values: [insertedCod, insertedNum],
    });
    return successItemsResponse(res, STATUS_CREATED, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getPagoFromRequestBodyU = (requestBody) => {
  const { modalidad, fecha_pago, monto, num_tarjeta, num_banco } = requestBody;

  const newPago = [modalidad, fecha_pago, monto, num_tarjeta, num_banco];

  return newPago;
};

const updatePago = async (req, res) => {
  try {
    const updatedPago = getPagoFromRequestBodyU(req.body);
    updatedPago.push(req.params.cod);
    updatedPago.push(req.params.num);
    const response = await pool.query({
      text: "UPDATE pagos SET modalidad = $1, fecha_pago = $2, monto = $3, num_tarjeta = $4, num_banco = $5 WHERE num_factura = $6 AND num_consecutivo = $7",
      values: updatedPago,
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el pago ${req.params.num} de la factura ${req.params.cod}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, "Pago modificado exitosamente");
  } catch (error) {
    res.send(error.message);
  }
};

const deletePago = async (req, res) => {
  try {
    const response = await pool.query({
      text: "DELETE FROM pagos WHERE num_factura = $1 AND num_consecutivo = $2",
      values: [req.params.cod, req.params.num],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el pago ${req.params.num} de la factura ${req.params.cod}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, "Pago ha sido eliminado");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  getPagos,
  getPagoById,
  addPago,
  updatePago,
  deletePago,
};
