// for adding login rules
// for adding registration rules
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // validate email - check regex : if email is invalid
  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  // check required field - email
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  // check required field - password
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }


  // if everything is passed, return will be isValid: isEmpty(errors)
  // if not, errors.name above and error status in users.js will return 
  return {
    errors, // minify 'errors: errors'
    isValid: isEmpty(errors),
  };
};