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
 const admin = require('firebase-admin'); 
 const { getFirestore } = require('firebase/firestore');
 const { getDocs,query,collection,where } = require('firebase/firestore');

 const token = require("../../security/business/jwt.controller");

 exports.getUserCredentials = async (req,res) => {
    try {
        
        const db = getFirestore();
        let note, note2;
        let resultData= false;
        let tokenUsuario;
        let result ="";
        let queryData="";

        /*Step 1: Se realiza una busqueda a BD las credenciales de Autenticación*/
        result = collection(db, 'properties');
        queryData = query(result, where("propertieKey", "==", "CREDENTIALS"));
        let docs = await getDocs(queryData);
        docs.forEach((doc) => {
            note=doc.data();
            if(doc.data().credentialsUser == req.body.applicationKey && doc.data().credentialsPassword == req.body.applicationPassword){
                note = doc.data();
                console.log("Valid credencials");
            }
            resultData = true
        });

        /*Step 2: Si las credenciales NO son validas, retorna mensaje de error.*/
        if(note == undefined){
            return res.status(400)
            .json({
                success: false, 
                code:400, 
                description: "invalid credentials"
            });
        }else {
           /*Step 3: Si las credenciales son validas, retorna TOKEN*/
            let user = note.credentialsUser;
            let password = note.credentialsPassword;
            tokenUsuario = await token.getJwtToken({
                applicationKey: user,
                applicationPassword: password
            });
            console.log("Token " + tokenUsuario);
            return res.status(200)
                .json({
                success: true, 
                token: tokenUsuario
            });
            
        }
    } catch(e){
        console.log('e :>> ', e);
        return res.status(500)
            .json({
                success: false, 
                description: "An unexpected server side error has occurred"
        })
    }
 };