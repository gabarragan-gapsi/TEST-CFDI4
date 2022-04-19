/**
 * Copyright (c) 2022 - Liverpool. All rights reserved
 *
 * Grupo de Asesores Profesionales en Servicios de Integración {GAPSI} - CDMX - 2022
 *
 * @author: Gonzalo Barragan {28/03/2022}
 * @updated: -
 * @description:
 * @since-version: 1.0
 **/

 const { async } = require('@firebase/util');
var _ = require('underscore')

 exports.isEmpty= async (obj) => {
	let r = false;
    
	if (_.isNull(obj) || _.isUndefined(obj) || obj === "") {
		r = true;
	}
    return r;
}

exports.isRFCValid = async(obj) => {
	let r = false;
	//var patt = new RegExp("/^[A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?$/");
	const regx = /^[A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?$/;
	if (regx.test(obj)) {
		r = true;
	}
	return r;
}

exports.isNotEmpty= async (obj) => {
	return !exports.isEmpty(obj);
}

exports.isNumber= async (obj) => {
	let r = false;
	if (!exports.isEmpty(obj)) {
		const patt = /^\d{1,20}$/g;
		const s = obj.toString();
		r = patt.test(s);
	}
	return r;
}

exports.isEmail= async (obj) => {
	let r = false;
	//const regx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	const regx = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;

	if (regx.test(obj)) {
		r = true;
	}

	return r;
}