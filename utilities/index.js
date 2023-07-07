const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function (data) {
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
  }

/* **************************************
* Build the vehicle detail view HTML
* ************************************ */
Util.buildVehicleDetail = async function(data) {
    /*html, image* template strings*/
    let html //= JSON.stringify(data)
    if(data.length > 0){
      html = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        html += '<li>'
        html +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_image 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        html += '<div class="namePrice">'
        html += '<hr />'
        html += '<h2>'
        html += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_year + ' ' + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_year + ' ' + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        html += '</h2>'
        html += '<span>Price: $' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        html += '<br />'
        html += '<span>Description: ' 
        + vehicle.inv_description + '</span>'
        html += '<br />'
        html += '<span>Color: ' 
        + vehicle.inv_color + '</span>'
        html += '<br />'
        html += '<span>Miles: ' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_miles) + '</span>'

        html += '</div>'
        html += '</li>'
      })
      html += '</ul>'
    } else { 
      html += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return html
  }

/* **************************************
* Build the error view HTML
* ************************************ */
  Util.buildErrorView = async function (data) {
    let error 
    if(data.length > 0){ 
    error += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return error
  }


/* **************************************
* Build the login view HTML
* ************************************ */
Util.buildLoginView = async function(data) {
  /*html, image* template strings*/
  let login //= JSON.stringify(data)
  if(data.length > 0){
    login = '<ul id="login-display">'
      login += '<li>'
      login +=  '<label for="email-reg" class="form-label">Email</label>'
      login += '<input type="text" class="form-control" id="email-reg" name="email"> '                       
      login += '<label for="password-reg" class="form-label">Password</label>'
      login += '<input type="password" class="form-control" id="password-reg" name="password">'
      login += '</li>'
    
    login += '</ul>'
    login += '<button>LOGIN</button>'
    login += '<p class="notice">No Account? <a href="account/registration">Sign-up</a></p>'
  } else { 
    login += '<p class="notice">Sorry, login failed</p>'
  }
  return login
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)



module.exports = Util


