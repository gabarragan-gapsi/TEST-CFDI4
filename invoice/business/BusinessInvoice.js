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

 const customerPersistence = require('../persistence/PersistenceInvoice');

exports.getInvoiceByRFC = async (req,res) => {
    await customerPersistence.getInvoiceByRFC(req,res);
};

exports.createInvoice = async (req,res) => {
    await customerPersistence.createInvoice(req,res);
};

exports.updateInvoice = async (req,res) => {
    await customerPersistence.updateInvoice(req,res);
};
exports.deleteInvoiceByRFC = async (req,res) => {
    await customerPersistence.deleteInvoiceByRFC(req,res);
};
