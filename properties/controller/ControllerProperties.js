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

 const propertiesValidators = require('../validators/ValidatorProperties');
 const propertiesBusiness = require('../business/BusinessProperties');
 const auth = require('../../security/controller/authenticator.controller');


router.get("/properties",auth.verifyToken, async(req, res) => {
    
    /*Step 1:  Se valida los campos entrada*/
    const result = await propertiesValidators.validateGetProperties(req, res);
    
    /*Step 2:  Si es existo, pasamos el procesos a la Capa de Negocio*/
    if(result === true){
        await propertiesBusiness.getPropertiesByKey(req,res);
    }
});

router.post("/properties", auth.verifyToken, jsonParser, async(req, res) => {
    
    /*Step 1:  Se valida los campos entrada*/
    const result = await propertiesValidators.validateCreateProperties(req, res);
    
    /*Step 2:  Si es existo, pasamos el procesos a la Capa de Negocio*/
    if(result === true){
        return await propertiesBusiness.createPropertie(req,res);
    }
    
});

router.put("/properties", auth.verifyToken, jsonParser, async(req, res) => {
    
    /*Step 1:  Se valida los campos entrada*/
    const result = await propertiesValidators.validateGetProperties(req, res);
    
    /*Step 2:  Si es existo, pasamos el procesos a la Capa de Negocio*/
    if(result){
        await propertiesBusiness.updatePropertie(req,res);
    }
    
});

router.delete("/cfdi4/properties", auth.verifyToken, async(req, res) => {
    
    /*Step 1:  Se valida los campos entrada*/
    const result = await propertiesValidators.validateGetProperties(req, res);
    
    /*Step 2:  Si es existo, pasamos el procesos a la Capa de Negocio*/
    if(result){
        await propertiesBusiness.deletePropertieByKey(req,res);
    }
});

module.exports = router;