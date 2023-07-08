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

const getActividades = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query;

    let offset = (Number(page) - 1) * Number(size);

    if (Number(page) < 1) {
      offset = 0;
    }

    const isEmpty = await pool.query("SELECT * FROM actividades");
    if (isEmpty.rowCount === 0) {
      throw new Error("La tabla está vacía", STATUS_NOT_FOUND);
    }
    const response = await pool.query({
      text: "SELECT * FROM actividades ORDER BY cod_servicio, num_consecutivo ",
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

const getActividadById = async (req, res) => {
  try {
    const response = await pool.query({
      text: "SELECT * FROM actividades WHERE cod_servicio = $1 AND num_consecutivo = $2",
      values: [req.params.cod, req.params.num],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la actividad ${req.params.num} del servicio ${req.params.cod}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getActividadFromRequestBody = (requestBody) => {
  const { cod_servicio, descripcion_actividad, costo_actividad } = requestBody;

  const newActividad = [cod_servicio, descripcion_actividad, costo_actividad];

  return newActividad;
};

const addActividad = async (req, res) => {
  try {
    const newActividad = getActividadFromRequestBody(req.body);

    const insertar = await pool.query({
      text: "INSERT INTO actividades (cod_servicio, descripcion_actividad, costo_actividad) VALUES ($1, $2, $3) RETURNING cod_servicio, num_consecutivo",
      values: newActividad,
    });
    const insertedCod = insertar.rows[0].cod_servicio;
    const insertedNum = insertar.rows[0].num_consecutivo;
    const response = await pool.query({
      text: "SELECT * FROM actividades WHERE cod_servicio = $1 AND num_consecutivo = $2",
      values: [insertedCod, insertedNum],
    });
    return successItemsResponse(res, STATUS_CREATED, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getActividadFromRequestBodyU = (requestBody) => {
  const { descripcion_actividad, costo_actividad } = requestBody;

  const newActividad = [descripcion_actividad, costo_actividad];

  return newActividad;
};

const updateActividad = async (req, res) => {
  try {
    const updatedActividad = getActividadFromRequestBodyU(req.body);
    updatedActividad.push(req.params.cod);
    updatedActividad.push(req.params.num);
    const response = await pool.query({
      text: "UPDATE actividades SET descripcion_actividad = $1, costo_actividad = $2 WHERE cod_servicio = $3 AND num_consecutivo = $4",
      values: updatedActividad,
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la actividad ${req.params.num} del servicio ${req.params.cod}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, "Actividad modificada exitosamente");
  } catch (error) {
    res.send(error.message);
  }
};

const deleteActividad = async (req, res) => {
  try {
    const response = await pool.query({
      text: "DELETE FROM actividades WHERE cod_servicio = $1 AND num_consecutivo = $2",
      values: [req.params.cod, req.params.num],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la actividad ${req.params.num} del servicio ${req.params.cod}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, "Actividad ha sido eliminado");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  getActividades,
  getActividadById,
  addActividad,
  updateActividad,
  deleteActividad,
};
