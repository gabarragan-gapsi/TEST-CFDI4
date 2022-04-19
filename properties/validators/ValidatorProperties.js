/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2022
 *
 * @author: Gonzalo Barragan {24/03/2022}
 * @updated: -
 * @description:
 * @since-version: 1.0
 **/

 const utils = require('../../commons/utils/Utils');

 exports.validateGetProperties = async (req,res) => {
    
    const propertieKey = req.query.propertie_key;
    console.log("Propertie: " + propertieKey);
    let success = true;

    try {
        /** Step 1: Se validan el campo PropertieKey */
        if(await utils.isEmpty(propertieKey)){
            success = false;
            return res.status(400)
                .json({
                    success: false, 
                    code:"1001",
                    description: "propertieKey is requerired"
                })
        }
 
        /** Step 2: Si la validacion es correcta retorno cursor. */
        return success;
    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                code:"500", 
                description: "Error parsing data"
            })
    }
    
};

exports.validateCreateProperties = async (req,res) => {
    
    const propertieKey = req.body.propertie_key
    const propertieValue = req.body.propertie_value;

    console.log("Propertie: " + propertieKey + " " + propertieValue);
    let success = true;

    try {
        /** Step 1: Se validan el campo PropertieKey */
        if(await utils.isEmpty(propertieKey)){
            success = false;
            return res.status(400)
                .json({
                    success: false, 
                    code:"1001",
                    description: "propertieKey is requerired"
                })
        }
        
        /** Step 1: Se validan el campo PropertieKey */
        if(await utils.isEmpty(propertieValue)){
            success = false;
            return res.status(400)
                .json({
                    success: false, 
                    code:"1002",
                    description: "propertieValue is requerired"
                })
        }

        /** Step 2: Si la validacion es correcta retorno cursor. */
        return success;
    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                code:"500", 
                description: "An unexpected server side error has occurred"
            })
    }  
};

exports.validateUpdateProperties = async (req,res) => {
    
    const propertieKey = req.query.propertie_key
    const propertieValue = req.body.propertie_value;

    console.log("Propertie Update: " + propertieKey + " " + propertieValue);
    let success = true;

    try {
        /** Step 1: Se validan el campo PropertieKey */
        if(await utils.isEmpty(propertieKey)){
            success = false;
            return res.status(400)
                .json({
                    success: false, 
                    code:"1001",
                    description: "propertieKey is requerired"
                })
        }
        
        /** Step 1: Se validan el campo PropertieKey */
        if(await utils.isEmpty(propertieValue)){
            success = false;
            return res.status(400)
                .json({
                    success: false, 
                    code:"1002",
                    description: "propertieValue is requerired"
                })
        }

        /** Step 2: Si la validacion es correcta retorno cursor. */
        return success;
    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                code:"500", 
                description: "An unexpected server side error has occurred"
            })
    }
    
};