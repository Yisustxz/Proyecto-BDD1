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

const getOrdenesServicio = async (req, res) => {
  try {
    const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query;

    let offset = (Number(page) - 1) * Number(size);

    if (Number(page) < 1) {
      offset = 0;
    }

    const isEmpty = await pool.query("SELECT * FROM ordenes_servicio");
    if (isEmpty.rowCount === 0) {
      throw new Error("La tabla está vacía", STATUS_NOT_FOUND);
    }
    const response = await pool.query({
      text: "SELECT * FROM ordenes_servicio ORDER BY num_unico LIMIT $1 OFFSET $2",
      values: [size, offset],
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

const getOrdenesServicioById = async (req, res) => {
  try {
    const response = await pool.query({
      text: "SELECT * FROM ordenes_servicio WHERE num_unico = $1",
      values: [req.params.id],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la orden de servicio de numero: ${req.params.id}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(res, STATUS_OK, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const getOrdenesServicioFromRequestBody = (requestBody) => {
  const {
    ci_autorizado,
    nombre_autorizado,
    hora_entrada,
    hora_salida_estimada,
    hora_salida_real,
    fecha_entrada,
    fecha_salida_estimada,
    fecha_salida_real,
    placa,
    ci_trabajador,
  } = requestBody;

  const newOrdenServicio = [
    ci_autorizado,
    nombre_autorizado,
    hora_entrada,
    hora_salida_estimada,
    hora_salida_real,
    fecha_entrada,
    fecha_salida_estimada,
    fecha_salida_real,
    placa,
    ci_trabajador,
  ];

  return newOrdenServicio;
};

const getOrdenesServicioFromRequestBodyU = (requestBody) => {
  const {
    ci_autorizado,
    nombre_autorizado,
    hora_entrada,
    hora_salida_estimada,
    hora_salida_real,
    fecha_entrada,
    fecha_salida_estimada,
    fecha_salida_real,
    placa,
    ci_trabajador,
  } = requestBody;

  const newOrdenServicio = [
    ci_autorizado,
    nombre_autorizado,
    hora_entrada,
    hora_salida_estimada,
    hora_salida_real,
    fecha_entrada,
    fecha_salida_estimada,
    fecha_salida_real,
    placa,
    ci_trabajador,
  ];

  return newOrdenServicio;
};

const addOrdenServicio = async (req, res) => {
  try {
    const newOrdenServicio = getOrdenesServicioFromRequestBody(req.body);

    const cargo_trabajador = await pool.query({
      text: "SELECT cargo FROM trabajadores WHERE ci_trabajador = $1",
      values: [newOrdenServicio[9]],
    });


    if (cargo_trabajador.rows[0].cargo != "A") {
      throw new Error(
        `Solo un trabajador con cargo analista puede emitir una orden de servicio`,
        STATUS_ERROR
      );
    }

    const insertar = await pool.query({
      text: "INSERT INTO ordenes_servicio (ci_autorizado,nombre_autorizado,hora_entrada,hora_salida_estimada,hora_salida_real,fecha_entrada,fecha_salida_estimada,fecha_salida_real,placa,ci_trabajador) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING num_unico",
      values: newOrdenServicio,
    });
    const insertedNum_unico = insertar.rows[0].num_unico;
    const response = await pool.query({
      text: "SELECT * FROM ordenes_servicio WHERE num_unico = $1",
      values: [insertedNum_unico],
    });
    return successItemsResponse(res, STATUS_CREATED, response.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
};

const updateOrdenServicio = async (req, res) => {
  try {
    const updateOrdenServicios = getOrdenesServicioFromRequestBodyU(req.body);
    updateOrdenServicios.push(req.params.id);
    const response = await pool.query({
      text: "UPDATE ordenes_servicio SET ci_autorizado = $1, nombre_autorizado = $2 ,hora_entrada = $3, hora_salida_estimada = $4, hora_salida_real = $5, fecha_entrada = $6, fecha_salida_estimada = $7, fecha_salida_real = $8, placa = $9, ci_trabajador = $10 WHERE num_unico = $11",
      values: updateOrdenServicios,
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la orden de servicio de numero: ${req.params.id}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(
      res,
      STATUS_OK,
      "La orden de servicio se ha modificado exitosamente"
    );
  } catch (error) {
    res.send(error.message);
  }
};

const deleteOrdenServicio = async (req, res) => {
  try {
    const response = await pool.query({
      text: "DELETE FROM ordenes_servicio WHERE num_unico = $1",
      values: [req.params.id],
    });
    if (response.rowCount === 0) {
      throw new Error(
        `No se pudo encontrar la orden de servicio de numero: ${req.params.id}`,
        STATUS_NOT_FOUND
      );
    }
    return successResponse(
      res,
      STATUS_OK,
      "La orden de servicio se ha sido eliminado"
    );
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  getOrdenesServicio,
  getOrdenesServicioById,
  addOrdenServicio,
  updateOrdenServicio,
  deleteOrdenServicio,
};
