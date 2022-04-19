/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2021
 *
 * @author: Rodrigo Alberto gomez Flores {02/09/2021}
 * @updated: -
 * @description:
 * @since-version: 1.0
 **/
 const token = require("../../security/business/jwt.controller");

 exports.verifyToken = (req, res, next) => {

    const bearerHeader =  req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token  = bearerToken;
          
        token.verifyToken(req.token)
            .then(async (decoded) => {
                next();
        }).catch(err => {
            console.log("error >> " + err);
            return res.status(403)
            .json({
                success: false, 
                description: "Don't have permissions to access"
            })
        });
          
    }else{
        return res.status(403)
            .json({
                success: false, 
                description: "Don't have permissions to access"
            })
    }
    
};