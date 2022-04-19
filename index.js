/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2021
 *
 * @author: Gonzalo Barragan {25/03/2022}
 * @updated: -
 * @description: Punto de entrada a la aplicación, donde se configuran y se cargan los componentes.
 * @since-version: 1.0
 **/
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require("morgan");
const multer = require('multer');
require('dotenv').config();
const provider = require('./commons/auth/auth');

/*Requiere Component*/
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(logger("dev"));
 app.use(multer({
  dest: 'apps/nodejs/public'
}).single('file-upload'));



/*Controller*/ 
const invoice = require("./invoice/controller/ControllerInvoice");
const properties = require("./properties/controller/ControllerProperties");
const security = require("./security/controller/ControllerSecurity");
const invoiceLoad = require("./bulkLoad/controller/ControllerBulkLoad");

app.use("/api/v1", invoice);
app.use("/api/v1", properties);
app.use("/api/v1", security);
app.use("/api/v1", invoiceLoad);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server running on port '+ PORT);
})