// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")
const { registerAccount } = require("../models/account-model")
const regValidate = require('../utilities/account-validation')


// Route to build path for My Account
router.get("/account/:accountId", accountController.buildByAccountId);

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to build registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )

// Process the login request
// router.post(
//   "/login",
//   regValidate.loginRules(),
//   regValidate.checkLoginData,
//   utilities.handleErrors(accountController.accountLogin)
// )

  router.post(
    "/login",
    (req, res) => {
      res.status(200).send('login process')
    }
  )

  
module.exports = router;
