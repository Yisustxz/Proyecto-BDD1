-- 

CREATE DOMAIN dom_modalidad as VARCHAR(2) NOT NULL
CHECK (VALUE = 'EB' AND VALUE = 'ED' AND VALUE = 'T'
AND VALUE = 'TD' AND VALUE = 'TC');

CREATE DOMAIN dom_aceite as VARCHAR(3) NOT NULL
CHECK (VALUE = 'AM' AND VALUE = 'AS' AND VALUE = 'ASS'
AND VALUE = 'AAM' AND VALUE = 'AMG');
-- AM = aceite mineral AS= aceite sintetico ASS = aceite semisintetico 
--AAM = aceite alta milla AMG= aceite multigrado 

CREATE DOMAIN dom_cargo as VARCHAR(2) NOT NULL
CHECK (VALUE = 'A');
-- A= analista


--

CREATE TABLE estados(
  cod_est VARCHAR(4) NOT NULL,
  nombre_est VARCHAR(20) NOT NULL
);

ALTER TABLE estados
  ADD PRIMARY KEY (cod_est);

--

CREATE TABLE ciudades(
  cod_est VARCHAR(4) NOT NULL ,
  num_consecutivo SERIAL NOT NULL,
  nombre_ciudad VARCHAR(20) NOT NULL
);

ALTER TABLE ciudades
  ADD PRIMARY KEY (cod_est,num_consecutivo),
  ADD CONSTRAINT cod_est_fk FOREIGN KEY (cod_est) REFERENCES estados(cod_est) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

--

CREATE TABLE trabajadores(
  ci_trabajador VARCHAR(8) NOT NULL ,
  nombre_trabajador VARCHAR(40) NOT NULL,
  direccion_trabajador TEXT NOT NULL,
  telefono_trabajador VARCHAR(11),
  sueldo_trabajador DECIMAL NOT NULL,
  cargo dom_cargo NOT NULL
);

ALTER TABLE trabajadores
  ADD PRIMARY KEY (ci_trabajador),
  ADD CONSTRAINT v_sueldo_trabajador CHECK(sueldo_trabajador>=0);

--

CREATE TABLE encargados(
  ci_encargado VARCHAR(8) NOT NULL ,
  nombre_encargado VARCHAR(40) NOT NULL,
  direccion_encargado TEXT NOT NULL,
  telefono_encargado VARCHAR(11) ,
  sueldo_trabajador DECIMAL NOT NULL,
  cargo dom_cargo NOT NULL
);

ALTER TABLE encargados
  ADD PRIMARY KEY (ci_encargado);

--

CREATE TABLE familia_productos(
  cod_tipo VARCHAR(6) NOT NULL ,
  nombre VARCHAR(15) NOT NULL
);

ALTER TABLE familia_productos
  ADD PRIMARY KEY (cod_tipo);

--

CREATE TABLE descuentos(
  porcentaje DECIMAL NOT NULL,
  rango_min INTEGER NOT NULL,
  rango_max INTEGER NOT NULL
);

ALTER TABLE descuentos
  ADD PRIMARY KEY (porcentaje),
  ADD CONSTRAINT v_rango_max CHECK(rango_max>rango_min);

--

CREATE TABLE clientes(
  ci_cliente VARCHAR(7) NOT NULL ,
  nombre_cliente VARCHAR(40) NOT NULL,
  correo VARCHAR(20) NOT NULL,
  telefono_principal VARCHAR(11) NOT NULL,
  telefono_secundaria VARCHAR(11) NOT NULL
);

ALTER TABLE clientes
  ADD PRIMARY KEY (ci_cliente);

--

CREATE TABLE concesionario(
  rif VARCHAR(10) NOT NULL ,
  nombre VARCHAR(15) NOT NULL,
  cod_est VARCHAR(4) NOT NULL,
  num_consecutivo INTEGER NOT NULL,
  ci_encargado VARCHAR(8) NOT NULL
);

ALTER TABLE concesionario
  ADD PRIMARY KEY (rif),
  ADD CONSTRAINT cod_est_fk FOREIGN KEY (cod_est,num_consecutivo) REFERENCES ciudades(cod_est,num_consecutivo) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
 /*  ADD CONSTRAINT num_consecutivo_fk FOREIGN KEY (num_consecutivo) REFERENCES ciudades(num_consecutivo) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE, */
  ADD CONSTRAINT ci_encargado_fk FOREIGN KEY (ci_encargado) REFERENCES encargados(ci_encargado) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

--

CREATE TABLE servicios(
  cod_servicio VARCHAR(3) NOT NULL ,
  nombre_servicio VARCHAR(20) NOT NULL,
  descripcion_servicio TEXT NOT NULL,
  tiempo_reserva TIMESTAMP,
  capacidad INTEGER NOT NULL,
  ci_trabajador VARCHAR(8) NOT NULL,
  porcentaje DECIMAL NOT NULL 
);

ALTER TABLE servicios
  ADD PRIMARY KEY (cod_servicio),
  ADD CONSTRAINT ci_trabajador_fk FOREIGN KEY (ci_trabajador) REFERENCES trabajadores(ci_trabajador) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
  ADD CONSTRAINT porcentaje_fk FOREIGN KEY (porcentaje) REFERENCES descuentos(porcentaje) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
  ADD CONSTRAINT v_capacidad CHECK(capacidad>=0),
  ADD CONSTRAINT v_porcentaje CHECK(porcentaje>=0);

--

CREATE TABLE modelos(
  cod_modelo VARCHAR(5) NOT NULL ,
  nombre_modelo VARCHAR(20) NOT NULL,
  num_asiento INTEGER NOT NULL,
  marca VARCHAR(10) NOT NULL,
  peso DECIMAL NOT NULL,
  t_aceite dom_aceite NOT NULL,
  aceite_caja VARCHAR(6) NOT NULL,
  octanaje VARCHAR(2) NOT NULL,
  t_refrigerante VARCHAR(5) NOT NULL
);

ALTER TABLE modelos
  ADD PRIMARY KEY (cod_modelo);

--

CREATE TABLE vehiculos(
  placa VARCHAR(7) NOT NULL ,
  ano_vehiculo DATE NOT NULL,
  num_serial VARCHAR(10) NOT NULL,
  num_motor VARCHAR(8) NOT NULL,
  color VARCHAR(10) NOT NULL,
  fecha_venta DATE NOT NULL,
  concesionario_vendedor VARCHAR(15) NOT NULL,
  info_importante VARCHAR(2) NOT NULL,
  cod_modelo VARCHAR(5) NOT NULL,
  ci_cliente VARCHAR(8) NOT NULL 

);

ALTER TABLE vehiculos
  ADD PRIMARY KEY (placa),
  ADD CONSTRAINT cod_modelo_fk FOREIGN KEY (cod_modelo) REFERENCES modelos(cod_modelo)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
  ADD CONSTRAINT ci_cliente_fk FOREIGN KEY (ci_cliente) REFERENCES clientes(ci_cliente)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
  ADD CONSTRAINT uk_num_serial UNIQUE (num_serial),
  ADD CONSTRAINT uk_num_motor UNIQUE (num_motor);

--

CREATE TABLE reserva(
  cod_reserva VARCHAR(6) NOT NULL ,
  placa VARCHAR(7) NOT NULL,
  cod_servicio VARCHAR(3) NOT NULL,
  fecha_reservada TIMESTAMP NOT NULL,
  asistio BOOLEAN DEFAULT NULL,
  kilometraje DECIMAL NOT NULL
);

ALTER TABLE reserva
  ADD PRIMARY KEY (cod_reserva),
   ADD CONSTRAINT placa_fk FOREIGN KEY (placa) REFERENCES vehiculos(placa)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
   ADD CONSTRAINT cod_servicio_fk FOREIGN KEY (cod_servicio) REFERENCES servicios(cod_servicio);
  
--

CREATE TABLE ordenes_servicio(
  num_unico SERIAL NOT NULL ,
  ci_autorizado VARCHAR(8) DEFAULT NULL,
  nombre_autorizado VARCHAR(40) DEFAULT NULL,
  hora_entrada TIME NOT NULL,
  hora_salida_estimada TIME NOT NULL,
  hora_salida_real TIME NOT NULL,
  fecha_entrada DATE NOT NULL,
  fecha_salida_estimada DATE NOT NULL,
  fecha_salida_real DATE NOT NULL,
  placa VARCHAR(7) NOT NULL,
  ci_trabajador VARCHAR(8) NOT NULL

);

ALTER TABLE ordenes_servicio
  ADD PRIMARY KEY (num_unico),
   ADD CONSTRAINT placa_fk FOREIGN KEY (placa) REFERENCES vehiculos(placa)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
   ADD CONSTRAINT ci_trabajador_fk FOREIGN KEY (ci_trabajador) REFERENCES trabajadores(ci_trabajador);

--

CREATE TABLE productos(
  cod_producto VARCHAR(6) NOT NULL ,
  nombre_producto VARCHAR(40) NOT NULL,
  descripcion_producto TEXT NOT NULL,
  es_ecologico BOOLEAN NOT NULL,
  precio DECIMAL NOT NULL,
  cantidad INTEGER NOT NULL,
  cantidad_minima INTEGER NOT NULL,
  cantidad_maxima INTEGER NOT NULL,
  cod_tipo VARCHAR(6) NOT NULL,
  proveedor VARCHAR(15) NOT NULL
);

ALTER TABLE productos
  ADD PRIMARY KEY (cod_producto),
   ADD CONSTRAINT cod_tipo_fk FOREIGN KEY (cod_tipo) REFERENCES familia_productos(cod_tipo)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

--

CREATE TABLE facturas(
  num_factura VARCHAR(10) NOT NULL ,
  costo_mano_obra DECIMAL NOT NULL,
  monto_total DECIMAL NOT NULL,
  fecha_factura DATE NOT NULL,
  num_unico INTEGER NOT NULL
);

ALTER TABLE facturas
  ADD PRIMARY KEY (num_factura),
   ADD CONSTRAINT num_unico_fk FOREIGN KEY (num_unico) REFERENCES ordenes_servicio(num_unico)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
  ADD CONSTRAINT v_costo_mano_obra CHECK(costo_mano_obra>0),
  ADD CONSTRAINT v_monto_total CHECK(monto_total>0);

--

CREATE TABLE actividades(
  cod_servicio VARCHAR(3) NOT NULL,
  num_consecutivo INTEGER NOT NULL,
  descripcion_actividad TEXT NOT NULL,
  costo_actividad DECIMAL NOT NULL
);

ALTER TABLE actividades
  ADD PRIMARY KEY (cod_servicio,num_consecutivo),
  ADD CONSTRAINT cod_servicio_fk FOREIGN KEY (cod_servicio) REFERENCES servicios(cod_servicio)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
  ADD CONSTRAINT v_costo_actividad CHECK(costo_actividad>0);

--

CREATE TABLE detalle_servicio(
  num_unico INTEGER NOT NULL,
  cantidad INTEGER NOT NULL,
  costo DECIMAL NOT NULL,
  num_detalle INTEGER NOT NULL
);

ALTER TABLE detalle_servicio
  ADD PRIMARY KEY (num_unico,num_detalle),
  ADD CONSTRAINT num_unico_fk FOREIGN KEY (num_unico) REFERENCES ordenes_servicio(num_unico)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

--

CREATE TABLE pagos(
  num_factura VARCHAR (10) NOT NULL,
  num_consecutivo INTEGER NOT NULL,
  modalidad dom_modalidad NOT NULL,
  fecha_pago DATE NOT NULL,
  monto DECIMAL NOT NULL,
  num_tarjeta VARCHAR(18) DEFAULT NULL,
  num_banco VARCHAR(20) DEFAULT NULL
);

ALTER TABLE pagos
  ADD PRIMARY KEY (num_factura,num_consecutivo),
   ADD CONSTRAINT num_factura_fk FOREIGN KEY (num_factura) REFERENCES facturas(num_factura)
   ON DELETE RESTRICT 
   ON UPDATE CASCADE;


   -- FALTA LOS CHECK DE MODALIDAD, TARJETA Y BANCO 


--

CREATE TABLE se_especializa(
  ci_trabajador VARCHAR(8) NOT NULL,
  cod_servicio VARCHAR(3) NOT NULL
);

ALTER TABLE se_especializa
  ADD PRIMARY KEY (ci_trabajador,cod_servicio),
  ADD CONSTRAINT ci_trabajador_fk FOREIGN KEY (ci_trabajador) REFERENCES trabajadores(ci_trabajador)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
  ADD CONSTRAINT cod_servicio_fk FOREIGN KEY (cod_servicio) REFERENCES servicios(cod_servicio)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

--

CREATE TABLE posee(
  rif VARCHAR(10) NOT NULL,
  cod_modelo VARCHAR(5) NOT NULL
);

ALTER TABLE posee
  ADD PRIMARY KEY (rif,cod_modelo),
  ADD CONSTRAINT rif_fk FOREIGN KEY (rif) REFERENCES concesionario(rif)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
  ADD CONSTRAINT cod_modelo_fk FOREIGN KEY (cod_modelo) REFERENCES modelos(cod_modelo)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

--

CREATE TABLE se_le_hacen(
  placa VARCHAR(7) NOT NULL,
  cod_servicio VARCHAR(5) NOT NULL,
  num_consecutivo INTEGER NOT NULL
);

ALTER TABLE se_le_hacen
  ADD PRIMARY KEY (placa,cod_servicio,num_consecutivo),
  ADD CONSTRAINT placa_fk FOREIGN KEY (placa) REFERENCES vehiculos(placa)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
  ADD CONSTRAINT cod_servicio_fk FOREIGN KEY (cod_servicio,num_consecutivo) REFERENCES actividades(cod_servicio,num_consecutivo)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

--

CREATE TABLE utiliza(
  num_unico INTEGER NOT NULL,
  num_detalle INTEGER NOT NULL,
  ci_trabajador VARCHAR(8) NOT NULL,
  cod_producto VARCHAR(6) NOT NULL,
  precio_actual DECIMAL NOT NULL,
  cantidad_usada INTEGER NOT NULL
);

ALTER TABLE utiliza
  ADD PRIMARY KEY (num_unico,num_detalle,ci_trabajador,cod_producto),
  ADD CONSTRAINT num_unico_fk FOREIGN KEY (num_unico,num_detalle) REFERENCES detalle_servicio(num_unico,num_detalle)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
  ADD CONSTRAINT ci_trabajador_fk FOREIGN KEY (ci_trabajador) REFERENCES trabajadores(ci_trabajador)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
  ADD CONSTRAINT cod_producto_fk FOREIGN KEY (cod_producto) REFERENCES productos(cod_producto)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

--

CREATE TABLE se_le_recomiendan(
  cod_modelo VARCHAR(5) NOT NULL,
  cod_servicio VARCHAR(3) NOT NULL,
  kilometraje DECIMAL NOT NULL,
  tiempo_uso TIME NOT NULL
);

ALTER TABLE se_le_recomiendan
  ADD PRIMARY KEY (cod_modelo,cod_servicio,kilometraje,tiempo_uso),
  ADD CONSTRAINT cod_modelo_fk FOREIGN KEY (cod_modelo) REFERENCES modelos(cod_modelo)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
  ADD CONSTRAINT cod_servicio_fk FOREIGN KEY (cod_servicio) REFERENCES servicios(cod_servicio)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;

--

CREATE TABLE especifica(
  num_unico INTEGER NOT NULL,
  num_detalle INTEGER NOT NULL,
  cod_actividad VARCHAR(3) NOT NULL,
  num_consecutivo INTEGER NOT NULL
);

ALTER TABLE especifica
  ADD PRIMARY KEY (num_unico,num_detalle,cod_actividad,num_consecutivo),
  ADD CONSTRAINT num_unico_fk FOREIGN KEY (num_unico,num_detalle) REFERENCES detalle_servicio(num_unico,num_detalle)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
  ADD CONSTRAINT cod_actividad_fk FOREIGN KEY (cod_actividad,num_consecutivo) REFERENCES actividades(cod_servicio,num_consecutivo)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE;
  
  