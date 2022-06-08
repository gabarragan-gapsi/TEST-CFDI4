/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2021
 *
 * @author: Gonzalo Barragan {02/09/2021}
 * @updated: -
 * @description: String de coneccion a DB
 * @since-version: 1.0
 **/

 let db;
 const initialCharge = () => {
     try {
         if(!db){
             const { initializeApp, cert } = require('firebase-admin/app');
             const serviceAccount = require('../../' + process.env.SERVICEACCOUNTFIRESTORE);
             initializeApp({
                 credential: cert(serviceAccount) //,
                 //databaseURL: 'https://cdfi-ab3bc-default-rtdb.firebaseio.com/'
                });
             const { getFirestore } = require('firebase-admin/firestore');
             db = getFirestore();        
         }        
     } catch(e){
         console.log('error DB Connection: >> ', e);
     }   
     return db; 
 }
 
 module.exports.initialCharge = initialCharge;