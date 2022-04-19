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
 const { getDocs,setDoc, updateDoc, doc,query,collection,deleteDoc, where } = require('firebase/firestore');
 

exports.getPropertiesByKey = async (req,res) => {
    try {
        
        const db = getFirestore();
        let data2={};
        let resultData= false;

        /*Step 1: Se realiza una busqueda a BD */
        const propertiesResult = collection(db, 'properties'); 
        const queryData = query(propertiesResult, where("propertieKey", "==", req.query.propertie_key));       
        let propertiesDoc = await getDocs(queryData);
        propertiesDoc.forEach((doc) => {
            Object.assign(data2, doc.data());
            resultData = true
        });
        
        /*Step 2: Se envia respuesta del servicio, si fue exitoso o no.*/
        if(resultData){
            return res.status(200)
            .json({
                success:true,
                code:200,
                data: data2
            })
        }else{
            return res.status(400)
            .json({
                success: false,
                code:2001, 
                description: "Properties not exist"
            })
        }
    } catch(e){
        console.log('e :>> ', e);
        return res.status(500)
            .json({
                success: false,
                code:500,
                description: "An unexpected server side error has occurred"
        })
    }
 };

 exports.createPropertie = async (req,res) => {
    try {
        let existsData = false;
        const db = getFirestore();
        
        /*Step 1:Validamos si existe una Factura antior */
        const resultBD = collection(db, 'properties');
        const queryData = query(resultBD, where("propertieKey", "==", req.body.propertie_key));
        let docs = await getDocs(queryData);
        docs.forEach((doc) => {   
            if(doc.data().propertieKey == req.body.propertie_key){
                existsData = true
            }
        });
        
        /*Step 2: Retornamos error, en caso de existir Dato. Caso contrario sigue le flujo de Crear Factura*/
        if(existsData){
           return res.status(400)
            .json({
                success: false,
                code:1003,
                description: "Propertie cant be created - Previous Propertie exists"
            })
        }else {
            /*Step 3: Se realiza el Insert de la Factura */
            const { v4: uuidv4 } = require('uuid');
            let universalUniqueIdentifier=uuidv4();
            let data={
                _id:universalUniqueIdentifier,
                propertieKey:req.body.propertie_key,
                propertieValue:req.body.propertie_value
            }
            
            await setDoc(doc(db,'properties',universalUniqueIdentifier),data);
            
            return res.status(200)
                .json({
                    success: true,
                    code:200,
                    description: "Propertie created Successfully"
            })
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

 exports.updatePropertie = async (req,res) => {
    try {
        const db = getFirestore();
        let existsData = false;
        let note2;

        /*Step 1:Validamos si existe una Factura antior */
        const resultBD = collection(db, 'properties');
        const queryData = query(resultBD, where("propertieKey", "==", req.query.propertie_key));
        let docs = await getDocs(queryData);
        docs.forEach((doc) => {   
            if(doc.data().rfc == req.query.rfc){
                existsData = true;
                note2 = doc.data();
            }
        });
        
        /*Step 2: Retornamos error, en caso de NO existir Factura*/
        if(!existsData){
            return res.status(400)
            .json({
                success: false, 
                code:1003,
                description: "Propertie cant be updated - Previous invoice not exists"
            })
        }

        /*Step 3: Como la Propiedad Existe, se Actualiza el valor de la Propiedad. */ 
        let data2={};
        if(req.body.propertie_value != undefined || req.body.propertie_value == ""){
            Object.assign(data2, {propertieValue: req.body.propertie_value});
        }
       
        await updateDoc(doc(db,'properties',note2._id),data2);
        
        return res.status(200)
            .json({
                success: true,
                code:200,
                description: "Propertie updated Successfully"
        })

    } catch(e){
        console.log('e :>> ', e);
        return res.status(500)
            .json({
                success: false,
                code:500, 
                description: "An unexpected server side error has occurred"
        })
    }
 };

 exports.deletePropertieByKey = async (req,res) => {
    try {
        const db = getFirestore();
        let note2 = "";

        /*Step 1: Se valida si el RFC a Eliminar existe en Base de Datos*/
        const resultBD = collection(db, 'properties');
        const queryData = query(resultBD, where("propertieKey", "==", req.query.propertie_key));
        let docs = await getDocs(queryData);
        docs.forEach((doc) => {   
            if(doc.data().rfc == req.query.rfc){
                console.log(note2);
                note2 = doc.data();
            }
        });
        
        /*Step 2: Si el RFC no existe de retorna mensaje de error.*/
        if(note2 == ""){
            return res.status(400)
            .json({
                success:400,
                code:1002,
                description: "Propertie not exists. Can't be deleted the record",
            }) 
        }
       
        /*Step 3: Se elimina el registro*/
        await deleteDoc(doc(db, "properties", note2._id));        
        
        return res.status(200)
            .json({
                success:true,
                code:200,
                description: "Propertie Deleted Successfully",
            })
        
    } catch(e){
        console.log('e :>> ', e);
        return res.status(500)
            .json({
                success: false,
                code:500, 
                description: "An unexpected server side error has occurred"
        })
    }
 };