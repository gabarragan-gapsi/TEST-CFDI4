/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2021
 *
 * @author: Gonzalo Barragan {24/03/2022}
 * @updated: -
 * @description:
 * @since-version: 1.0
 **/

 const express = require("express");
 const router = express.Router();
 const bodyParser = require('body-parser');

/*Requiere Component*/ 
 var jsonParser = bodyParser.json()

 const customerValidators = require('../validators/ValidatorInvoice');
 const customerBusiness = require('../business/BusinessInvoice');
 const auth = require('../../security/controller/authenticator.controller');

router.get("/cfdi4/invoice", auth.verifyToken, async(req, res) => {
   
    /*Step 1:  Se valida los campos entrada*/
    const result = await customerValidators.validateRFCInvoice(req, res);
    
    /*Step 2:  Si es existo, pasamos el procesos a la Capa de Negocio*/
    if(result === true){
        await customerBusiness.getInvoiceByRFC(req,res);
    }
});

router.post("/cfdi4/invoice", auth.verifyToken, jsonParser, async(req, res) => {
    
    /*Step 1:  Se valida los campos entrada*/
    const result = await customerValidators.validateCreateInvoice(req, res);
    console.log("Salida POST: " + result);
    /*Step 2:  Si es existo, pasamos el procesos a la Capa de Negocio*/
    if(result === true){
        return await customerBusiness.createInvoice(req,res);
    }
    
});

router.put("/cfdi4/invoice", auth.verifyToken, jsonParser, async(req, res) => {
    
    /*Step 1:  Se valida los campos entrada*/
    const result = await customerValidators.validateUpdateInvoice(req, res);
    console.log("Salida PUT: " + result);
    /*Step 2:  Si es existo, pasamos el procesos a la Capa de Negocio*/
    if(result){
        await customerBusiness.updateInvoice(req,res);
    }
    
});

router.delete("/cfdi4/invoice", auth.verifyToken, async(req, res) => {
    
    /*Step 1:  Se valida los campos entrada*/
    const result = await customerValidators.validateRFCInvoice(req, res);
    
    /*Step 2:  Si es existo, pasamos el procesos a la Capa de Negocio*/
    if(result){
        await customerBusiness.deleteInvoiceByRFC(req,res);
    }
});

module.exports = router;