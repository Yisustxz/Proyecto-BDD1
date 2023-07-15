-- 
CREATE DOMAIN dom_modalidad as VARCHAR(2) NOT NULL CHECK (
  VALUE = 'EB'
  OR VALUE = 'ED'
  OR VALUE = 'T'
  OR VALUE = 'TD'
  OR VALUE = 'TC'
);

CREATE DOMAIN dom_aceite as VARCHAR(3) NOT NULL CHECK (
  VALUE = 'AM'
  OR VALUE = 'AS'
  OR VALUE = 'ASS'
  OR VALUE = 'AAM'
  OR VALUE = 'AMG'
);

-- AM = aceite mineral AS= aceite sintetico ASS = aceite semisintetico 
--AAM = aceite alta milla AMG= aceite multigrado 
CREATE DOMAIN dom_cargo as VARCHAR(2) NOT NULL CHECK (VALUE = 'A');

-- A= analista
--
CREATE TABLE estados(
  cod_est VARCHAR(4) NOT NULL,
  nombre_est VARCHAR(20) NOT NULL,
  PRIMARY KEY (cod_est)
);

--
CREATE TABLE ciudades(
  cod_est VARCHAR(4) NOT NULL,
  num_consecutivo SERIAL NOT NULL,
  nombre_ciudad VARCHAR(20) NOT NULL,
  PRIMARY KEY (cod_est, num_consecutivo),
  CONSTRAINT cod_est_fk FOREIGN KEY (cod_est) REFERENCES estados(cod_est) ON DELETE RESTRICT ON UPDATE CASCADE
);

--
CREATE TABLE trabajadores(
  ci_trabajador VARCHAR(8) NOT NULL,
  nombre_trabajador VARCHAR(40) NOT NULL,
  direccion_trabajador TEXT NOT NULL,
  telefono_trabajador VARCHAR(11),
  sueldo_trabajador DECIMAL NOT NULL,
  cargo dom_cargo NOT NULL,
  PRIMARY KEY (ci_trabajador),
  CONSTRAINT v_sueldo_trabajador CHECK(sueldo_trabajador >= 0)
);

-- INSERT INTO trabajadores (ci_trabajador, nombre_trabajador, direccion_trabajador, telefono_trabajador, sueldo_trabajador, cargo) VALUES ('2857817','lui','av a','041448456', 1000, 'A');
CREATE TABLE encargados(
  ci_encargado VARCHAR(8) NOT NULL,
  nombre_encargado VARCHAR(40) NOT NULL,
  direccion_encargado TEXT NOT NULL,
  telefono_encargado VARCHAR(11),
  correo_encargado VARCHAR(20),
  telefono_secundario_encargado VARCHAR(11),
  PRIMARY KEY (ci_encargado),
  CONSTRAINT v_telefono_secundario_encargado CHECK(
    telefono_secundario_encargado != telefono_encargado)
);

--
CREATE TABLE familia_productos(
  cod_tipo VARCHAR(6) NOT NULL,
  nombre VARCHAR(15) NOT NULL,
  PRIMARY KEY (cod_tipo)
);

--
CREATE TABLE descuentos(
  porcentaje DECIMAL NOT NULL,
  rango_min INTEGER NOT NULL,
  rango_max INTEGER NOT NULL,
  PRIMARY KEY (porcentaje),
  CONSTRAINT v_rango_max CHECK(rango_max > rango_min),
  CONSTRAINT v_rango_min CHECK(rango_min > 0),
   CONSTRAINT v_porcentaje CHECK(
    porcentaje BETWEEN 0
    AND 100
  )
);


--
CREATE TABLE clientes(
  ci_cliente VARCHAR(8) NOT NULL,
  nombre_cliente VARCHAR(40) NOT NULL,
  correo VARCHAR(20) NOT NULL,
  telefono_principal VARCHAR(11) NULL,
  telefono_secundario VARCHAR(11) NULL,
  PRIMARY KEY (ci_cliente),
   CONSTRAINT v_telefono_secundario CHECK(telefono_secundario != telefono_principal)
);

--
  CREATE TABLE concesionario(
    rif VARCHAR(10) NOT NULL,
    nombre VARCHAR(15) NOT NULL,
    cod_est VARCHAR(4) NOT NULL,
    num_consecutivo INTEGER NOT NULL,
    ci_encargado VARCHAR(8) NOT NULL,
    PRIMARY KEY (rif),
    CONSTRAINT cod_est_fk FOREIGN KEY (cod_est, num_consecutivo) REFERENCES ciudades(cod_est, num_consecutivo) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT ci_encargado_fk FOREIGN KEY (ci_encargado) REFERENCES encargados(ci_encargado) ON DELETE RESTRICT ON UPDATE CASCADE
  );

--
/* INSERT INTO clientes (ci_cliente, nombre_cliente, correo, telefono_principal, telefono_secundaria) VALUES ('2757817','lui','sdadad@gmail','041448456','041438428') 
 */

CREATE TABLE servicios(
  cod_servicio VARCHAR(3) NOT NULL,
  nombre_servicio VARCHAR(20) NOT NULL,
  descripcion_servicio TEXT NOT NULL,
  tiempo_reserva INTEGER NOT NULL,
  capacidad INTEGER NOT NULL,
  ci_trabajador VARCHAR(8) NOT NULL,
  porcentaje DECIMAL NOT NULL,
  CONSTRAINT v_tiempo_reserva CHECK(
    tiempo_reserva BETWEEN 1
    AND 7
  )
  PRIMARY KEY (cod_servicio),
  CONSTRAINT ci_trabajador_fk FOREIGN KEY (ci_trabajador) REFERENCES trabajadores(ci_trabajador) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT porcentaje_fk FOREIGN KEY (porcentaje) REFERENCES descuentos(porcentaje) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT v_capacidad CHECK(capacidad >= 0),
  CONSTRAINT v_porcentaje CHECK(
    porcentaje BETWEEN 0
    AND 100
  )
);


--
CREATE TABLE modelos(
  cod_modelo VARCHAR(5) NOT NULL,
  nombre_modelo VARCHAR(20) NOT NULL,
  num_asiento INTEGER NOT NULL,
  marca VARCHAR(10) NOT NULL,
  peso DECIMAL NOT NULL,
  t_aceite dom_aceite NOT NULL,
  aceite_caja VARCHAR(6) NOT NULL,
  octanaje VARCHAR(2) NOT NULL,
  t_refrigerante VARCHAR(5) NOT NULL,
  PRIMARY KEY (cod_modelo),
  CONSTRAINT v_num_asiento CHECK(num_asiento > 0),
   CONSTRAINT v_peso CHECK(peso > 0)
);

--INSERT INTO modelos (cod_modelo, nombre_modelo, num_asiento, marca, peso, t_aceite, aceite_caja, octanaje, t_refrigerante) VALUES ('12345','twingo',4,'ferrari',500,'AM','SAE80W','91','R134');
--
CREATE TABLE vehiculos(
  placa VARCHAR(7) NOT NULL,
  ano_vehiculo DATE NOT NULL,
  num_serial VARCHAR(10) NOT NULL,
  num_motor VARCHAR(8) NOT NULL,
  color VARCHAR(10) NOT NULL,
  fecha_venta DATE NOT NULL,
  concesionario_vendedor VARCHAR(15) NOT NULL,
  info_importante TEXT NOT NULL,
  cod_modelo VARCHAR(5) NOT NULL,
  ci_cliente VARCHAR(8) NOT NULL,
  PRIMARY KEY (placa),
  CONSTRAINT cod_modelo_fk FOREIGN KEY (cod_modelo) REFERENCES modelos(cod_modelo) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT ci_cliente_fk FOREIGN KEY (ci_cliente) REFERENCES clientes(ci_cliente) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT uk_num_serial UNIQUE (num_serial),
  CONSTRAINT uk_num_motor UNIQUE (num_motor)
);

-- INSERT INTO vehiculos (placa, ano_vehiculo, num_serial, num_motor, color, fecha_venta, concesionario_vendedor, info_importante, cod_modelo, ci_cliente) VALUES ('1111111','20/01/2001','2222222222','33333333','rojo','24/10/2023','ucab','xd','12345','2757817');
--

CREATE TABLE reserva(
  cod_reserva VARCHAR(6) NOT NULL,
  placa VARCHAR(7) NOT NULL,
  cod_servicio VARCHAR(3) NOT NULL,
  fecha_reservada DATE NOT NULL,
  asistio BOOLEAN DEFAULT NULL,
  kilometraje DECIMAL NOT NULL,
  PRIMARY KEY (cod_reserva),
  CONSTRAINT placa_fk FOREIGN KEY (placa) REFERENCES vehiculos(placa) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT cod_servicio_fk FOREIGN KEY (cod_servicio) REFERENCES servicios(cod_servicio),
  CONSTRAINT v_kilometraje CHECK(kilometraje > 0)
);

--
CREATE TABLE ordenes_servicio(
  num_unico SERIAL NOT NULL,
  ci_autorizado VARCHAR(8) DEFAULT NULL,
  nombre_autorizado VARCHAR(40) DEFAULT NULL,
  hora_entrada TIME NOT NULL,
  hora_salida_estimada TIME NOT NULL,
  hora_salida_real TIME NOT NULL,
  fecha_entrada DATE NOT NULL,
  fecha_salida_estimada DATE NOT NULL,
  fecha_salida_real DATE NOT NULL,
  placa VARCHAR(7) NOT NULL,
  ci_trabajador VARCHAR(8) NOT NULL,
  PRIMARY KEY (num_unico),
  CONSTRAINT placa_fk FOREIGN KEY (placa) REFERENCES vehiculos(placa) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT ci_trabajador_fk FOREIGN KEY (ci_trabajador) REFERENCES trabajadores(ci_trabajador),
  CONSTRAINT v_fecha_salida_estimada CHECK(fecha_salida_estimada >= fecha_entrada),
  CONSTRAINT v_fecha_salida_real CHECK(fecha_salida_real >= fecha_entrada)
);


--INSERT INTO ordenes_servicio (ci_autorizado, nombre_autorizado, hora_entrada, hora_salida_estimada, hora_salida_real, fecha_entrada, fecha_salida_estimada, fecha_salida_real, placa, ci_trabajador) VALUES ('28575817','yisus','12:30:45','12:30:45','12:30:45','24/10/2023','24/10/2023','24/10/2023','1111111','2857817');
--
CREATE TABLE productos(
  cod_producto VARCHAR(6) NOT NULL,
  nombre_producto VARCHAR(40) NOT NULL,
  descripcion_producto TEXT NOT NULL,
  es_ecologico BOOLEAN NOT NULL,
  precio DECIMAL NOT NULL,
  cantidad INTEGER NOT NULL,
  cantidad_minima INTEGER NOT NULL,
  cantidad_maxima INTEGER NOT NULL,
  cod_tipo VARCHAR(6) NOT NULL,
  proveedor VARCHAR(15) NOT NULL,
  PRIMARY KEY (cod_producto),
  CONSTRAINT cod_tipo_fk FOREIGN KEY (cod_tipo) REFERENCES familia_productos(cod_tipo) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT v_precio CHECK(precio > 0),
  CONSTRAINT v_cantidad CHECK(
    cantidad BETWEEN cantidad_minima
    AND cantidad_maxima
  ),
  CONSTRAINT v_cantidad_minima CHECK(cantidad_minima > 0),
  CONSTRAINT v_cantidad_maxima CHECK(cantidad_maxima >= cantidad_minima)
);

--
CREATE TABLE facturas(
  num_factura VARCHAR(10) NOT NULL,
  costo_mano_obra DECIMAL NOT NULL,
  monto_total DECIMAL NOT NULL,
  fecha_factura DATE NOT NULL,
  num_unico INTEGER NOT NULL,
  PRIMARY KEY(num_factura),
  CONSTRAINT num_unico_fk FOREIGN KEY (num_unico) REFERENCES ordenes_servicio(num_unico) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT v_costo_mano_obra CHECK(costo_mano_obra > 0),
  CONSTRAINT v_monto_total CHECK(monto_total > 0)
);

--
CREATE TABLE actividades(
  cod_servicio VARCHAR(3) NOT NULL,
  num_consecutivo SERIAL NOT NULL,
  descripcion_actividad TEXT NOT NULL,
  costo_actividad DECIMAL NOT NULL,
  PRIMARY KEY (cod_servicio, num_consecutivo),
  CONSTRAINT cod_servicio_fk FOREIGN KEY (cod_servicio) REFERENCES servicios(cod_servicio) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT v_costo_actividad CHECK(costo_actividad > 0)
);

--
CREATE TABLE detalle_servicio(
  num_unico INTEGER NOT NULL,
  cantidad INTEGER NOT NULL,
  costo DECIMAL NOT NULL,
  num_detalle SERIAL NOT NULL,
  PRIMARY KEY (num_unico, num_detalle),
  CONSTRAINT num_unico_fk FOREIGN KEY (num_unico) REFERENCES ordenes_servicio(num_unico) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT v_cantidad_detalle CHECK(cantidad > 0)
);


-- --INSERT INTO detalle_servicio (num_unico, cantidad, costo, num_detalle) VALUES ('2',5,100,3);
CREATE TABLE pagos(
  num_factura VARCHAR (10) NOT NULL,
  num_consecutivo SERIAL NOT NULL,
  modalidad dom_modalidad NOT NULL,
  fecha_pago DATE NOT NULL,
  monto DECIMAL NOT NULL,
  num_tarjeta VARCHAR(18) DEFAULT NULL,
  num_banco VARCHAR(20) DEFAULT NULL,
  PRIMARY KEY (num_factura, num_consecutivo),
  CONSTRAINT num_factura_fk FOREIGN KEY (num_factura) REFERENCES facturas(num_factura) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT v_monto CHECK(monto > 0),
  CONSTRAINT v_num_tarjeta CHECK(
    modalidad IN ('TD', 'TC')
    OR num_tarjeta IS NOT NULL
  ),
  CONSTRAINT v_num_banco CHECK(
    modalidad IN ('TD', 'TC')
    OR num_banco IS NOT NULL
  )

);

--
CREATE TABLE se_especializa(
  ci_trabajador VARCHAR(8) NOT NULL,
  cod_servicio VARCHAR(3) NOT NULL,
  PRIMARY KEY (ci_trabajador, cod_servicio),
  CONSTRAINT ci_trabajador_fk FOREIGN KEY (ci_trabajador) REFERENCES trabajadores(ci_trabajador) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT cod_servicio_fk FOREIGN KEY (cod_servicio) REFERENCES servicios(cod_servicio) ON DELETE RESTRICT ON UPDATE CASCADE
);

--
CREATE TABLE posee(
  rif VARCHAR(10) NOT NULL,
  cod_modelo VARCHAR(5) NOT NULL,
  PRIMARY KEY (rif, cod_modelo),
  CONSTRAINT rif_fk FOREIGN KEY (rif) REFERENCES concesionario(rif) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT cod_modelo_fk FOREIGN KEY (cod_modelo) REFERENCES modelos(cod_modelo) ON DELETE RESTRICT ON UPDATE CASCADE
);

--
CREATE TABLE se_le_hacen(
  placa VARCHAR(7) NOT NULL,
  cod_servicio VARCHAR(3) NOT NULL,
  num_consecutivo INTEGER NOT NULL,
  PRIMARY KEY (placa, cod_servicio, num_consecutivo),
  CONSTRAINT placa_fk FOREIGN KEY (placa) REFERENCES vehiculos(placa) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT cod_servicio_fk FOREIGN KEY (cod_servicio, num_consecutivo) REFERENCES actividades(cod_servicio, num_consecutivo) ON DELETE RESTRICT ON UPDATE CASCADE
);

--
CREATE TABLE utiliza(
  num_unico INTEGER NOT NULL,
  num_detalle INTEGER NOT NULL,
  ci_trabajador VARCHAR(8) NOT NULL,
  cod_producto VARCHAR(6) NOT NULL,
  precio_actual DECIMAL NOT NULL,
  cantidad_usada INTEGER NOT NULL,
   PRIMARY KEY (
    num_unico,
    num_detalle,
    ci_trabajador,
    cod_producto
  ),
  CONSTRAINT num_unico_fk FOREIGN KEY (num_unico, num_detalle) REFERENCES detalle_servicio(num_unico, num_detalle) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT ci_trabajador_fk FOREIGN KEY (ci_trabajador) REFERENCES trabajadores(ci_trabajador) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT cod_producto_fk FOREIGN KEY (cod_producto) REFERENCES productos(cod_producto) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT v_precio_actual CHECK(precio_actual > 0),
  CONSTRAINT v_cantidad_usada CHECK(cantidad_usada > 0)
);


--
CREATE TABLE se_le_recomiendan(
  cod_modelo VARCHAR(5) NOT NULL,
  cod_servicio VARCHAR(3) NOT NULL,
  kilometraje DECIMAL NOT NULL,
  tiempo_uso INTEGER NOT NULL,
  PRIMARY KEY (
    cod_modelo,
    cod_servicio,
    kilometraje,
    tiempo_uso
  ),
  CONSTRAINT cod_modelo_fk FOREIGN KEY (cod_modelo) REFERENCES modelos(cod_modelo) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT cod_servicio_fk FOREIGN KEY (cod_servicio) REFERENCES servicios(cod_servicio) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT v_kilometraje_recomiendan CHECK(kilometraje > 0),
  CONSTRAINT v_tiempo_uso CHECK(tiempo_uso > 0)
);

--
CREATE TABLE especifica(
  num_unico INTEGER NOT NULL,
  num_detalle INTEGER NOT NULL,
  cod_actividad VARCHAR(3) NOT NULL,
  num_consecutivo INTEGER NOT NULL,
   PRIMARY KEY(
    num_unico,
    num_detalle,
    cod_actividad,
    num_consecutivo
  ),
  CONSTRAINT num_unico_fk FOREIGN KEY (num_unico, num_detalle) REFERENCES detalle_servicio(num_unico, num_detalle) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT cod_actividad_fk FOREIGN KEY (cod_actividad, num_consecutivo) REFERENCES actividades(cod_servicio, num_consecutivo) ON DELETE RESTRICT ON UPDATE CASCADE
);
