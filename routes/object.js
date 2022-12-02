const express = require("express");
const router = express.Router();
const uploadImage = require("../middleware/uploadImage");
const objectController = require("../controllers/objectController");

// ruta base localhost:3000/object

// localhost:3000/object
router.get("/", objectController.viewAllObject);

// localhost:3000/object/createObjectNavBar
router.get("/createObjectNavBar", objectController.viewFormObjectNavBar);

// localhost:3000/object/createObjectNavBar
router.post("/createObjectNavBar", uploadImage("object"), objectController.createObjectNavBar);

// localhost:3000/object/addObject/:id
router.get("/addObject/:id", objectController.viewFormObject);

// localhost:3000/object/addObject/:id
router.post("/addObject/:id", uploadImage("object"),objectController.addObject);

// localhost:3000/object/editObject/:id
router.get("/editObject/:id", objectController.viewFormEditObject);

// localhost:3000/object/editObject/:id
router.post("/editObject/:id", uploadImage("object"), objectController.editObject);

// localhost:3000/object/delete/:collector_id/:object_id
router.get("/delete/:collector_id/:object_id", objectController.deleteObject);

// localhost:3000/object/viewOneObject/:id
router.get("/viewOneObject/:id", objectController.viewOneObject);

module.exports = router;