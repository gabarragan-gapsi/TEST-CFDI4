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
 const { getDocs,setDoc, doc,query,collection, where, writeBatch } = require('firebase/firestore');
 

exports.getInvoiceByRFC = async (rfc_value) => {
    let existsData= false;
    let note2 = "";
    try {
        const db = getFirestore();
        let rfc = String(rfc_value);
        
        /*Step 1: Se realiza una busqueda a BD por el RFC de cliente.*/
        const result = collection(db, 'invoices');
        const queryData = query(result, where("rfc", "==", rfc));
        let docs = await getDocs(queryData);
        docs.forEach((doc) => {   
            if(doc.data().rfc == rfc){
                existsData = true;
                note2 = doc.data();
            }
        });
        return existsData;
    } catch(e){
        console.log('e :>> ', e);
        return false;
    }
 };


 exports.createInvoiceLoad = async (arrayResult) => {
    try {
        let counter = 0;
        let batch; 
        let resultSize = arrayResult.length;
        const db = getFirestore();
        const { v4: uuidv4 } = require('uuid');

        for (item of arrayResult){
            /**Step 1: Cuando el contado sea 0, se inicializa el proceso Batch */
            if(counter == 0){
                console.log("Inicializamos BD para escritura masiva" );
                batch = writeBatch(db);
            }
            /*Step 2: Se realiza el Insert de la Factura */
            let universalUniqueIdentifier=uuidv4();
            let data={
                _id:universalUniqueIdentifier,
                rfc: item.RFC,
                name: item.NAME,
                regime: item.REGIME,
                postal_code: item.POSTAL_CODE,
                account_bank: item.ACCOUNT,
                email: item.EMAIL
            }
            const invoiceRef = doc(db, "invoices", universalUniqueIdentifier);
            batch.set(invoiceRef, data);
            counter++;
            
            /*Step 3: Cuando se llega a 495 registros o al maximo del array. >> OJO: NO superar de 500 por norma de FIRESTORE*/
            if(counter == 495 || counter == resultSize){
                await batch.commit();
                resultSize = resultSize - counter;
                counter = 0;
                console.log("Nuevo size: " + resultSize);
            }
        }
        console.log("Proceso de carga termino con exito!");

    } catch(e){
        console.log('e :>> ', e);
    }
 };

