/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2022
 *
 * @author: Gonzalo Barragan {25/03/2022}
 * @updated: -
 * @description:
 * @since-version: 1.0
 **/
const jwt = require('jsonwebtoken');

const getJwtToken = async function(payload) {
    //console.log(payload);
    return jwt.sign({payload}, process.env.SECRET_JWT_EXPIRES, { expiresIn: process.env.SECRET_JWT_EXPIRES });
};

const verifyToken = async function(userToken) {
    return new Promise((resolve, reject) => {
        jwt.verify(userToken, process.env.SECRET_JWT_EXPIRES, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        })
    });
}

module.exports.getJwtToken = getJwtToken;
module.exports.verifyToken = verifyToken;