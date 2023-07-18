const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")


const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build detail by inv_id view
 * ************************** */
invCont.buildByInventoryId = async function (req, res) {
  const inv_id = req.params.inv_id
  const data = await invModel.getDetailByInventoryId(inv_id)
  // console.log("Data is" + data)
  let nav = await utilities.getNav()
  let html = await utilities.buildVehicleDetail(data)
  const className = data[0].classification_id
  res.render("./inventory/inventoryDetail", {
    title: data[0].inv_make + ' '+ data[0].inv_model,
    
    nav,
    html,
  })
}

invCont.buildError = async function (req, res) {
  throw new Error 
}

/* ***************************
 *  Build vehicle management view
 * ************************** */
invCont.displayManagementView = async function (req, res) {
  // const inv_id = req.params.inv_id
  // const data = await invModel.getDetailByInventoryId(inv_id)
  // // console.log("Data is" + data)
  let nav = await utilities.getNav()
  // let html = await utilities.buildVehicleDetail(data)
  // const className = data[0].classification_id
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    
  })
}


/* ***************************
 *  Build add classification form view
 * ************************** */
invCont.displayNewClassificationForm = async function (req, res) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add New Classification",
    nav,
    
  })
}

/* ***************************
 *  Build add classification view
 * ************************** */
invCont.addClassification = async function (req, res) {
  const classification_name = req.body.add_classification
  console.log(JSON.stringify(req.body))
  const data = await invModel.addClassification(classification_name)
  // // console.log("Data is" + data)
  if (data) {
    req.flash("notice", 'Congratulations you added new classification.')
  } 
  else { 
    req.flash("notice", 'Sorry, there was an error processing the classification.')
  }
  let nav = await utilities.getNav()
  // let html = await utilities.buildVehicleDetail(data)
  // const className = data[0].classification_id
  res.render("./inventory/add-classification", {
    title: "Add New Classification",
    nav,
    
  })
}

/* ***************************
 *  Build add inventory form view
 * ************************** */
invCont.displayNewInventoryForm = async function (req, res) {
  let nav = await utilities.getNav()
  let classifications = await utilities.buildClassificationDropdown()
  res.render("./inventory/add-inventory", {
    title: "Add New Inventory",
    nav,
    classifications,
    
  })
}

/* ***************************
 *  Build add inventory view
 * ************************** */
invCont.addInventory = async function (req, res) {
  let nav = await utilities.getNav()

  const classifications = await utilities.buildClassificationDropdown()
  const classification_id = req.body.classification_id
  const inv_make = req.body.inv_make
  const inv_model = req.body.inv_model
  const inv_description = req.body.inv_description
  const inv_image = req.body.inv_image 
  const inv_thumbnail = req.body.inv_thumbnail
  const inv_price = req.body.inv_price
  const inv_year = req.body.inv_year
  const inv_miles = req.body.inv_miles
  const inv_color = req.body.inv_color

  const regResult = await invModel.addInventory(
    classification_id, 
    inv_make, 
    inv_model, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_year, 
    inv_miles, 
    inv_color)
  // // console.log("Data is" + data)
  if (regResult) {
    req.flash("notice", 'Congratulations, your vehicle was successfully added to the inventory.')
    res.status(201).render("inventory/management", {
      title: "Inventory Management",
      nav,
      // classifications
    })
  } 
  else { 
    req.flash("notice", 'Sorry, there was an error processing the new vehicle.')
    res.status(501).render("inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
    
  })
}
}
module.exports = invCont

