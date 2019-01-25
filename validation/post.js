// for adding login rules
// for adding registration rules
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data){
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // check required field - text
  if(!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Post must be between 10 and 300 characters';
  }

  // check required field - text
  if(Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  // if everything is passed, return will be isValid: isEmpty(errors)
  // if not, errors.name above and error status in users.js will return 
  return {
    errors, // minify 'errors: errors'
    isValid: isEmpty(errors),
  };
};