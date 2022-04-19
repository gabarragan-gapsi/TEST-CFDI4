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

 const token = require("../../security/business/jwt.controller");
 const securityValidators = require('../validators/ValidatorSecurity');
 const businessValidators = require('../business/BusinessSecurity');
router.post('/security', jsonParser, async(req, res) => {
    
    try {
       
        /*Step 1:  Se valida los campos entrada*/
        const result = await securityValidators.validateAuthUser(req, res);

        if(result === true){
            await businessValidators.getUserCredentials(req,res);  
        }
        
    } catch (error) {
        console.log('authlogin error :>> ', error);
        return res.status(500)
        .json({
            success: false,
            code:500, 
            description: "An unexpected server side error has occurred"
        });
    }
});

module.exports = router;