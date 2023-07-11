// Needed Resources 
const utilities = require("../utilities/")
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build detail by classification view
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildByInventoryId));

//Error route
router.get("/error", utilities.handleErrors(invController.buildError));

//Route to build Vehicle management view
router.get("/", utilities.handleErrors(invController.displayManagementView));

//Route to build Add Classification view
router.get("/add-classification", utilities.handleErrors(invController.displayNewClassificationForm))

router.post("/add-classification", utilities.handleErrors(invController.addClassification))

//Route to build Add Inventory view
router.get("/add-inventory", utilities.handleErrors(invController.displayNewInventoryForm))

router.post("/add-inventory", utilities.handleErrors(invController.addInventory))

module.exports = router;