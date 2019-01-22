// for adding registration rules
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
  let errors = {};

  // Check condition, if everything is passed, 
  // Check validations of at least 2 chars but no longer 30 chars
  if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  // if everything is passed, return will be isValid: isEmpty(errors)
  // if not, errors.name above and error status in users.js will return 
  return {
    errors, // minify 'errors: errors'
    isValid: isEmpty(errors),
  };
};