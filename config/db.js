// Requerimos la librería mysql
var mysql = require("mysql");
// Configuramos la conexión a nuestra base de datos
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "collection",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("conexión correcta");
});
module.exports = connection;
