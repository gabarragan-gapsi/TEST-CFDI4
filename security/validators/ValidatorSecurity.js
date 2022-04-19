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

 exports.validateAuthUser = async (req,res) => {
    
    const applicationKey = req.body.applicationKey;
    const applicationPassword = req.body.applicationPassword;
    
    let success = true;

    try {
        /** Step 1: Se validan el campo PropertieKey */
        if(await utils.isEmpty(applicationKey) || await utils.isEmpty(applicationPassword)){
            success = false;
            return res.status(400)
                .json({
                    success: false, 
                    code:"1001",
                    description: "Missing parameter >> applicationKey | applicationPassword is requiered"
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