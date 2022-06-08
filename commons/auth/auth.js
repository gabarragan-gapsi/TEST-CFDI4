/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2022
 *
 * @author: Gonzalo Barragan [28/03/2022]
 * @updated: -
 * @description: Variables de coneccion a BD
 * 
 **/
 
 const { initializeApp } = require('firebase/app')
 const { getAuth } = require('firebase/auth');
 
 //const { APIKEY,AUTHDOMAIN,PROJECTID,STORAGEBUCKET,MESSAGINGSENDERID,APPID,MEASUREMENTID } = process.env;

 const firebaseApp = initializeApp({
   apiKey: process.env.DB_API_KEY,
   authDomain: process.env.DB_AUTH_DOMAIN,
   projectId: process.env.DB_PROJECT_ID,
   storageBucket: process.env.DB_STORAGE_BUKECT,
   messagingSenderId: process.env.DB_MESSAGING_SENDER_ID,
   appId: process.env.DB_APP_ID,
   measurementId: process.env.DB_MEASUREMENT_ID, 
   databaseURL: process.env.DB_URL,
 }); 
 
 const auth = getAuth(firebaseApp);
 
 module.exports = auth;