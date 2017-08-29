'use strict';
const runAsyncGen = require('run-async-gen');
const SqlToJson = require('sql-to-json');
const mysql = require('mysql'); // can be any sql db client with query method.
const fs = require('fs')

runAsyncGen(GenerateJsonFile(), function(err) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Done');
});

function* GenerateJsonFile() {
	//const conexion = mysql.createConnection({credentials object});

	
  //establezco conexión
	var conexion = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'contrasena',
	  database: 'bd_inventarios'
	});
	conexion.connect();  //conectando

	


	//establezco la eestructuraura
	const estructura_catalogo_empresas = {
		    
			//(Puede aparecer sólo en el primer nivel) un objeto que describe consultas SQL que se ejecutarán en el inicio del proceso sql-to-json
			// y podrían ser accedidas por consultas de memQuery. (Véase el ejemplo siguiente)
		    "preLoadTables": {
		        //"llave": "consulta"
		        "catalogo_empresas": "select id, uid, nombre, codigo, dias_ctas_pagar, direccion, telefono, id_usuario, fecha_mac, coleccion_id_actividad from inven_catalogo_empresas" //where codigo='00035'
		    },
		    "type": "object", //tipo de nivel en el json
		    "memQuery": "select id, codigo from catalogo_empresas where id is not null",
		    "keyField": "id",  //Sólo puede aparecer cuando type=object del primer campo anidado) 
		    					//Un campo desde la consulta que sus valores se utilizarán como llaves de los valores del objeto
		    "refField": "id",  //Un campo o campos desde la consulta que sus valores se utilizarán como referencia para la 
		    					   //consulta de los campos anidados de este nivel

			    "fields": [{    //Array de los campos de estos elementos
			        "type": "object",
			        
			        "memQuery": "select uid, nombre, codigo, dias_ctas_pagar, direccion, telefono, id_usuario, fecha_mac, coleccion_id_actividad from catalogo_empresas where id = ?",//  lo compara con la referencia "refField": "codigo",
			         //Una consulta SQL desde la memoria. Los nombres de tablas que se pueden utilizar en estas consultas son las claves del objeto preLoadTables 
			         //(véase el ejemplo siguiente)

					      "fields": [
					        	{
					            	"dbName": "codigo", //Nombre de la columna de bd de este campo
					            	"name": "mi_codigo",  //Nombre de la clave en la salida json que contendrá este valor
					            	"type": "string"   //tipo de nivel en el json
					        	},
					        	{
					            	"dbName": "nombre", //Nombre de la columna de bd de este campo
					            	"name": "mi_nombre",  //Nombre de la clave en la salida json que contendrá este valor
					            	"type": "string"   //tipo de nivel en el json
					        	},

					        ]
			    }]
		} 
		;


	  const estructura_usuarios = {
		    
	  	//https://cnpmjs.org/package/mysql-aes

	  	//SELECT CAST(AES_DECRYPT(UNHEX(encrypted), key) as CHAR)

			//(Puede aparecer sólo en el primer nivel) un objeto que describe consultas SQL que se ejecutarán en el inicio del proceso sql-to-json
			// y podrían ser accedidas por consultas de memQuery. (Véase el ejemplo siguiente)
			//CAST(AES_DECRYPT(UNHEX(email), 'gtg5igLZasUC3xNfDlvTGBxxkoMuR6FaCYw5')
			//CAST(AES_DECRYPT(UNHEX(email), 'gtg5igLZasUC3xNfDlvTGBxxkoMuR6FaCYw5')  AS CHAR) as email
		    "preLoadTables": {
		        //"llave": "consulta"
		        "usuarios": "select id,  CAST(AES_DECRYPT( email,'gtg5igLZasUC3xNfDlvTGBxxkoMuR6FaCYw5') as CHAR) AS email, CAST(AES_DECRYPT( contrasena,'gtg5igLZasUC3xNfDlvTGBxxkoMuR6FaCYw5') as CHAR) AS contrasena, creacion, telefono, extension, activo, nombre, Apellidos, estado, id_perfil, fecha_pc, id_usuario, fecha_mac, coleccion_id_operaciones, coleccion_id_almacenes, id_cliente, sala, num_partida, id_almacen, especial from inven_usuarios" //where codigo='00035'
		    },
		    "type": "object", //tipo de nivel en el json
		    "memQuery": "select id from usuarios where id is not null",
		    "keyField": "id",  //Sólo puede aparecer cuando type=object del primer campo anidado) 
		    					//Un campo desde la consulta que sus valores se utilizarán como llaves de los valores del objeto
		    "refField": "id",  //Un campo o campos desde la consulta que sus valores se utilizarán como referencia para la 
		    					   //consulta de los campos anidados de este nivel

			    "fields": [{    //Array de los campos de estos elementos
			        "type": "object",
			        
			        "memQuery": "select email, contrasena,  creacion, telefono, extension, activo, nombre, Apellidos, estado, id_perfil, fecha_pc, id_usuario, fecha_mac, coleccion_id_operaciones, coleccion_id_almacenes, id_cliente, sala, num_partida, id_almacen, especial from usuarios where id = ?",//  lo compara con la referencia "refField": "codigo",
			         //Una consulta SQL desde la memoria. Los nombres de tablas que se pueden utilizar en estas consultas son las claves del objeto preLoadTables 
			         //(véase el ejemplo siguiente)

					      "fields": [
					        	{
					            	"dbName": "nombre", //Nombre de la columna de bd de este campo
					            	"name": "nombre",  //Nombre de la clave en la salida json que contendrá este valor
					            	"type": "string"   //tipo de nivel en el json
					        	},

					        	{
					            	"dbName": "email", //Nombre de la columna de bd de este campo
					            	"name": "email",  //Nombre de la clave en la salida json que contendrá este valor
					            	"type": "string"   //tipo de nivel en el json
					        	},

					        	{
					            	"dbName": "contrasena", //Nombre de la columna de bd de este campo
					            	"name": "contrasena",  //Nombre de la clave en la salida json que contendrá este valor
					            	"type": "string"   //tipo de nivel en el json
					        	},

					        	{
					            	"dbName": "Apellidos", //Nombre de la columna de bd de este campo
					            	"name": "apellido",  //Nombre de la clave en la salida json que contendrá este valor
					            	"type": "string"   //tipo de nivel en el json
					        	},

					        ]
			    }]
		} 
		;


	//email, contrasena, creacion, telefono, extension, activo, nombre, Apellidos, estado, id_perfil, fecha_pc, id_usuario, fecha_mac, coleccion_id_operaciones, coleccion_id_almacenes, id_cliente, sala, num_partida, id_almacen, especial
//https://www.npmjs.com/package/node-cryptojs-aes
	
	const instancia = new SqlToJson(conexion);
	
	//const dataAsJson = yield* instancia.executeGen(estructura_catalogo_empresas);

	const dataAsJson = yield* instancia.executeGen(estructura_usuarios);

	//dataAsJson =  dataAsJson
	
	fs.writeFileSync('output.json', ' { "usuarios": '+JSON.stringify(dataAsJson)) +' }';

	//fs.writeFileSync('output.json', ' { "estructura_catalogo_empresas": '+JSON.stringify(dataAsJson)) +' }';
	
	conexion.end();


	

}