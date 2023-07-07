const utilities = require("../utilities/")


// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build detail by classification view
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildByInventoryId));

//Error route
router.get("/error", utilities.handleErrors(invController.buildError));

module.exports = router;