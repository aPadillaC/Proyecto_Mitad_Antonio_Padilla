const connection = require("../config/db");
const bcrypt = require("bcrypt");


class ObjectController{


    // muestra todos los objetos
    viewAllObject = (req, res) => {
      let sql = `SELECT object.* FROM object, collector WHERE collector.collector_id = object.collector_id AND collector.deleted = false ORDER BY NAME ASC`;
      connection.query(sql, (error, objects) => {
        if (error) throw error;
        res.render("allObject", { objects });
        });
    }

    //muestra formulario para crear objeto por NavBar
    viewFormObjectNavBar = (req, res) => {
        let sql = `SELECT * FROM collector WHERE deleted = false`;

        connection.query(sql, (error, result) => {
            if(error) throw error;
            res.render("createObjectNavBar", {result});
        });
    }



    // createObjectNavBar
    createObjectNavBar = (req, res) => {
        let { name, description, price, collector_id } = req.body;
        console.log(req.body);
        
        let sql = `INSERT INTO object (name, description, price, collector_id) VALUES ('${name}', '${description}',${price}, ${collector_id}) `;

        if (req.file != undefined) {
          let img = req.file.filename;
          sql = `INSERT INTO object (name, description, price, img, collector_id) VALUES ('${name}', '${description}', ${price}, '${img}', ${collector_id}) `;
        }
        connection.query(sql, (error, result) => {
          if (error) throw error;
          res.redirect(`/collector/oneCollector/${collector_id}`);
        });
    }



    // muestra el formulario para crear objeto
    viewFormObject = (req, res) => {
      let id = req.params.id;
      res.render("addObject", {id});
    }



    // añade un objeto nuevo a un coleccionista
    addObject = (req, res) => {
      let id = req.params.id;
      let {name, description, price} = req.body;

      let sql = `INSERT INTO object (name, description, price, collector_id)  VALUES ("${name}", "${description}", "${price}", ${id})`;

      if (req.file != undefined){
        let img = req.file.filename;
        sql = `INSERT INTO object (name, description, price, collector_id, img) VALUES ("${name}", "${description}", "${price}", ${id}, "${img}")`;
      }
      connection.query(sql, (error, result) => {
        if(error) throw error;
        res.redirect(`/collector/oneCollector/${id}`);
      });
    }




    // muestra formulario para editar un objeto
    viewFormEditObject = (req, res) => {
      let id = req.params.id;
      let sql = `SELECT * FROM object WHERE object_id = ${id}`;   
      connection.query(sql, (error, resultEdit) => {
          if(error) throw error;
          console.log(resultEdit);
          res.render("editObject", {resultEdit});
      });
    }





    // edito un objeto
    editObject = (req, res) => {
      let id = req.params.id;
      let {name, description, price, idObject} = req.body;

      let sql = `UPDATE object SET name = "${name}", description = "${description}", price = ${price} WHERE object_id = ${idObject}`;

        if (req.file != undefined) {
          let img = req.file.filename;
          sql = `UPDATE object SET name = "${name}", description = "${description}", price = ${price}, img = "${img}" WHERE object_id = ${idObject}`;
        }
        connection.query(sql, (error, result) => {
          if (error) throw error;
          res.redirect(`/collector/oneCollector/${id}`);
        });
    }




    // eliminar un objeto de un coleccionista
    deleteObject = (req, res) => {
      let{collector_id, object_id} = req.params;
      let sql = `DELETE FROM object WHERE object_id = ${object_id}`;
      
      connection.query(sql, (error, result) => {
        if(error) throw error;
        res.redirect(`/collector/oneCollector/${collector_id}`)
      })
    }
    


    viewOneObject = (req, res) => {
      let id = req.params.id;
      let sql = `SELECT * FROM object WHERE object_id = ${id}`

      connection.query(sql, (error, result) => {
        if(error) throw error;
        res.render("oneObject", {result});
      })
    }

}

module.exports = new ObjectController();