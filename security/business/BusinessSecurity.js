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

 const securityPersistence = require('../persistence/PersistenceSecurity');

exports.getUserCredentials = async (req,res) => {
    await securityPersistence.getUserCredentials(req,res);
};
