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

const getServicios = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query;

    let offset = (Number(page) - 1) * Number(size);

    if (Number(page) < 1) {
      offset = 0;
    }

    const isEmpty = await pool.query("SELECT * FROM servicios");
    if (isEmpty.rowCount === 0) {
      throw new Error("La tabla está vacía", STATUS_NOT_FOUND);
    }
    const response = await pool.query({
      text: "SELECT * FROM servicios ORDER BY cod_servicio",
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

const getServiciosById = async (req, res) => {
  try {
    const response = await pool.query({
      text: "SELECT * FROM servicios WHERE cod_servicio = $1",
      values: [req.params.cod],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el servicio de código: ${req.params.cod}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getServicioFromRequestBody = (requestBody) => {
  const {
    cod_servicio,
    nombre_servicio,
    descripcion_servicio,
    tiempo_reserva,
    capacidad,
    ci_trabajador,
    porcentaje,
  } = requestBody;

  const newServicio = [
    cod_servicio,
    nombre_servicio,
    descripcion_servicio,
    tiempo_reserva,
    capacidad,
    ci_trabajador,
    porcentaje,
  ];

  return newServicio;
};

const addServicio = async (req, res) => {
  try {
    const newServicio = getServicioFromRequestBody(req.body);

    const insertar = await pool.query({
      text: "INSERT INTO servicios (cod_servicio, nombre_servicio, descripcion_servicio, tiempo_reserva, capacidad, ci_trabajador, porcentaje) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING cod_servicio",
      values: newServicio,
    });
    const insertedId = insertar.rows[0].cod_servicio;
    const response = await pool.query({
      text: "SELECT * FROM servicios WHERE cod_servicio = $1",
      values: [insertedId],
    });
    return successItemsResponse(res, STATUS_CREATED, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getServicioFromRequestBodyU = (requestBody) => {
  const {
    nombre_servicio,
    descripcion_servicio,
    tiempo_reserva,
    capacidad,
    ci_trabajador,
    porcentaje,
  } = requestBody;

  const newServicio = [
    nombre_servicio,
    descripcion_servicio,
    tiempo_reserva,
    capacidad,
    ci_trabajador,
    porcentaje,
  ];

  return newServicio;
};

const updateServicio = async (req, res) => {
  try {
    const updatedServicio = getServicioFromRequestBodyU(req.body);
    updatedServicio.push(req.params.cod);
    const response = await pool.query({
      text: "UPDATE servicios SET nombre_servicio = $1, descripcion_servicio = $2, tiempo_reserva = $3, capacidad = $4, ci_trabajador = $5, porcentaje = $6 WHERE cod_servicio = $7",
      values: updatedServicio,
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el servicio de codigo: ${req.params.cod}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, "Servicio modificado exitosamente");
  } catch (error) {
    res.send(error.message);
  }
};

const deleteServicio = async (req, res) => {
  try {
    const response = await pool.query({
      text: "DELETE FROM servicios WHERE cod_servicio = $1",
      values: [req.params.cod],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar el servicio de codigo: ${req.params.cod}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, "Servicio ha sido eliminado");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  getServicios,
  getServiciosById,
  addServicio,
  updateServicio,
  deleteServicio,
};
