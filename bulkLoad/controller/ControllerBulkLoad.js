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
 const express = require('express');
 const router = express.Router();
 
 const bulkLoadValidator = require("../validators/ValidatorBulkLoad");
 const bulkLoadBusiness = require("../business/BusinessBulkLoad");
 const auth = require('../../security/controller/authenticator.controller');

router.post("/invoice-load", auth.verifyToken, async(req, res,next) => {
    
    /*Step 1:  Se valida los campos entrada*/
    const result = await bulkLoadValidator.validateBulkLoad(req, res);
    
    if(result === true){
       return await bulkLoadBusiness.createInvoiceBulkLoad_2(req,res,next);
    }
    
});


module.exports = router;