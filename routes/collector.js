const express = require("express");
const router = express.Router();
const uploadImage = require("../middleware/uploadImage");
const collectorController = require("../controllers/collectorController");


// ruta base localhost:3000/collector

// localhost:3000/collector
router.get("/", collectorController.viewAllCollectors);

// localhost:3000/collector/register
router.get("/register", collectorController.viewRegisterForm);

// localhost:3000/collector/register
router.post("/register", uploadImage("collector"), collectorController.saveCollector);

// localhost:3000/collector/oneCollector/:id
router.get("/oneCollector/:id", collectorController.viewOneCollector);

// localhost:3000/collector/editCollector/:id
router.get("/editCollector/:id", collectorController.viewFormEditCollector);

// localhost:3000/collector/editCollector/:id
router.post("/editCollector/:id", uploadImage("collector"), collectorController.editCollector);

// localhost:3000/collector/delete/:id
router.get("/delete/:id", collectorController.deleteCollector);

// localhost:3000/collector/login
router.get("/login", collectorController.viewLoginForm);

// localhost:3000/collector/login
router.post("/login", collectorController.login);

// localhost:3000/collector/search
router.post("/search", collectorController.search);

module.exports = router;