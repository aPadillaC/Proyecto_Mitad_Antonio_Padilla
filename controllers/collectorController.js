const connection = require("../config/db");
const bcrypt = require("bcrypt");
const { main } = require("../services/nodemailer");


class CollectorController{

    // muestra la vista principal de todos los coleccionistas
    viewAllCollectors = (req, res) => {
        let sql = `SELECT * FROM collector where deleted = false ORDER BY name ASC`;

        connection.query(sql, (errorAllCollector, collectors) => {
            if(errorAllCollector) throw errorAllCollector;
            res.render("allCollectors", {collectors});
        });
    }


    // muestra el formulario de registro
    viewRegisterForm = (req, res) => {
        res.render("registerCollector", {mensaje: ""});
    }


    // registro de coleccionistas mediante el formulario
    saveCollector = (req, res) => {
        let {name, last_name, hobby, email, password, collection_description, phone} = req.body;

        bcrypt.hash(password, 10, (errorRegister1, hash)  => {
            if (errorRegister1) throw errorRegister1;

            let sql = `INSERT INTO collector (name, last_name, hobby, email, password, collection_description, phone) VALUES ("${name}", "${last_name}", "${hobby}", "${email}", "${hash}", "${collection_description}", "${phone}")`;

            // por si no introducimos foto
            if (req.file != undefined){
                let img = req.file.filename;

                sql = `INSERT INTO collector (name, last_name, hobby, email, password, collection_description, phone, img) VALUES ("${name}", "${last_name}", "${hobby}", "${email}", "${hash}", "${collection_description}", "${phone}", "${img}")`;
            }

            connection.query(sql, (errorRegister2, newCollector) => {

                if(errorRegister2){
                    if (errorRegister2.code == "ER_DUP_ENTRY"){
                    res.render("registerCollector", {mensaje: "El email ya existe en la base de datos"});
                    }
                    else{              
                    throw errorRegister2;
                    }
                }
                else{
                    // let mensajeEmail = `<b>Se ha registrado correctamente. Usuario: ${email}.
                    // Contraseña: ${password}
                    //  </b>`;
                    // main(email, mensajeEmail).catch(console.error);
    
                    res.redirect(`/collector/oneCollector/${newCollector.insertId}`); //insertId se consigue a traves del insert que acabo de hacer para registrar al usuario
                }            
            });
        });
    }



    // vista de un coleccionista con sus objetos
    viewOneCollector = (req, res) => {
        let id = req.params.id;
        let sql = `SELECT collector.collector_id, collector.name as name_collector, collector.last_name, collector.hobby, collector.email, collector.collection_description, collector.phone, collector.img as img_collector, object.* FROM collector LEFT JOIN object ON collector.collector_id = object.collector_id WHERE collector.collector_id = ${id}`;

        connection.query(sql, (errorOneCollector, result) => {
            if (errorOneCollector) throw errorOneCollector;
            let finalResult = {};
            let groupObjects = [];
            let object = {};

            result.forEach((element) => {
                object = {
                    object_id: element.object_id,
                    name: element.name,
                    description: element.description,
                    price: element.price,
                    img: element.img,
                };
                // if (object.object_id != null) {
                    groupObjects.push(object);
                //   }  
            });
            console.log(result);
            finalResult = {
                collector_id: id,
                name_collector: result[0].name_collector,
                last_name: result[0].last_name,
                hobby: result[0].hobby,
                email: result[0].email,
                collection_description: result[0].collection_description,
                phone: result[0].phone,
                img_collector: result[0].img_collector,
                objects: groupObjects,
            };
            console.log(finalResult);
            res.render("viewOneCollector", {finalResult});
        });
    };



    // muestra el formulario para editar un coleccionista
    viewFormEditCollector = (req, res) => {
        let id = req.params.id;
        let sql = `SELECT * FROM collector WHERE collector_id = ${id}`;   
        connection.query(sql, (error, resultEdit) => {
            if(error) throw error;
            console.log(resultEdit);
            res.render("editCollector", {resultEdit});
        });
    }

    editCollector = (req, res) => {
        let id = req.params.id;
        let {name, last_name, hobby, email, collection_description, phone} = req.body;
        console.log(req.body);

        let sql = `UPDATE collector SET name = "${name}", last_name = "${last_name}", hobby = "${hobby}", email = "${email}", collection_description = "${collection_description}", phone = ${phone} WHERE collector_id = ${id}`;

        if (req.file != undefined){
            let img = req.file.filename;
            sql = `UPDATE collector SET name = "${name}",last_name = "${last_name}", hobby = "${hobby}", email = "${email}", collection_description = "${collection_description}", phone = ${phone}, img = "${img}" WHERE collector_id = ${id}`;  
        };
        connection.query(sql, (error, result) => {
            if(error) throw error;
            res.redirect(`/collector/oneCollector/${id}`);
        }); 
    }


    // eliminado lógico de un coleccionista
    deleteCollector = (req, res) => {
        let id = req.params.id;
        let sql = `UPDATE collector SET deleted = true WHERE collector_id = ${id}`;
        connection.query(sql, (error, result) => {
        if(error) throw error;
        res.redirect("/collector");
    });
    }



    // muestra el formulario de login
    viewLoginForm = (req, res) => {
        res.render("login", {mensaje:  ""});
    }



    //// Login de coleccionistas
    login = (req, res) => {
        let {email, password} = req.body;
        let sql = `SELECT * FROM collector WHERE email = "${email}" AND deleted = false`;

        connection.query(sql, (error, resultEmail) => {
          if(error) throw error;
         
          if (resultEmail.length == 1){
            let pass = resultEmail[0].password;            

            bcrypt.compare(password, pass, (err, result) => {

              if (err) throw err;

              if (result) {
                let id = resultEmail[0].collector_id;
                res.redirect(`/collector/oneCollector/${id}`);
              }
              else{
                res.render("login", {mensaje: "Credenciales incorrectas"});
              }
            });
          }
          else{
            res.render("login", {mensaje: "Credenciales incorrectas"});
          }
        });
      }





    // buscar tipo de hobby
    search = (req, res) => {
        let {search} = req.body;

        let sql = `SELECT * FROM collector WHERE hobby like "%${search}%" AND deleted = false`;

        connection.query(sql, (error, resultSearch) => {
            if(error) throw error;
            console.log(resultSearch);
            res.render("searchCollector", {resultSearch});
        });
    }



}

module.exports = new CollectorController();