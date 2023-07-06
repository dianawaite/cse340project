const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  req.flash("notice", "This is a flash message.")
  res.render("index", {title: "Home", nav})
}

baseController.errorTest = async function(req, res) {
  throw new Error("Error Message test")
}

module.exports = baseController