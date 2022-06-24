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
 

exports.getInvoiceByRFC = async (req,res) => {
    try {
        
        const db = getFirestore();
        let note2 = "";
        let resultData= false;

        /*Step 1: Se realiza una busqueda a BD por el RFC de cliente.*/
        const result = collection(db, 'invoices');
        const queryData = query(result, where("rfc", "==", req.query.rfc));
        let docs = await getDocs(queryData);
        docs.forEach((doc) => {   
            if(doc.data().rfc == req.query.rfc){
                note2 = doc.data();
                resultData = true
            }
        });
        
        /*Step 2: Se envia respuesta del servicio, si fue exitoso o no.*/
        if(resultData){
            return res.status(200)
            .json({
                success:true,
                description: "RFC Successfully",
                data: note2
            })
        }else{
            return res.status(400)
            .json({
                success: false,
                code:2001, 
                description: "RFC not exist"
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

 exports.createInvoice = async (req,res) => {
    try {
        let existsData = false;
        const db = getFirestore();
    
        /*Step 1:Validamos si existe una Factura antior */
        const resultBD = collection(db, 'invoices');
        const queryData = query(resultBD, where("rfc", "==", req.body.rfc));
        let docs = await getDocs(queryData);
        docs.forEach((doc) => {   
            if(doc.data().rfc == req.body.rfc){
                existsData = true
            }
        });
        
        /*Step 2: Retornamos error, en caso de existir Dato. Caso contrario sigue le flujo de Crear Factura*/
        if(existsData){
           return res.status(400)
            .json({
                success: false,
                code:1005,
                description: "Invoice cant be created - Previous invoice exists"
            })
        }else {
            /*Step 3: Se realiza el Insert de la Factura */
            const { v4: uuidv4 } = require('uuid');
            let universalUniqueIdentifier=uuidv4();
            let data={
                _id:universalUniqueIdentifier,
                rfc:req.body.rfc,
                name:req.body.name,
                regime:req.body.regime,
                postal_code:req.body.postal_code,
                account_bank:req.body.account_bank,
                email:req.body.email
            }
            
            await setDoc(doc(db,'invoices',universalUniqueIdentifier),data);
            
            return res.status(200)
                .json({
                    success: true,
                    code:200,
                    description: "Invoice created Successfully"
            })
        }

    } catch(e){
        console.log('e :>> ', e);
        return res.status(500)
            .json({
                success: false, 
                description: "Internal server error"
        })
    }
 };

 exports.updateInvoice = async (req,res) => {
    try {
        const db = getFirestore();
        let existsData = false;
        let note2 = "";

        /*Step 1:Validamos si existe una Factura antior */
        const resultBD = collection(db, 'invoices');
        const queryData = query(resultBD, where("rfc", "==", req.query.rfc));
        let docs = await getDocs(queryData);
        docs.forEach((doc) => {   
            if(doc.data().rfc == req.query.rfc){
                existsData = true;
                note2 = doc.data();
            }
        });
        console.log("Datos: " + note2._id + " - " + existsData);
        /*Step 2: Retornamos error, en caso de NO existir Factura*/
        if(!existsData){
            return res.status(400)
            .json({
                success: false, 
                description: "Invoice cant be updated - Previous invoice not exists"
            })
        }

        /*Step 3: Como la factura Existe, se Actualiza la factura */ 
        let data2={};
        if(req.body.name != undefined || req.body.name == ""){
            Object.assign(data2, {name: req.body.name});
        }
        if(req.body.regime != undefined || req.body.regime == ""){
            Object.assign(data2, {regime: req.body.regime});
        }
        if(req.body.postal_code != undefined || req.body.postal_code == ""){
            Object.assign(data2, {postal_code: req.body.postal_code});
        }
       
        console.log(JSON.stringify(data2));

        await updateDoc(doc(db,'invoices',note2._id),data2);
        
        return res.status(200)
            .json({
                success: true, 
                description: "Invoice updated Successfully"
        })

    } catch(e){
        console.log('e :>> ', e);
        return res.status(500)
            .json({
                success: false, 
                description: "Internal server error"
        })
    }
 };

 exports.deleteInvoiceByRFC = async (req,res) => {
    try {
        const db = getFirestore();
        let note2 = "";

        /*Step 1: Se valida si el RFC a Eliminar existe en Base de Datos*/
        const resultBD = collection(db, 'invoices');
        const queryData = query(resultBD, where("rfc", "==", req.query.rfc));
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
                code:1003,
                description: "RFC not exists. Can't be deleted the record",
            }) 
        }
       
        /*Step 3: Se elimina el registro*/
        await deleteDoc(doc(db, "invoices", note2._id));        
        
        return res.status(200)
        .json({
            success:true,
            description: "Invoice Deleted Successfully",
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

 exports.getRegime = async (req,res) => {
    try {
        
        const db = getFirestore();
        let note2 = "";
        let resultData= false;

        /*Step 1: Se realiza una busqueda a BD por el RFC de cliente.*/
        result = collection(db, 'properties');
        queryData = query(result, where("propertieKey", "==", "REGIME"));
        let docs = await getDocs(queryData);
        docs.forEach((doc) => {   
            note2=doc.data();
            resultData = true
        });
        
        /*Step 2: Se envia respuesta del servicio, si fue exitoso o no.*/
        if(resultData){
            return note2
        }else{
            return res.status(400)
            .json({
                success: false,
                code:2001, 
                description: "Regime Properties does not exists in BD"
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