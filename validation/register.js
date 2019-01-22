// for adding registration rules
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // Check condition, if everything is passed, 
  // Check validations of at least 2 chars but no longer 30 chars
  if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  // check required field - name
  if(Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  // check required field - email
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  // validate email - check regex : if email is invalid
  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  // check required field - password
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  // validate password - check length : if the passwords are NOT more 6 & less 30
  if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 charcters';
  }

  // check required field - password2
  if(Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  // check whether password matched
  if(!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  // if everything is passed, return will be isValid: isEmpty(errors)
  // if not, errors.name above and error status in users.js will return 
  return {
    errors, // minify 'errors: errors'
    isValid: isEmpty(errors),
  };
};