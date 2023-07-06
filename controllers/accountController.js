const utilities = require("../utilities/index")

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
    })
  }

  async function buildByAccountId() {}
  
  
  module.exports = { buildLogin, buildByAccountId }