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
invCont.buildByInventoryId = async function (req, res, vehicle) {
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

module.exports = invCont

// className + " vehicles"
