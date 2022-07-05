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
 const invoicePersistence = require('../persistence/PersistenceInvoice');

 exports.validateRFCInvoice = async (req,res) => {
    
    const rfc = req.query.rfc;
    console.log("RFC: " + rfc);
    let success = true;
    try {
        /** Step 1: Se validan el campo RFC */
        if(await utils.isEmpty(rfc)){
            success = false;
            return res.status(400)
                .json({
                    success: false, 
                    code:"1000",
                    description: "RFC is requerired"
                })
        }
        //let validFRC = await utils.isRFCValid(rfc)
        let validFRC = true;
        if(!validFRC) {
            success = false;
            return res.status(400)
                .json({
                    success: false, 
                    code:"1001",
                    description: "RFC invalid format"
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
    

    return success;
};

exports.validateCreateInvoice = async (req,res) => {
    
    const rfc = req.body.rfc
    const name = req.body.name;
    const regime = req.body.regime;
    const postal_code = req.body.postal_code;
    const account_bank = req.body.account_bank;
    const email = req.body.email;
    
    let success = true;

    console.log("Req: >> " + rfc + " - " + name + " - " + regime + " - " + postal_code + " - " + account_bank + " - " + email);
    
    try {
        /** Step 1: Se validan que los campos no sean NULL  */
        if(await utils.isEmpty(rfc) || await utils.isEmpty(name) || await utils.isEmpty(regime) || await utils.isEmpty(postal_code)){
            success = false;
            return res.status(400)
                .json({
                    success: false,
                    code:"1001", 
                    description: "Missing parameters"
                })
        }

        /** Step 2: Se validan formato correcto del RFC */
        let validFRC = await utils.isRFCValid(rfc)
        if(!validFRC){
            success = false;
            return res.status(400)
                .json({
                    success: false,
                    code:"1002", 
                    description: "Bad format RFC parameters"
                })
        }
        
        /** Step 4: Se validan campo email */
        if(await !utils.isEmail(email) ){
            success = false;
            return res.status(400)
                .json({
                    success: false,
                    code:"1003", 
                    description: "Bad format email parameters"
                })
        }
        /** Step 4: Se validan campo Regime de los valores permitidos segun BD*/
        let regimeList = await invoicePersistence.getRegime(req,res) 
        console.log("Validando: "+ regimeList.propertieValue + " >> " + regime);
        if(!regimeList.propertieValue.includes(regime)){
            success = false;
            return res.status(400)
                .json({
                    success: false, 
                    code:"1004",
                    description: "Regime value is invalid"
            })
        }

        /** Step 5: Si la validacion es correcta retorno cursor. */
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

exports.validateUpdateInvoice = async (req,res) => {
    
    let rfc,name, regime = null;
    let success = true;
    try {
        req.query.rfc == undefined ? rfc = undefined : rfc = req.query.rfc;
        
        /** Step 1: Se validan el campo RFC, como requerido  */
        if(await utils.isEmpty(rfc) ){
            success = false;
            return res.status(400)
                .json({
                    success: false,
                    code:"1001", 
                    description: "RFC Missing parameters"
                })
        }
        
        /** Step 2: Se validan el campo Name */
        if(req.body.name != undefined || req.body.name == ""){
            if (await utils.isNumber(req.body.name)){
                success = false;
                return res.status(400)
                .json({
                    success: false,
                    code:"1002", 
                    description: "Bad format input parameters >> .Name."
                })
            }
        }
        
        /** Step 3: Se validan el campo Postal Code  */
        if(req.body.postal_code != undefined || req.body.postal_code == ""){
            if (await utils.isNumber(req.body.postal_code)){
                success = false;
                return res.status(400)
                .json({
                    success: false,
                    code:"1003", 
                    description: "bad format input parameters >> .postal_code."
                })
            }
        }

        /** Step 4: Se validan el campo Email  */
        if(req.body.email != undefined || req.body.email == ""){
            if (await !utils.isEmail(req.body.email)){
                success = false;
                return res.status(400)
                .json({
                    success: false,
                    code:"1004", 
                    description: "bad format input parameters >> .email."
                })
            }
        }

        /** Step 5: Se validan el campo Regime */
        if(req.body.regime != undefined || req.body.regime == ""){
            let regimeList = await invoicePersistence.getRegime(req,res) 
            console.log("Validando: "+ regimeList.propertieValue + " >> " + req.body.regime);
            if(!regimeList.propertieValue.includes(req.body.regime)){
                success = false;
                return res.status(400)
                    .json({
                        success: false, 
                        code:"1005",
                        description: "Regime value is invalid"
                })
            }
        }
       
        /** Step 6: Se validan el campo account_bank */
        if(req.body.account_bank != undefined || req.body.account_bank == ""){
            if(await utils.isNumber(req.body.account_bank)){
                success = false;
                return res.status(400)
                    .json({
                        success: false, 
                        code:"1005",
                        description: "bad format input parameters >> .email."
                })
                
            } 
        }

        /** Step 5: Si la validacion es correcta retorno cursor. */
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