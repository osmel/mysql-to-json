'use strict';
const runAsyncGen = require('run-async-gen');
const mysql = require('mysql'); // can be any sql db client with query method.

runAsyncGen(GenerateJsonFile(), function(err) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Done');
});

function* GenerateJsonFile() {
      var mySqlDbClient = mysql.createConnection({
      	  host     : 'localhost',
      	  user     : 'root',
      	  password : 'contrasena',
      	  database: 'bd_inventarios'
      });

      mySqlDbClient.connect();  //conectando

      mySqlDbClient.query('SELECT * from inven_catalogo_empresas', function(err, rows, fields) {
    	        console.log(rows);
               mySqlDbClient.end();
      });
}    