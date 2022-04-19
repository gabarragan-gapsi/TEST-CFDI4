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
 const express = require('express')
 const app = express();
 const multer = require('multer')
 
 //const fileUpload = require('express-fileupload');
 const fs = require('fs');
 const path = require('path');

 //const utils = require('../../commons/utils/Utils');

 /*app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : path.join(__dirname,'tmp'),
    }));
*/

 exports.upload = async (req, res) => {
    
    let success = true;
    
    try {
        /**Step 1: Validamos que exista un archivo cargado.*/
        if (!req.files ) {
            success = false;
            return res.status(400)
                .json({
                    success: false,
                    code:"1001", 
                    description: "No file were uploaded."
                })
        }
        
        /**Step 2: Validamos que el archivo sea .csv*/
        let fileList = ['.csv'];
        console.log("1." + req.file.name)
        console.log("2." + req.file)
        //let extName = path.extname(req.files.originalname);
        /*if(!fileList.includes(req.files.name)){
            success = false;
            return res.status(400)
                .json({
                    success: false,
                    code:"1002", 
                    description: "Invalid file type"
                });
        }*/
         /**Step 3: Validamos el tamaño maximo del archivo > Tamaño maximo 10mb*/
         if(req.files.size > 10485760){
            success = false;
            return res.status(400)
                .json({
                    success: false,
                    code:"1003", 
                    description: "File is too large"
                });
        }
        
        return success;
    } catch (error) {
        console.log("Error: >> " + error);
        return res.status(500)
            .json({
                success: false,
                code:"500", 
                description: "Error parsing data"
            })
    }


}
 exports.validateBulkLoad = async (req,res) => {
    
    let success = true;

    try {
        /**Step 1: Validamos que exista un archivo cargado.*/
        if (!req.file || Object.keys(req.file).length === 0) {
            success = false;
            return res.status(400)
                .json({
                    success: false,
                    code:"1001", 
                    description: "No file were uploaded."
                })
        }
        
        /**Step 2: Validamos que la extension de archivo sera de tipo .csv*/
        let extName = path.extname(req.file.originalname);
        let fileList = ['.csv'];
        // Checking the file type
        if(!fileList.includes(extName)){
            success = false;
            return res.status(400)
                .json({
                    success: false,
                    code:"1002", 
                    description: "Invalid file type"
                });
        }

        /**Step 3: Validamos el tamaño maximo del archivo > Tamaño maximo 10mb*/
        if(req.file.size > 10485760){
            return res.status(400)
                .json({
                    success: false,
                    code:"1003", 
                    description: "File is too large"
                });
        }
       
        return success;
    
    } catch (error) {
        console.log("Error: >> " + error);
        return res.status(500)
            .json({
                success: false,
                code:"500", 
                description: "Error parsing data"
            })
    }
    
};

 const moveThem = async (targetFile, uploadDir) => {
    targetFile.mv(uploadDir, (err) => {
        if (err){
            res.status(500)
                .json({
                    success: false,
                    code:"1004", 
                    description: "Error moving the file"
                });
        }
        console.log("File uploaded!");
        return true;
    });
  }

