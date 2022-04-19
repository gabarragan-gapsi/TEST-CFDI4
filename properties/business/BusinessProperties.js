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

 const customerPersistence = require('../persistence/PersistenceProperties');

exports.getPropertiesByKey = async (req,res) => {
    await customerPersistence.getPropertiesByKey(req,res);
};

exports.createPropertie = async (req,res) => {
    await customerPersistence.createPropertie(req,res);
};

exports.updatePropertie = async (req,res) => {
    await customerPersistence.updatePropertie(req,res);
};

exports.deletePropertieByKey = async (req,res) => {
    await customerPersistence.deletePropertieByKey(req,res);
};
