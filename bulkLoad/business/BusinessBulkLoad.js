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
 
 const fs = require('fs');
 const path = require('path');
 //const csv = require('csv-parser');
 //const readline = require("readline");
 const csv = require('csvtojson')
 const {promisify} = require('util')
 const unlinkAsync = promisify(fs.unlink)

 const multer = require('multer')
 const upload = multer({dest: 'uploads/'});
 
 const bulkLoadPersistence = require('../persistence/PersistenceBulkLoad');
 const utils = require('../../commons/utils/Utils');


 exports.createInvoiceBulkLoad_2 = async (req,res,next) => {
    
    let rfcValid;
    let exitRFC;
    const resutlToInset = [];
    var file;

    try {
        /* Step 0: seteamos la ruta de los archivos donde se almacenan*/
        const Path = './apps/nodejs/public/';
        var files = fs.readdirSync(Path);
       
        /* Step 1: Procesamos el archivos .CSV candidato a leer*/
        let jsonArray = await csv().fromFile(req.file.path);
        console.log("Tamaño .CSV: " + jsonArray.length);
    
        /* Step 2: Retornamos el cursos al servicio, mientras se continua con el proceso.*/
        if(files.length == 1){
            res.status(200)
            .json({
                success: true,
                code:200,
                description: "Invoice bulk upload process created Successfully"
            });
        }else{
            return res.status(400)
            .json({
                success: true,
                code:400,
                description: "Unable to run processes. The system have another file in progress"
            });
        }
        
        next();
        console.log("Continuamos....");
        
        /* Step 3: Validamos la data y validamos con BD si el RFC existe*/
        for (item of jsonArray){
            uploadFlags = true;
            rfcValid =  await utils.isRFCValid(item.RFC);
            if(rfcValid == true){
                exitRFC =  await bulkLoadPersistence.getInvoiceByRFC(item.RFC);
                if(exitRFC == false){
                    console.log("-->" + item.RFC);
                    resutlToInset.push(item)
                }
            }
        }
        
        /* Step 4: Eliminamos el archivo que se proceso*/
        for (file of files){
            let FilePath = Path + file;
            fs.unlink(FilePath,function(err){
                if(err) return console.log(err);
                console.log('File deleted successfully');
           });    
        }

        await bulkLoadPersistence.createInvoiceLoad(resutlToInset);
        
    } catch (error) {
        /* Step 5: Eliminamos archivos de procesos en caso de haber ocurrido algun error*/
        for (file of files){
            let FilePath = Path + file;
            fs.unlink(FilePath,function(err){
                if(err) return console.log(err);
                console.log('File deleted successfully in error case.');
           });    
        }
        return res.status(500)
            .json({
                success: true,
                code:500,
                description: "Invoice bulk upload process failed"
        });
    }
    
 }

